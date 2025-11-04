declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    NODE_ENV?: 'development' | 'production' | 'test';
    DATABASE_URL: string;
    RABBITMQ_URL: string;
    ALCHEMY_API_KEY: string;
    ALCHEMY_WEBHOOK_SECRET: string;
  }
}
