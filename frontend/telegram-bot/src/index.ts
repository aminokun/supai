import express from "express";
import type { Response } from "express";
import cors from "cors";
import { Telegraf, Context } from "telegraf";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3006;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";

if (!TELEGRAM_BOT_TOKEN) {
  console.error("Error: TELEGRAM_BOT_TOKEN environment variable is not set");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

const bot = new Telegraf<Context>(TELEGRAM_BOT_TOKEN);

app.get("/health", (req: express.Request, res: Response) => {
  res.json({ status: "ok", service: "telegram-bot" });
});

bot.command("start", async (ctx: Context) => {
  await ctx.reply("Welcome to Supai Bot! Use /help for available commands.");
});

bot.command("help", async (ctx: Context) => {
  await ctx.reply(
    "Available commands:\n" +
      "/start - Link your account\n" +
      "/status - Check portfolio status\n" +
      "/help - Show this help message"
  );
});

bot.catch(async (err: unknown, ctx: Context) => {
  console.error("Bot error:", err);
  try {
    await ctx.reply("An error occurred. Please try again later.");
  } catch (replyErr) {
    console.error("Failed to send error message:", replyErr);
  }
});

app.listen(PORT, () => {
  console.log(`Telegram bot API running on port ${PORT}`);
});

bot
  .launch()
  .then(() => console.log("Telegram bot started and polling for messages"))
  .catch((err: Error) => {
    console.error("Failed to start bot:", err);
    process.exit(1);
  });

process.once("SIGINT", () => {
  console.log("Stopping bot...");
  bot.stop("SIGINT");
  process.exit(0);
});

process.once("SIGTERM", () => {
  console.log("Stopping bot...");
  bot.stop("SIGTERM");
  process.exit(0);
});
