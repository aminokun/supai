import { BotContext } from '../index.js';

export async function startCommand(ctx: BotContext) {
  const firstName = ctx.from?.first_name || 'there';
  const isLinked = ctx.session?.isLinked || false;

  if (isLinked) {
    await ctx.reply(
      `👋 Welcome back, <b>${firstName}!</b>\n\n` +
      `Your Telegram account is already linked to Supai.\n\n` +
      `<b>Available Commands:</b>\n` +
      `/list - View your tracked wallets\n` +
      `/track - Add a wallet to tracking\n` +
      `/untrack - Remove a wallet from tracking\n` +
      `/stats - View your tracking statistics\n` +
      `/help - Show all commands\n` +
      `/unlink - Disconnect your Telegram account\n\n` +
      `You'll receive notifications here when transactions occur on your tracked wallets.`,
      { parse_mode: 'HTML' }
    );
  } else {
    await ctx.reply(
      `👋 Welcome to <b>Supai Wallet Tracker</b>, ${firstName}!\n\n` +
      `I help you track Ethereum wallet transactions and receive instant notifications.\n\n` +
      `<b>To get started:</b>\n` +
      `1. Create an account at supai.app\n` +
      `2. Go to Settings → Connect Telegram\n` +
      `3. Copy your unique linking code\n` +
      `4. Use /link command here and enter your code\n\n` +
      `Once linked, you can track wallets and receive real-time transaction alerts directly in Telegram!`,
      { parse_mode: 'HTML' }
    );
  }
}