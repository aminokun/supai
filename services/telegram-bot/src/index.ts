import { Telegraf, Context } from 'telegraf';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// Import services
import { sessionManager } from './services/session-manager.js';
import { apiClient } from './services/api-client.js';
import { rabbitmqConsumer } from './services/rabbitmq-consumer.js';

// Import commands
import { startCommand } from './commands/start.js';
import { linkCommand } from './commands/link.js';
import { unlinkCommand, handleUnlinkCallbacks } from './commands/unlink.js';
import { helpCommand } from './commands/help.js';
import { listCommand } from './commands/list.js';
import { trackCommand } from './commands/track.js';
import { untrackCommand } from './commands/untrack.js';
import { statsCommand } from './commands/stats.js';

// Extended context with session
export interface BotContext extends Context {
  session?: {
    userId?: string;
    isLinked: boolean;
    lastActivity: Date;
  };
}

// Initialize Express app for health checks
const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'telegram-bot',
    timestamp: new Date().toISOString()
  });
});

// Initialize Telegram bot
const bot = new Telegraf<BotContext>(process.env.TELEGRAM_BOT_TOKEN!);

// Middleware: Session management
bot.use(async (ctx, next) => {
  const chatId = ctx.chat?.id.toString();

  if (chatId) {
    // Load or create session
    ctx.session = await sessionManager.getSession(chatId);

    // Update last activity
    if (ctx.session) {
      ctx.session.lastActivity = new Date();
      await sessionManager.updateSession(chatId, ctx.session);
    }
  }

  return next();
});

// Middleware: Error handling
bot.catch((err, ctx) => {
  console.error('[Bot] Error:', err);
  ctx.reply('Sorry, an error occurred while processing your request. Please try again later.');
});

// Register commands
bot.command('start', startCommand);
bot.command('link', linkCommand);
bot.command('unlink', unlinkCommand);
bot.command('help', helpCommand);
bot.command('list', listCommand);
bot.command('track', trackCommand);
bot.command('untrack', untrackCommand);
bot.command('stats', statsCommand);

// Handle text messages (for link code input)
bot.on('text', async (ctx) => {
  const message = ctx.message.text;
  const chatId = ctx.chat.id.toString();

  // Check if user is in linking process
  const linkingState = sessionManager.getLinkingState(chatId);

  if (linkingState && linkingState.waitingForCode) {
    // Treat as link code
    try {
      const code = message.trim();

      // Validate code format (6 digits)
      if (!/^\d{6}$/.test(code)) {
        return ctx.reply('Invalid code format. Please enter the 6-digit code from your account settings.');
      }

      // Verify code with user service
      const result = await apiClient.verifyLinkCode(code, chatId, ctx.from?.username);

      if (result.success) {
        // Update session
        ctx.session = {
          userId: result.userId,
          isLinked: true,
          lastActivity: new Date()
        };
        await sessionManager.updateSession(chatId, ctx.session);

        // Clear linking state
        sessionManager.clearLinkingState(chatId);

        await ctx.reply(
          `✅ <b>Account linked successfully!</b>\n\n` +
          `Your Telegram is now connected to your Supai account.\n` +
          `You will receive notifications for wallet transactions here.\n\n` +
          `Use /help to see available commands.`,
          { parse_mode: 'HTML' }
        );
      } else {
        await ctx.reply(
          '❌ Invalid or expired code. Please check the code and try again.\n' +
          'Get a new code from your account settings if needed.'
        );
      }
    } catch (error) {
      console.error('[Bot] Link code verification error:', error);
      await ctx.reply('Failed to verify code. Please try again later.');
    }
  } else if (!ctx.session?.isLinked) {
    // User not linked
    await ctx.reply(
      'Please link your Telegram account first using /link command.'
    );
  }
});

// Handle callback queries (inline keyboard buttons)
bot.on('callback_query', async (ctx) => {
  const data = ctx.callbackQuery.data;

  if (data?.startsWith('untrack:')) {
    const address = data.replace('untrack:', '');

    try {
      if (!ctx.session?.userId) {
        return ctx.answerCbQuery('Please link your account first');
      }

      await apiClient.removeWallet(ctx.session.userId, address);

      await ctx.answerCbQuery('Wallet removed from tracking');
      await ctx.editMessageText(
        `✅ Wallet removed from tracking:\n<code>${address}</code>`,
        { parse_mode: 'HTML' }
      );
    } catch (error) {
      console.error('[Bot] Untrack error:', error);
      await ctx.answerCbQuery('Failed to remove wallet');
    }
  } else if (data === 'confirm_unlink' || data === 'cancel_unlink') {
    // Handle unlink confirmation
    await handleUnlinkCallbacks(ctx);
  }

  // Always acknowledge callback query if not already done
  if (!ctx.callbackQuery.answered) {
    await ctx.answerCbQuery();
  }
});

// Initialize services
async function initializeServices() {
  try {
    // Start RabbitMQ consumer for notifications
    await rabbitmqConsumer.connect();
    await rabbitmqConsumer.startConsumer(bot);
    console.log('[Init] RabbitMQ consumer connected');

    // Initialize session manager
    await sessionManager.initialize();
    console.log('[Init] Session manager initialized');

    // Verify API connectivity
    const health = await apiClient.checkHealth();
    console.log('[Init] API Gateway connectivity:', health ? 'OK' : 'Failed');

    console.log('[Init] All services initialized successfully');
  } catch (error) {
    console.error('[Init] Error initializing services:', error);
    // Continue running even if some services fail
  }
}

// Start servers
async function start() {
  // Start Express server
  app.listen(PORT, () => {
    console.log(`🚀 Telegram bot service running on port ${PORT}`);
  });

  // Start Telegram bot
  bot.launch({
    webhook: undefined, // Use long polling for development
    dropPendingUpdates: true // Skip old messages
  });

  console.log(`🤖 Telegram bot @${process.env.BOT_USERNAME} is running`);

  // Initialize services
  await initializeServices();
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('[Shutdown] SIGTERM received');
  bot.stop('SIGTERM');
  await rabbitmqConsumer.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('[Shutdown] SIGINT received');
  bot.stop('SIGINT');
  await rabbitmqConsumer.close();
  process.exit(0);
});

// Start the service
start().catch(console.error);