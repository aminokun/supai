import { RabbitMQConnection } from './connection';
import { DomainEvent, EventType } from './types';

export type EventHandler<T extends DomainEvent = DomainEvent> = (
  event: T,
  ack: () => void,
  nack: (requeue?: boolean) => void
) => Promise<void>;

export interface ConsumerOptions {
  queueName?: string;
  prefetch?: number;
  deadLetterExchange?: string;
  messageTtl?: number;
  maxRetries?: number;
}

export class EventConsumer {
  private connection: RabbitMQConnection;
  private serviceName: string;
  private exchangeName: string = 'events';
  private handlers: Map<EventType, EventHandler[]> = new Map();
  private queueName: string;
  private options: ConsumerOptions;

  constructor(
    serviceName: string,
    options: ConsumerOptions = {},
    connection?: RabbitMQConnection
  ) {
    this.serviceName = serviceName;
    this.connection = connection || RabbitMQConnection.getInstance();
    this.options = options;
    this.queueName = options.queueName || `${serviceName}-events`;
  }

  public async initialize(): Promise<void> {
    await this.connection.connect();

    const channel = this.connection.getChannel();

    // Set prefetch count for load balancing
    await channel.prefetch(this.options.prefetch || 10);

    // Create the main events exchange if it doesn't exist
    await this.connection.createExchange({
      name: this.exchangeName,
      type: 'topic',
      durable: true,
    });

    // Create service-specific queue with dead letter configuration
    const queueArgs: Record<string, any> = {};

    if (this.options.deadLetterExchange) {
      queueArgs['x-dead-letter-exchange'] = this.options.deadLetterExchange || 'dlx';
    }

    if (this.options.messageTtl) {
      queueArgs['x-message-ttl'] = this.options.messageTtl;
    }

    if (this.options.maxRetries) {
      queueArgs['x-max-length'] = this.options.maxRetries * 1000; // Rough estimate
    }

    await this.connection.createQueue({
      name: this.queueName,
      durable: true,
      arguments: queueArgs,
    });

    console.log(`[EventConsumer] Initialized for service: ${this.serviceName}`);
  }

  public on(eventType: EventType, handler: EventHandler): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    this.handlers.get(eventType)!.push(handler);
    console.log(`[EventConsumer] Registered handler for: ${eventType}`);
  }

  public async subscribe(eventTypes: EventType[]): Promise<void> {
    for (const eventType of eventTypes) {
      const routingKey = eventType.replace(/\./g, '_');
      await this.connection.bindQueue(this.queueName, this.exchangeName, routingKey);
      console.log(`[EventConsumer] Subscribed to: ${eventType}`);
    }
  }

  public async start(): Promise<void> {
    const channel = this.connection.getChannel();

    await channel.consume(
      this.queueName,
      async (msg) => {
        if (!msg) return;

        const startTime = Date.now();

        try {
          const event = JSON.parse(msg.content.toString()) as DomainEvent;
          const eventType = event.type;

          console.log(`[EventConsumer] Received event: ${eventType} (${event.id})`);
          console.log(`[EventConsumer] Event data:`, JSON.stringify(event.data, null, 2));

          const handlers = this.handlers.get(eventType) || [];

          if (handlers.length === 0) {
            console.warn(`[EventConsumer] No handlers for event type: ${eventType}`);
            channel.ack(msg); // Acknowledge anyway to avoid queue buildup
            return;
          }

          // Execute all handlers for this event type
          await Promise.all(
            handlers.map((handler) =>
              handler(
                event,
                () => {
                  channel.ack(msg);
                  const duration = Date.now() - startTime;
                  console.log(`[EventConsumer] Processed event: ${eventType} (${event.id}) in ${duration}ms`);
                },
                (requeue = true) => {
                  const retryCount = (msg.properties.headers?.['x-retry-count'] || 0) as number;
                  const maxRetries = this.options.maxRetries || 3;

                  if (retryCount < maxRetries && requeue) {
                    // Requeue with incremented retry count
                    channel.nack(msg, false, false); // Don't requeue to same queue

                    // Republish with delay and retry count
                    setTimeout(() => {
                      channel.publish(
                        this.exchangeName,
                        msg.fields.routingKey,
                        msg.content,
                        {
                          ...msg.properties,
                          headers: {
                            ...msg.properties.headers,
                            'x-retry-count': retryCount + 1,
                            'x-delay': Math.min(1000 * Math.pow(2, retryCount), 30000), // Exponential backoff
                          },
                        }
                      );
                    }, 1000);

                    console.warn(`[EventConsumer] Retrying event: ${eventType} (${event.id}) - Attempt ${retryCount + 1}/${maxRetries}`);
                  } else {
                    // Send to dead letter queue
                    channel.nack(msg, false, false);
                    console.error(`[EventConsumer] Failed to process event after ${retryCount} retries: ${eventType} (${event.id})`);
                  }
                }
              )
            )
          );
        } catch (error) {
          console.error('[EventConsumer] Error processing message:', error);

          // Send to dead letter queue if parsing failed
          channel.nack(msg, false, false);
        }
      },
      {
        noAck: false, // Manual acknowledgment
      }
    );

    console.log(`[EventConsumer] Started consuming from queue: ${this.queueName}`);
  }

  public async stop(): Promise<void> {
    const channel = this.connection.getChannel();
    await channel.cancel(this.queueName);
    console.log(`[EventConsumer] Stopped consuming from queue: ${this.queueName}`);
  }

  // Convenience methods for common event subscriptions
  public onUserCreated(handler: EventHandler): void {
    this.on(EventType.USER_CREATED, handler);
  }

  public onUserUpdated(handler: EventHandler): void {
    this.on(EventType.USER_UPDATED, handler);
  }

  public onUserTelegramLinked(handler: EventHandler): void {
    this.on(EventType.USER_TELEGRAM_LINKED, handler);
  }

  public onUserTelegramUnlinked(handler: EventHandler): void {
    this.on(EventType.USER_TELEGRAM_UNLINKED, handler);
  }

  public onWalletAdded(handler: EventHandler): void {
    this.on(EventType.WALLET_ADDED, handler);
  }

  public onWalletTransactionDetected(handler: EventHandler): void {
    this.on(EventType.WALLET_TRANSACTION_DETECTED, handler);
  }

  public onPriceAlertTriggered(handler: EventHandler): void {
    this.on(EventType.PRICE_ALERT_TRIGGERED, handler);
  }

  public onNotificationRequested(handler: EventHandler): void {
    this.on(EventType.NOTIFICATION_REQUESTED, handler);
  }

  // Health check
  public isHealthy(): boolean {
    return this.connection.isConnected();
  }
}