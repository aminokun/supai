declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    NODE_ENV?: 'development' | 'production' | 'test';
    DATABASE_URL: string;
    TRUSTED_ORIGINS?: string;
    RABBITMQ_URL?: string;
  }
}
