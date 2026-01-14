// Main exports for RabbitMQ utilities
export { RabbitMQConnection } from './connection';
export { EventPublisher } from './publisher';
export { EventConsumer, EventHandler, ConsumerOptions } from './consumer';
export * from './types';

import { RabbitMQConnection } from './connection';
import { EventPublisher } from './publisher';
import { EventConsumer } from './consumer';

// Helper function to initialize RabbitMQ for a service
export async function initializeRabbitMQ(
  serviceName: string,
  config?: {
    url?: string;
    hostname?: string;
    port?: number;
    username?: string;
    password?: string;
  }
) {
  const rabbitmqUrl = process.env.RABBITMQ_URL;
  if (!rabbitmqUrl) {
    throw new Error("RABBITMQ_URL environment variable is required");
  }

  const connection = RabbitMQConnection.getInstance({ url: rabbitmqUrl, ...config });
  await connection.connect();
  await connection.setupDeadLetter();

  const publisher = new EventPublisher(serviceName, connection);
  await publisher.initialize();

  const consumer = new EventConsumer(serviceName, {
    deadLetterExchange: 'dlx',
    maxRetries: 3,
    prefetch: 10,
  }, connection);
  await consumer.initialize();

  return { connection, publisher, consumer };
}