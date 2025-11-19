import amqplib from 'amqplib';

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
  affectedUsers?: string[];
}

export class RabbitMQService {
  private connection: amqplib.Connection | null = null;
  private channel: amqplib.Channel | null = null;
  private url: string;

  constructor() {
    this.url = process.env.RABBITMQ_URL || 'amqp://rabbitmq_admin:rabbitmqpassword@localhost:5672';
  }

  async connect(): Promise<void> {
    try {
      this.connection = await amqplib.connect(this.url);
      this.channel = await this.connection.createChannel();

      // Create exchange
      await this.channel.assertExchange('wallet-events', 'topic', { durable: true });

      console.log('[RabbitMQ] Connected successfully');
    } catch (error) {
      console.error('[RabbitMQ] Connection error:', error);
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