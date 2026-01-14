import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import "dotenv/config";
import express from "express";
import amqp from "amqplib";
import { auth } from "./auth.js";
import { PrismaClient } from "../generated/prisma/index.js";
import promClient from "prom-client";

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

const app = express();

// ============================================================
// Prometheus Metrics
// ============================================================

const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['route', 'code', 'method'],
  registers: [register]
});

const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['route', 'code', 'method'],
  registers: [register]
});

app.use(express.json());
app.use(
  cors({
    origin: process.env.TRUSTED_ORIGINS?.split(',') || [],
    credentials: true,
  })
);

// Metrics middleware
app.use((req: any, res: any, next: any) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route?.path || req.path;
    const code = res.statusCode.toString();

    httpRequestDuration
      .labels(route, code, req.method)
      .observe(duration);

    httpRequestsTotal
      .labels(route, code, req.method)
      .inc();
  });
  next();
});

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.get("/", (req: any, res: any) => {
  res.send("Yo");
});

app.get("/health", (req: any, res: any) => {
  res.json({ status: "ok", service: "auth-service" });
});

// Metrics endpoint for Prometheus
app.get("/metrics", async (req: any, res: any) => {
  res.set('Content-Type', register.contentType);
  res.send(await register.metrics());
});

// RabbitMQ connection for USER_DELETED events
interface UserDeletedEvent {
  id: string;
  type: string;
  timestamp: string;
  source: string;
  data: {
    userId: string;
    deletedAt: string;
    reason?: string;
  };
}

/**
 * Handle user deletion - remove user and all related data (GDPR)
 * Sessions and Accounts are cascade deleted via Prisma schema
 */
async function handleUserDeleted(userId: string): Promise<void> {
  try {
    // Delete user (cascade deletes sessions and accounts)
    const result = await prisma.user.delete({
      where: { id: userId },
    });

    console.log(`[GDPR] Deleted auth user ${userId} (${result.email})`);
  } catch (error: any) {
    if (error.code === 'P2025') {
      // Record not found - already deleted
      console.log(`[GDPR] User ${userId} not found in auth database (already deleted)`);
      return;
    }
    console.error(`[GDPR] Failed to delete auth user ${userId}:`, error);
    throw error;
  }
}

async function connectRabbitMQ() {
  try {
    console.log("[RabbitMQ] Connecting to RabbitMQ...");
    const rabbitmqUrl = process.env.RABBITMQ_URL;
    if (!rabbitmqUrl) {
      throw new Error("RABBITMQ_URL environment variable is required");
    }
    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();
    console.log("[RabbitMQ] Channel created");

    // Create exchange
    await channel.assertExchange("events", "topic", { durable: true });

    // Create queue for user events (GDPR cleanup)
    const queue = await channel.assertQueue("auth.user-events", {
      durable: true,
    });

    // Bind to user.deleted events
    await channel.bindQueue(queue.queue, "events", "user.deleted");
    console.log("[RabbitMQ] Subscribed to user.deleted events");

    // Consume user deleted events
    await channel.consume(
      queue.queue,
      async (msg) => {
        if (!msg) return;

        try {
          const event: UserDeletedEvent = JSON.parse(msg.content.toString());
          console.log(`[RabbitMQ] Received user.deleted event for user ${event.data.userId}`);

          await handleUserDeleted(event.data.userId);

          channel.ack(msg);
          console.log("[RabbitMQ] User deleted event processed");
        } catch (error) {
          console.error("[RabbitMQ] Error processing user.deleted event:", error);
          // Reject and don't requeue
          channel.nack(msg, false, false);
        }
      },
      { noAck: false }
    );

    console.log("[RabbitMQ] Connected and listening for user events");
  } catch (error) {
    console.error("[RabbitMQ] Connection error:", error);
    // Retry after 5 seconds
    setTimeout(connectRabbitMQ, 5000);
  }
}

app.listen(PORT, async () => {
  console.log(`Server is running on port:${PORT}`);

  // Connect to RabbitMQ for GDPR events
  await connectRabbitMQ();
});

// Internal endpoints for GDPR account deletion

// Verify internal service key
function verifyInternalRequest(req: any): boolean {
  const key = req.headers['x-internal-service'];
  return key === process.env.INTERNAL_SERVICE_KEY || key === 'user-service';
}

// Mark user for deletion (called by user service)
app.post('/api/internal/users/:userId/request-deletion', async (req: any, res: any) => {
  try {
    if (!verifyInternalRequest(req)) {
      return res.status(403).json({ error: 'Forbidden - internal endpoint' });
    }

    const { userId } = req.params;
    const { deleteRequestedAt, deletionScheduledAt, reason } = req.body;

    // Update user with deletion timestamps
    await prisma.user.update({
      where: { id: userId },
      data: {
        deleteRequestedAt: new Date(deleteRequestedAt),
        deletionScheduledAt: new Date(deletionScheduledAt),
      },
    });

    console.log(`[GDPR] Marked user ${userId} for deletion on ${deletionScheduledAt}`);

    res.json({ success: true });
  } catch (error: any) {
    console.error('[GDPR] Error marking user for deletion:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Cancel user deletion (called by user service)
app.post('/api/internal/users/:userId/cancel-deletion', async (req: any, res: any) => {
  try {
    if (!verifyInternalRequest(req)) {
      return res.status(403).json({ error: 'Forbidden - internal endpoint' });
    }

    const { userId } = req.params;

    // Clear deletion timestamps
    await prisma.user.update({
      where: { id: userId },
      data: {
        deleteRequestedAt: null,
        deletionScheduledAt: null,
      },
    });

    console.log(`[GDPR] Cancelled deletion for user ${userId}`);

    res.json({ success: true });
  } catch (error: any) {
    console.error('[GDPR] Error cancelling user deletion:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
