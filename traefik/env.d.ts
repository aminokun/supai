declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    NODE_ENV?: 'development' | 'production' | 'test';
    FRONTEND_URL?: string;
    TELEGRAM_BOT_URL?: string;
    AUTH_SERVICE_URL?: string;
    USER_SERVICE_URL?: string;
    ASSET_PRICE_SERVICE_URL?: string;
    WALLET_TRACKING_SERVICE_URL?: string;
    PORTFOLIO_SERVICE_URL?: string;
    NOTIFICATION_SERVICE_URL?: string;
  }
}
