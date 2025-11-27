// Event types for inter-service communication

export enum EventType {
  // User events
  USER_CREATED = 'user.created',
  USER_UPDATED = 'user.updated',
  USER_DELETED = 'user.deleted',
  USER_TELEGRAM_LINKED = 'user.telegram.linked',
  USER_TELEGRAM_UNLINKED = 'user.telegram.unlinked',

  // Wallet events
  WALLET_ADDED = 'wallet.added',
  WALLET_REMOVED = 'wallet.removed',
  WALLET_TRANSACTION_DETECTED = 'wallet.transaction.detected',
  WALLET_BALANCE_UPDATED = 'wallet.balance.updated',

  // Price events
  PRICE_ALERT_TRIGGERED = 'price.alert.triggered',
  PRICE_UPDATED = 'price.updated',

  // Portfolio events
  PORTFOLIO_VALUE_UPDATED = 'portfolio.value.updated',
  PORTFOLIO_MILESTONE_REACHED = 'portfolio.milestone.reached',

  // Notification events
  NOTIFICATION_REQUESTED = 'notification.requested',
  NOTIFICATION_SENT = 'notification.sent',
  NOTIFICATION_FAILED = 'notification.failed',
}

// Base event interface
export interface BaseEvent {
  id: string;
  type: EventType;
  timestamp: Date;
  correlationId?: string;
  source: string; // Service that emitted the event
}

// User events
export interface UserCreatedEvent extends BaseEvent {
  type: EventType.USER_CREATED;
  data: {
    userId: string;
    email: string;
    name: string;
  };
}

export interface UserUpdatedEvent extends BaseEvent {
  type: EventType.USER_UPDATED;
  data: {
    userId: string;
    changes: Record<string, any>;
  };
}

export interface UserTelegramLinkedEvent extends BaseEvent {
  type: EventType.USER_TELEGRAM_LINKED;
  data: {
    userId: string;
    telegramChatId: string;
    telegramUsername?: string;
  };
}

export interface UserTelegramUnlinkedEvent extends BaseEvent {
  type: EventType.USER_TELEGRAM_UNLINKED;
  data: {
    userId: string;
  };
}

// Wallet events
export interface WalletAddedEvent extends BaseEvent {
  type: EventType.WALLET_ADDED;
  data: {
    userId: string;
    walletAddress: string;
    chain: string;
    label?: string;
  };
}

export interface WalletTransactionDetectedEvent extends BaseEvent {
  type: EventType.WALLET_TRANSACTION_DETECTED;
  data: {
    userId: string;
    walletAddress: string;
    chain: string;
    transactionHash: string;
    from: string;
    to: string;
    value: string;
    tokenAddress?: string;
    tokenSymbol?: string;
    transactionType: 'incoming' | 'outgoing';
  };
}

// Price events
export interface PriceAlertTriggeredEvent extends BaseEvent {
  type: EventType.PRICE_ALERT_TRIGGERED;
  data: {
    userId: string;
    alertId: string;
    symbol: string;
    currentPrice: number;
    targetPrice: number;
    condition: 'above' | 'below';
  };
}

// Notification events
export interface NotificationRequestedEvent extends BaseEvent {
  type: EventType.NOTIFICATION_REQUESTED;
  data: {
    userId: string;
    channel: 'telegram' | 'email' | 'push';
    title: string;
    message: string;
    priority: 'low' | 'medium' | 'high';
    metadata?: Record<string, any>;
  };
}

// Union type for all events
export type DomainEvent =
  | UserCreatedEvent
  | UserUpdatedEvent
  | UserTelegramLinkedEvent
  | UserTelegramUnlinkedEvent
  | WalletAddedEvent
  | WalletTransactionDetectedEvent
  | PriceAlertTriggeredEvent
  | NotificationRequestedEvent;

// Queue configuration
export interface QueueConfig {
  name: string;
  durable?: boolean;
  exclusive?: boolean;
  autoDelete?: boolean;
  arguments?: Record<string, any>;
}

// Exchange configuration
export interface ExchangeConfig {
  name: string;
  type: 'direct' | 'topic' | 'fanout' | 'headers';
  durable?: boolean;
  autoDelete?: boolean;
  arguments?: Record<string, any>;
}

// Connection configuration
export interface RabbitMQConfig {
  url?: string;
  hostname?: string;
  port?: number;
  username?: string;
  password?: string;
  vhost?: string;
  reconnectTimeout?: number;
  heartbeat?: number;
}