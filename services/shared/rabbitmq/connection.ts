import amqplib from 'amqplib';
import { RabbitMQConfig, ExchangeConfig, QueueConfig } from './types';

export class RabbitMQConnection {
  private static instance: RabbitMQConnection;
  private connection: amqplib.ChannelModel | null = null;
  private channel: amqplib.Channel | null = null;
  private config: RabbitMQConfig;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private isConnecting = false;

  private constructor(config: RabbitMQConfig) {
    this.config = config;
  }

  public static getInstance(config?: RabbitMQConfig): RabbitMQConnection {
    if (!RabbitMQConnection.instance) {
      if (!config) {
        throw new Error('RabbitMQ config must be provided on first initialization');
      }
      RabbitMQConnection.instance = new RabbitMQConnection(config);
    }
    return RabbitMQConnection.instance;
  }

  private getConnectionUrl(): string {
    if (this.config.url) {
      return this.config.url;
    }

    const {
      hostname = 'localhost',
      port = 5672,
      username = 'guest',
      password = 'guest',
      vhost = '/',
    } = this.config;

    return `amqp://${username}:${password}@${hostname}:${port}/${encodeURIComponent(vhost)}`;
  }

  public async connect(): Promise<void> {
    if (this.connection && this.channel) {
      return;
    }

    if (this.isConnecting) {
      // Wait for ongoing connection attempt
      while (this.isConnecting) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      return;
    }

    this.isConnecting = true;

    try {
      const url = this.getConnectionUrl();
      console.log('[RabbitMQ] Connecting to:', url.replace(/\/\/.*@/, '//<hidden>@'));

      this.connection = await amqplib.connect(url, {
        heartbeat: this.config.heartbeat || 30,
      });

      this.channel = await this.connection.createChannel();

      // Set up error handlers
      this.connection!.on('error', (err) => {
        console.error('[RabbitMQ] Connection error:', err);
        this.handleConnectionError();
      });

      this.connection!.on('close', () => {
        console.warn('[RabbitMQ] Connection closed');
        this.handleConnectionError();
      });

      this.channel!.on('error', (err) => {
        console.error('[RabbitMQ] Channel error:', err);
      });

      this.channel!.on('close', () => {
        console.warn('[RabbitMQ] Channel closed');
      });

      console.log('[RabbitMQ] Connected successfully');
      this.reconnectAttempts = 0;
    } catch (error) {
      console.error('[RabbitMQ] Failed to connect:', error);
      await this.handleConnectionError();
      throw error;
    } finally {
      this.isConnecting = false;
    }
  }

  private async handleConnectionError(): Promise<void> {
    this.connection = null;
    this.channel = null;

    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const timeout = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
      console.log(`[RabbitMQ] Reconnecting in ${timeout}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

      setTimeout(async () => {
        try {
          await this.connect();
        } catch (error) {
          console.error('[RabbitMQ] Reconnection failed:', error);
        }
      }, timeout);
    } else {
      console.error('[RabbitMQ] Max reconnection attempts reached');
    }
  }

  public async createExchange(config: ExchangeConfig): Promise<void> {
    if (!this.channel) {
      throw new Error('RabbitMQ channel not initialized');
    }

    await this.channel.assertExchange(
      config.name,
      config.type,
      {
        durable: config.durable !== false,
        autoDelete: config.autoDelete || false,
        arguments: config.arguments,
      }
    );

    console.log(`[RabbitMQ] Exchange created: ${config.name} (${config.type})`);
  }

  public async createQueue(config: QueueConfig): Promise<any> {
    if (!this.channel) {
      throw new Error('RabbitMQ channel not initialized');
    }

    const result = await this.channel.assertQueue(config.name, {
      durable: config.durable !== false,
      exclusive: config.exclusive || false,
      autoDelete: config.autoDelete || false,
      arguments: config.arguments,
    });

    console.log(`[RabbitMQ] Queue created: ${config.name}`);
    return result;
  }

  public async bindQueue(queue: string, exchange: string, routingKey: string = ''): Promise<void> {
    if (!this.channel) {
      throw new Error('RabbitMQ channel not initialized');
    }

    await this.channel.bindQueue(queue, exchange, routingKey);
    console.log(`[RabbitMQ] Queue bound: ${queue} -> ${exchange} (${routingKey || '*'})`);
  }

  public getChannel(): amqplib.Channel {
    if (!this.channel) {
      throw new Error('RabbitMQ channel not initialized');
    }
    return this.channel;
  }

  public async close(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
      }
      if (this.connection) {
        await this.connection.close();
      }
      console.log('[RabbitMQ] Connection closed');
    } catch (error) {
      console.error('[RabbitMQ] Error closing connection:', error);
    } finally {
      this.connection = null;
      this.channel = null;
    }
  }

  public isConnected(): boolean {
    return !!(this.connection && this.channel);
  }

  // Setup dead letter exchange and queue
  public async setupDeadLetter(): Promise<void> {
    await this.createExchange({
      name: 'dlx',
      type: 'direct',
      durable: true,
    });

    await this.createQueue({
      name: 'dead-letter-queue',
      durable: true,
    });

    await this.bindQueue('dead-letter-queue', 'dlx', '');
    console.log('[RabbitMQ] Dead letter exchange and queue configured');
  }
}