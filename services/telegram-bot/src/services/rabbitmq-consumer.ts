import * as amqplib from 'amqplib';
import { Telegraf } from 'telegraf';
import { BotContext } from '../index.js';

interface NotificationEvent {
  userId: string;
  chatId: string;
  type: 'transaction' | 'wallet_added' | 'wallet_removed' | 'alert';
  data: {
    message: string;
    parseMode?: 'HTML' | 'Markdown';
    buttons?: Array<{
      text: string;
      url?: string;
      callback?: string;
    }>;
  };
}

interface TransactionEvent {
  txHash: string;
  fromAddress: string;
  toAddress?: string;
  value: string;
  asset?: string;
  priceUSD?: number;
  affectedUsers?: string[];
  timestamp: Date;
}

export class RabbitMQConsumer {
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

      // Create exchanges and queues
      await this.channel.assertExchange('notifications', 'topic', { durable: true });
      await this.channel.assertExchange('wallet-events', 'topic', { durable: true });

      // Telegram notification queue
      await this.channel.assertQueue('telegram-notifications', {
        durable: true,
        arguments: {
          'x-max-priority': 10,
          'x-message-ttl': 86400000 // 24 hours
        }
      });

      // Bind to notification events
      await this.channel.bindQueue('telegram-notifications', 'notifications', 'telegram.#');

      // Transaction notification queue
      await this.channel.assertQueue('telegram-transactions', {
        durable: true,
        arguments: {
          'x-message-ttl': 3600000 // 1 hour
        }
      });

      // Bind to wallet transaction events
      await this.channel.bindQueue('telegram-transactions', 'wallet-events', 'wallet.transaction.#');

      console.log('[RabbitMQ] Consumer connected successfully');
    } catch (error) {
      console.error('[RabbitMQ] Connection error:', error);
      throw error;
    }
  }

  async startConsumer(bot: Telegraf<BotContext>): Promise<void> {
    if (!this.channel) {
      throw new Error('RabbitMQ not connected');
    }

    // Consume notification events
    this.channel.consume('telegram-notifications', async (msg) => {
      if (!msg) return;

      try {
        const event: NotificationEvent = JSON.parse(msg.content.toString());
        await this.handleNotification(bot, event);

        // Acknowledge message
        this.channel!.ack(msg);
      } catch (error) {
        console.error('[RabbitMQ] Error processing notification:', error);
        // Reject and requeue if temporary error
        this.channel!.nack(msg, false, true);
      }
    });

    // Consume transaction events (for direct notifications)
    this.channel.consume('telegram-transactions', async (msg) => {
      if (!msg) return;

      try {
        const event: TransactionEvent = JSON.parse(msg.content.toString());
        await this.handleTransaction(bot, event);

        // Acknowledge message
        this.channel!.ack(msg);
      } catch (error) {
        console.error('[RabbitMQ] Error processing transaction:', error);
        this.channel!.nack(msg, false, false); // Don't requeue transactions
      }
    });

    console.log('[RabbitMQ] Consumer started');
  }

  private async handleNotification(bot: Telegraf<BotContext>, event: NotificationEvent): Promise<void> {
    try {
      const { chatId, data } = event;

      // Build message options
      const options: any = {
        parse_mode: data.parseMode || 'HTML'
      };

      // Add inline keyboard if buttons provided
      if (data.buttons && data.buttons.length > 0) {
        options.reply_markup = {
          inline_keyboard: data.buttons.map(btn => [{
            text: btn.text,
            ...(btn.url ? { url: btn.url } : {}),
            ...(btn.callback ? { callback_data: btn.callback } : {})
          }])
        };
      }

      // Send message
      await bot.telegram.sendMessage(chatId, data.message, options);

      console.log(`[RabbitMQ] Notification sent to ${chatId}`);
    } catch (error: any) {
      console.error('[RabbitMQ] Failed to send notification:', error);

      // Handle blocked/deactivated users
      if (error.response?.error_code === 403) {
        console.log(`[RabbitMQ] User ${event.chatId} has blocked the bot`);
        // Could publish event to unlink user
      }
    }
  }

  private async handleTransaction(_bot: Telegraf<BotContext>, event: TransactionEvent): Promise<void> {
    // This will be handled by the notification service
    // For now, we'll just log it
    console.log('[RabbitMQ] Transaction event received:', {
      hash: event.txHash,
      users: event.affectedUsers?.length || 0
    });
  }

  async close(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }

  // Publish events (for bot-initiated events)
  async publishUserLinked(userId: string, chatId: string, username?: string): Promise<void> {
    if (!this.channel) {
      await this.connect();
    }

    const event = {
      userId,
      chatId,
      username,
      timestamp: new Date()
    };

    this.channel!.publish('notifications', 'user.telegram.linked', Buffer.from(JSON.stringify(event)), {
      persistent: true,
      contentType: 'application/json'
    });
  }

  async publishUserUnlinked(userId: string, chatId: string): Promise<void> {
    if (!this.channel) {
      await this.connect();
    }

    const event = {
      userId,
      chatId,
      timestamp: new Date()
    };

    this.channel!.publish('notifications', 'user.telegram.unlinked', Buffer.from(JSON.stringify(event)), {
      persistent: true,
      contentType: 'application/json'
    });
  }
}

export const rabbitmqConsumer = new RabbitMQConsumer();