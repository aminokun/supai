import express from "express";
import cors from "cors";
import "dotenv/config";
import amqp from "amqplib";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "notification-service" });
});

// Telegram Bot configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

// RabbitMQ connection
let channel: amqp.Channel | null = null;

async function connectRabbitMQ() {
  try {
    console.log("[RabbitMQ] Connecting to RabbitMQ...");
    const connection = await amqp.connect(
      process.env.RABBITMQ_URL ||
        "amqp://rabbitmq_admin:rabbitmqpassword@localhost:5672"
    );
    channel = await connection.createChannel();
    console.log("[RabbitMQ] Channel created");

    // Create exchange if it doesn't exist
    await channel.assertExchange("wallet-events", "topic", { durable: true });
    console.log("[RabbitMQ] Exchange asserted");

    // Create queue for transaction notifications
    const queue = await channel.assertQueue("notification.transactions", {
      durable: true,
    });
    console.log("[RabbitMQ] Queue asserted:", queue.queue);

    // Bind queue to transaction events
    await channel.bindQueue(
      queue.queue,
      "wallet-events",
      "wallet.transaction.detected"
    );
    console.log(
      "[RabbitMQ] Queue bound to exchange with routing key: wallet.transaction.detected"
    );

    console.log("[RabbitMQ] Connected and listening for transaction events");

    // Consume messages
    console.log("[RabbitMQ] Setting up consumer...");
    const consumeResult = await channel.consume(
      queue.queue,
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
    console.log("[RabbitMQ] Consumer tag:", consumeResult.consumerTag);
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
    const { transaction, affectedUsers } = data;

    // The data structure from wallet-tracking service is different
    // It sends the transaction data directly with affectedUsers array
    const actualTransaction = transaction || data;
    const users = affectedUsers || data.affectedUsers;

    if (!users || users.length === 0) {
      console.log("[Notification] No users to notify");
      return;
    }

    console.log(`[Notification] Notifying ${users.length} users`);

    // Get user details from User Service to get Telegram chat IDs
    for (const userId of users) {
      try {
        // Fetch user details from User service
        const userResponse = await axios.get(
          `${
            process.env.USER_SERVICE_URL || "http://localhost:3007"
          }/api/users/${userId}`
        );
        const user = userResponse.data;

        if (!user.telegramChatId) {
          console.log(
            `[Notification] User ${userId} has no Telegram chat ID linked`
          );
          continue;
        }

        // Format the notification message
        const message = formatTransactionMessage(actualTransaction, user);

        // Send Telegram message
        await sendTelegramMessage(user.telegramChatId, message);

        console.log(
          `[Notification] Sent to user ${userId} (${user.telegramUsername})`
        );
      } catch (error) {
        console.error(`[Notification] Error sending to user ${userId}:`, error);
      }
    }
  } catch (error) {
    console.error("[Notification] Error sending notifications:", error);
  }
}

function formatTransactionMessage(transaction: any, user: any): string {
  const { txHash, fromAddress, toAddress, value, asset, category } =
    transaction;

  // Determine if incoming or outgoing
  const isIncoming =
    toAddress.toLowerCase() === transaction.trackedAddress?.toLowerCase();
  const direction = isIncoming ? "📥 Incoming" : "📤 Outgoing";

  // Format value
  const amount = parseFloat(value).toFixed(6);

  // Shorten addresses for readability
  const formatAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  let message = `${direction} Transaction Alert!\n\n`;
  message += `💰 Amount: ${amount} ${asset || "ETH"}\n`;
  message += `${isIncoming ? "👤 From" : "📍 To"}: ${formatAddress(
    isIncoming ? fromAddress : toAddress
  )}\n`;
  message += `📊 Type: ${category || "transfer"}\n`;
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

app.listen(PORT, async () => {
  console.log(`Notification service running on port ${PORT}`);
  await initialize();
});
