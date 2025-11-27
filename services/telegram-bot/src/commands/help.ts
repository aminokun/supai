import { BotContext } from '../index.js';

export async function helpCommand(ctx: BotContext) {
  const isLinked = ctx.session?.isLinked || false;

  let helpMessage = `📚 <b>Supai Bot Commands</b>\n\n`;

  if (isLinked) {
    helpMessage += `<b>Wallet Management:</b>\n`;
    helpMessage += `/list - View all your tracked wallets\n`;
    helpMessage += `/track <address> <name> - Add a wallet to tracking\n`;
    helpMessage += `/untrack <address> - Remove wallet from tracking\n`;
    helpMessage += `/stats - View your tracking statistics\n\n`;

    helpMessage += `<b>Account:</b>\n`;
    helpMessage += `/unlink - Disconnect your Telegram account\n`;
    helpMessage += `/help - Show this help message\n\n`;

    helpMessage += `<b>Usage Examples:</b>\n`;
    helpMessage += `• Track a wallet:\n`;
    helpMessage += `  <code>/track 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0 Vitalik</code>\n\n`;
    helpMessage += `• Remove tracking:\n`;
    helpMessage += `  <code>/untrack 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0</code>\n\n`;

    helpMessage += `<b>Tips:</b>\n`;
    helpMessage += `• You'll receive instant notifications when transactions occur\n`;
    helpMessage += `• Wallet names help you identify addresses easily\n`;
    helpMessage += `• You can track multiple wallets simultaneously\n`;
  } else {
    helpMessage += `<b>Getting Started:</b>\n`;
    helpMessage += `/start - Welcome message and introduction\n`;
    helpMessage += `/link - Connect your Supai account\n`;
    helpMessage += `/help - Show this help message\n\n`;

    helpMessage += `<b>How to Connect:</b>\n`;
    helpMessage += `1. Create an account at supai.app\n`;
    helpMessage += `2. Go to Settings → Connect Telegram\n`;
    helpMessage += `3. Get your unique 6-digit code\n`;
    helpMessage += `4. Use /link command and enter the code\n\n`;

    helpMessage += `Once connected, you can track Ethereum wallets and receive real-time notifications!`;
  }

  helpMessage += `\n\n<i>Need help? Contact support at supai.app/support</i>`;

  await ctx.reply(helpMessage, { parse_mode: 'HTML' });
}