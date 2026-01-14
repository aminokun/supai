import express from "express";
import promClient from "prom-client";
import cors from "cors";
import "dotenv/config";
import amqp from "amqplib";
import axios from "axios"; // Used for Telegram API calls
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 3005;

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

// Middleware
app.use(cors());
app.use(express.json());

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

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "notification-service" });
});

// Metrics endpoint for Prometheus
app.get("/metrics", async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.send(await register.metrics());
});

// Telegram Bot configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

// RabbitMQ connection
let channel: amqp.Channel | null = null;

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
 * Handle user deletion - remove all notification data for the user (GDPR)
 */
async function handleUserDeleted(userId: string): Promise<void> {
  try {
    // Delete notification preferences
    const prefsResult = await prisma.notificationPreference.deleteMany({
      where: { userId },
    });
    console.log(`[GDPR] Deleted ${prefsResult.count} notification preferences for user ${userId}`);

    // Delete notification logs
    const logsResult = await prisma.notificationLog.deleteMany({
      where: { userId },
    });
    console.log(`[GDPR] Deleted ${logsResult.count} notification logs for user ${userId}`);

    // Delete notification queue entries
    const queueResult = await prisma.notificationQueue.deleteMany({
      where: { userId },
    });
    console.log(`[GDPR] Deleted ${queueResult.count} notification queue entries for user ${userId}`);

    console.log(`[GDPR] All notification data deleted for user ${userId}`);
  } catch (error) {
    console.error(`[GDPR] Failed to delete notification data for user ${userId}:`, error);
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
    channel = await connection.createChannel();
    console.log("[RabbitMQ] Channel created");

    // Create exchanges
    await channel.assertExchange("wallet-events", "topic", { durable: true });
    await channel.assertExchange("events", "topic", { durable: true });
    console.log("[RabbitMQ] Exchanges asserted");

    // Create queue for transaction notifications
    const txQueue = await channel.assertQueue("notification.transactions", {
      durable: true,
    });
    console.log("[RabbitMQ] Transaction queue asserted:", txQueue.queue);

    // Create queue for user events (GDPR cleanup)
    const userQueue = await channel.assertQueue("notification.user-events", {
      durable: true,
    });
    console.log("[RabbitMQ] User events queue asserted:", userQueue.queue);

    // Bind queues to exchanges
    await channel.bindQueue(
      txQueue.queue,
      "wallet-events",
      "wallet.transaction.detected"
    );
    await channel.bindQueue(
      userQueue.queue,
      "events",
      "user.deleted"
    );
    console.log("[RabbitMQ] Queues bound to exchanges");

    console.log("[RabbitMQ] Connected and listening for events");

    // Consume transaction messages
    console.log("[RabbitMQ] Setting up transaction consumer...");
    const txConsumeResult = await channel.consume(
      txQueue.queue,
      (msg) => {
        console.log("[Notification] ===== CONSUMER CALLBACK TRIGGERED =====");
        if (msg) {
          console.log("[Notification] Message received from queue");
          console.log(
            "[Notification] Message content:",
            msg.content.toString()
          );
          try {
            const data = JSON.parse(msg.content.toString());
            console.log(
              "[Notification] Parsed data:",
              JSON.stringify(data, null, 2)
            );

            // Process the notification asynchronously
            sendTransactionNotification(data).catch((err) => {
              console.error(
                "[Notification] Error in sendTransactionNotification:",
                err
              );
            });

            // Acknowledge message immediately
            channel?.ack(msg);
            console.log("[Notification] Message acknowledged");
          } catch (error) {
            console.error("[Notification] Error processing message:", error);
            // Reject and requeue
            channel?.nack(msg, false, true);
          }
        } else {
          console.log("[Notification] Received null message");
        }
      },
      { noAck: false }
    );
    console.log("[RabbitMQ] Transaction consumer tag:", txConsumeResult.consumerTag);

    // Consume user deleted events (GDPR)
    console.log("[RabbitMQ] Setting up user events consumer...");
    const userConsumeResult = await channel.consume(
      userQueue.queue,
      async (msg) => {
        if (!msg) return;

        try {
          const event: UserDeletedEvent = JSON.parse(msg.content.toString());
          console.log(`[RabbitMQ] Received user.deleted event for user ${event.data.userId}`);

          await handleUserDeleted(event.data.userId);

          channel?.ack(msg);
          console.log("[RabbitMQ] User deleted event processed");
        } catch (error) {
          console.error("[RabbitMQ] Error processing user.deleted event:", error);
          // Reject and don't requeue (dead letter)
          channel?.nack(msg, false, false);
        }
      },
      { noAck: false }
    );
    console.log("[RabbitMQ] User events consumer tag:", userConsumeResult.consumerTag);
  } catch (error) {
    console.error("[RabbitMQ] Connection error:", error);
    // Retry after 5 seconds
    setTimeout(connectRabbitMQ, 5000);
  }
}

