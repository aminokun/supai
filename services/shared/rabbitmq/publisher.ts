import { RabbitMQConnection } from './connection';
import { DomainEvent, EventType } from './types';
import { v4 as uuidv4 } from 'uuid';

export class EventPublisher {
  private connection: RabbitMQConnection;
  private serviceName: string;
  private exchangeName: string = 'events';

  constructor(serviceName: string, connection?: RabbitMQConnection) {
    this.serviceName = serviceName;
    this.connection = connection || RabbitMQConnection.getInstance();
  }

  public async initialize(): Promise<void> {
    await this.connection.connect();

    // Create the main events exchange
    await this.connection.createExchange({
      name: this.exchangeName,
      type: 'topic',
      durable: true,
    });

    console.log(`[EventPublisher] Initialized for service: ${this.serviceName}`);
  }

  public async publish<T extends DomainEvent>(
    eventType: EventType,
    data: T['data'],
    options: {
      correlationId?: string;
      delay?: number;
    } = {}
  ): Promise<void> {
    const channel = this.connection.getChannel();

    const event: DomainEvent = {
      id: uuidv4(),
      type: eventType,
      timestamp: new Date(),
      correlationId: options.correlationId,
      source: this.serviceName,
      data,
    } as any;

    const routingKey = eventType.replace(/\./g, '_'); // Convert dots to underscores for routing
    const message = Buffer.from(JSON.stringify(event));

    const publishOptions: any = {
      persistent: true,
      timestamp: Date.now(),
      messageId: event.id,
      correlationId: options.correlationId,
      headers: {
        'x-event-type': eventType,
        'x-source': this.serviceName,
      },
    };

    // Add delay if specified (for scheduled messages)
    if (options.delay) {
      publishOptions.headers['x-delay'] = options.delay;
    }

    channel.publish(this.exchangeName, routingKey, message, publishOptions);

    console.log(`[EventPublisher] Published event: ${eventType} (${event.id})`);
    console.log(`[EventPublisher] Event data:`, JSON.stringify(data, null, 2));
  }

  // Convenience methods for common events
  public async publishUserCreated(userId: string, email: string, name: string): Promise<void> {
    await this.publish(EventType.USER_CREATED, {
      userId,
      email,
      name,
    });
  }

  public async publishUserUpdated(userId: string, changes: Record<string, any>): Promise<void> {
    await this.publish(EventType.USER_UPDATED, {
      userId,
      changes,
    });
  }

  public async publishUserTelegramLinked(
    userId: string,
    telegramChatId: string,
    telegramUsername?: string
  ): Promise<void> {
    await this.publish(EventType.USER_TELEGRAM_LINKED, {
      userId,
      telegramChatId,
      telegramUsername,
    });
  }

  public async publishUserTelegramUnlinked(userId: string): Promise<void> {
    await this.publish(EventType.USER_TELEGRAM_UNLINKED, {
      userId,
    });
  }

  public async publishWalletAdded(
    userId: string,
    walletAddress: string,
    chain: string,
    label?: string
  ): Promise<void> {
    await this.publish(EventType.WALLET_ADDED, {
      userId,
      walletAddress,
      chain,
      label,
    });
  }

  public async publishWalletTransactionDetected(
    userId: string,
    walletAddress: string,
    chain: string,
    transactionData: {
      transactionHash: string;
      from: string;
      to: string;
      value: string;
      tokenAddress?: string;
      tokenSymbol?: string;
      transactionType: 'incoming' | 'outgoing';
    }
  ): Promise<void> {
    await this.publish(EventType.WALLET_TRANSACTION_DETECTED, {
      userId,
      walletAddress,
      chain,
      ...transactionData,
    });
  }

  public async publishPriceAlertTriggered(
    userId: string,
    alertId: string,
    symbol: string,
    currentPrice: number,
    targetPrice: number,
    condition: 'above' | 'below'
  ): Promise<void> {
    await this.publish(EventType.PRICE_ALERT_TRIGGERED, {
      userId,
      alertId,
      symbol,
      currentPrice,
      targetPrice,
      condition,
    });
  }

  public async publishNotificationRequested(
    userId: string,
    channel: 'telegram' | 'email' | 'push',
    title: string,
    message: string,
    priority: 'low' | 'medium' | 'high' = 'medium',
    metadata?: Record<string, any>
  ): Promise<void> {
    await this.publish(EventType.NOTIFICATION_REQUESTED, {
      userId,
      channel,
      title,
      message,
      priority,
      metadata,
    });
  }

  // Batch publishing
  public async publishBatch(events: Array<{ type: EventType; data: any }>): Promise<void> {
    for (const event of events) {
      await this.publish(event.type, event.data);
    }
  }
}