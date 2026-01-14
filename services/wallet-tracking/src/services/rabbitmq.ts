import amqplib from 'amqplib';
import type { Channel, ChannelModel } from 'amqplib';
import { PrismaClient } from '../../generated/prisma/index.js';

const prisma = new PrismaClient();

export interface AffectedUser {
  userId: string;
  telegramChatId?: string;
  telegramUsername?: string;
}

export interface TransactionEvent {
  txHash: string;
  fromAddress: string;
  toAddress?: string;
  value: string;
  blockNumber: number;
  timestamp: Date;
  category: string;
  contractAddress?: string;
  asset?: string;
  amount?: string;
  priceUSD?: number;
  affectedUsers?: AffectedUser[];
}

interface UserDeletedEvent {
  id: string;
  type: string;
  timestamp: string;
  source: string;
  data: {
    userId: string;
    deletedAt: string;
    reason?: string;
  };
}

export class RabbitMQService {
  private connection: ChannelModel | null = null;
  private channel: Channel | null = null;
  private url: string;

  constructor() {
    const url = process.env.RABBITMQ_URL;
    if (!url) {
      throw new Error("RABBITMQ_URL environment variable is required");
    }
    this.url = url;
  }

  async connect(): Promise<void> {
    try {
      this.connection = await amqplib.connect(this.url);
      this.channel = await this.connection.createChannel();

      // Create exchanges
      await this.channel.assertExchange('wallet-events', 'topic', { durable: true });
      await this.channel.assertExchange('events', 'topic', { durable: true });

      // Subscribe to user.deleted events for GDPR cleanup
      await this.subscribeToUserEvents();

      console.log('[RabbitMQ] Connected successfully');
    } catch (error) {
      console.error('[RabbitMQ] Connection error:', error);
      throw error;
    }
  }

  /**
   * Subscribe to user events for GDPR cleanup
   */
  private async subscribeToUserEvents(): Promise<void> {
    if (!this.channel) return;

    // Create queue for user events
    const queue = await this.channel.assertQueue('wallet-tracking.user-events', {
      durable: true,
    });

    // Bind to user.deleted events
    await this.channel.bindQueue(queue.queue, 'events', 'user.deleted');

    console.log('[RabbitMQ] Subscribed to user.deleted events');

    // Consume user events
    await this.channel.consume(
      queue.queue,
      async (msg) => {
        if (!msg) return;

        try {
          const event: UserDeletedEvent = JSON.parse(msg.content.toString());
          console.log(`[RabbitMQ] Received user.deleted event for user ${event.data.userId}`);

          await this.handleUserDeleted(event.data.userId);

          this.channel?.ack(msg);
        } catch (error) {
          console.error('[RabbitMQ] Error processing user.deleted event:', error);
          // Reject and don't requeue (dead letter)
          this.channel?.nack(msg, false, false);
        }
      },
      { noAck: false }
    );
  }

  /**
   * Handle user deletion - remove user's tracked wallets
   * Note: We don't delete transactions because WalletTransaction doesn't store userId,
   * only addresses. Multiple users may track the same wallet, so transactions are shared data.
   * Deleting TrackedWallet removes the user linkage (GDPR compliant).
   */
  private async handleUserDeleted(userId: string): Promise<void> {
    try {
      // First, get all tracked wallet addresses for this user (before deletion)
      const trackedWallets = await prisma.trackedWallet.findMany({
        where: { userId },
        select: { address: true },
      });

      const addresses = trackedWallets.map((w) => w.address);

      // Delete all tracked wallets (removes user linkage to addresses)
      const walletResult = await prisma.trackedWallet.deleteMany({
        where: { userId },
      });

      // Delete webhook addresses from Alchemy subscriptions
      await prisma.webhookAddress.deleteMany({
        where: {
          webhookId: process.env.ALCHEMY_WEBHOOK_ID || 'local',
          address: { in: addresses },
        },
      });

      console.log(
        `[GDPR] Deleted ${walletResult.count} tracked wallets and webhook subscriptions for user ${userId}`
      );
    } catch (error) {
      console.error(`[GDPR] Failed to delete user data for ${userId}:`, error);
      throw error;
    }
  }

  async publishTransactionDetected(event: TransactionEvent): Promise<void> {
    if (!this.channel) {
      await this.connect();
    }

    const routingKey = 'wallet.transaction.detected';
    const message = Buffer.from(JSON.stringify(event));

    this.channel!.publish('wallet-events', routingKey, message, {
      persistent: true,
      contentType: 'application/json',
      timestamp: Date.now()
    });

    console.log(`[RabbitMQ] Published transaction detected: ${event.txHash}`);
  }

  async publishTransactionProcessed(event: TransactionEvent): Promise<void> {
    if (!this.channel) {
      await this.connect();
    }

    const routingKey = 'wallet.transaction.processed';
    const message = Buffer.from(JSON.stringify(event));

    this.channel!.publish('wallet-events', routingKey, message, {
      persistent: true,
      contentType: 'application/json',
      timestamp: Date.now()
    });

    console.log(`[RabbitMQ] Published transaction processed: ${event.txHash}`);
  }

  async publishWalletAdded(userId: string, address: string, name: string): Promise<void> {
    if (!this.channel) {
      await this.connect();
    }

    const routingKey = 'wallet.tracking.added';
    const message = Buffer.from(JSON.stringify({
      userId,
      address,
      name,
      timestamp: new Date()
    }));

    this.channel!.publish('wallet-events', routingKey, message, {
      persistent: true,
      contentType: 'application/json',
      timestamp: Date.now()
    });

    console.log(`[RabbitMQ] Published wallet added: ${address} for user ${userId}`);
  }

  async publishWalletRemoved(userId: string, address: string): Promise<void> {
    if (!this.channel) {
      await this.connect();
    }

    const routingKey = 'wallet.tracking.removed';
    const message = Buffer.from(JSON.stringify({
      userId,
      address,
      timestamp: new Date()
    }));

    this.channel!.publish('wallet-events', routingKey, message, {
      persistent: true,
      contentType: 'application/json',
      timestamp: Date.now()
    });

    console.log(`[RabbitMQ] Published wallet removed: ${address} for user ${userId}`);
  }

  async close(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }
}

export const rabbitmqService = new RabbitMQService();