async function sendTransactionNotification(data: any) {
  try {
    console.log(
      "[Notification] Processing notification for data:",
      JSON.stringify(data, null, 2)
    );

    // The wallet-tracking service now includes user telegram data in the event
    const transaction = data.transaction || data;
    const affectedUsers = data.affectedUsers || [];

    if (!affectedUsers || affectedUsers.length === 0) {
      console.log("[Notification] No users to notify");
      return;
    }

    console.log(`[Notification] Processing ${affectedUsers.length} affected users`);

    // Filter users with Telegram linked (data already included in event)
    const usersWithTelegram = affectedUsers.filter(
      (u: any) => u.telegramChatId
    );

    if (usersWithTelegram.length === 0) {
      console.log("[Notification] No users have Telegram linked");
      return;
    }

    console.log(
      `[Notification] Sending to ${usersWithTelegram.length} users with Telegram`
    );

    // Send notifications with concurrency limit to avoid rate limiting
    const CONCURRENCY_LIMIT = 5;
    const chunks = chunkArray(usersWithTelegram, CONCURRENCY_LIMIT);

    for (const chunk of chunks) {
      await Promise.all(
        chunk.map(async (user: any) => {
          try {
            const message = formatTransactionMessage(transaction, user);
            await sendTelegramMessage(user.telegramChatId, message);
            console.log(
              `[Notification] Sent to user ${user.userId} (${
                user.telegramUsername || "no username"
              })`
            );
          } catch (error) {
            console.error(
              `[Notification] Error sending to user ${user.userId}:`,
              error
            );
          }
        })
      );
    }
  } catch (error) {
    console.error("[Notification] Error sending notifications:", error);
  }
}

// Helper function to chunk array for parallel processing with concurrency limit
function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

function formatTransactionMessage(transaction: any, user: any): string {
  const {
    txHash,
    fromAddress,
    toAddress,
    value,
    asset,
    assetName,
    amountFloat,
    priceUSD,
    category,
  } = transaction;

  // Determine if incoming or outgoing
  const isIncoming =
    toAddress.toLowerCase() === transaction.trackedAddress?.toLowerCase();
  const direction = isIncoming ? "📥 Incoming" : "📤 Outgoing";

  // Format amount - use amountFloat for tokens, otherwise calculate from wei
  const displayAmount = amountFloat
    ? amountFloat.toFixed(6)
    : (parseFloat(value || 0) / 1e18).toFixed(6);

  // Get token name/symbol
  const tokenSymbol = assetName || asset || "ETH";

  // Format USD value if available
  const usdValue =
    priceUSD && priceUSD > 0
      ? ` (~$${parseFloat(priceUSD).toFixed(2)})`
      : "";

  // Shorten addresses for readability
  const formatAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  let message = `${direction} Transaction Alert!\n\n`;
  message += `💰 ${displayAmount} ${tokenSymbol}${usdValue}\n`;
  message += `${isIncoming ? "👤 From" : "📍 To"}: ${formatAddress(
    isIncoming ? fromAddress : toAddress
  )}\n`;
  message += `🔗 TX: ${formatAddress(txHash)}\n\n`;
  message += `View on Basescan:\nhttps://basescan.org/tx/${txHash}`;

  return message;
}

async function sendTelegramMessage(chatId: string, message: string) {
  try {
    const response = await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
      chat_id: chatId,
      text: message,
      parse_mode: "HTML",
      disable_web_page_preview: false,
    });

    if (!response.data.ok) {
      throw new Error(`Telegram API error: ${response.data.description}`);
    }
  } catch (error: any) {
    console.error("[Telegram] Error sending message:", error.message);
    throw error;
  }
}

// Initialize services
async function initialize() {
  await connectRabbitMQ();
}

// Internal endpoint: Cleanup user data (called by user service during deletion)
app.post("/api/internal/users/:userId/cleanup", async (req, res) => {
  try {
    const { userId } = req.params;

    // Verify this is an internal request
    const internalKey = req.headers['x-internal-service'];
    if (internalKey !== process.env.INTERNAL_SERVICE_KEY && internalKey !== 'user-service') {
      return res.status(403).json({ error: 'Forbidden - internal endpoint' });
    }

    // Delete all notification data for this user
    await handleUserDeleted(userId);

    res.json({ success: true });
  } catch (error) {
    console.error('[GDPR] Error cleaning up user notification data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, async () => {
  console.log(`Notification service running on port ${PORT}`);
  await initialize();
});
