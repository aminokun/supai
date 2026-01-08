import { BotContext } from '../index.js';
import { apiClient } from '../services/api-client.js';

export async function statsCommand(ctx: BotContext): Promise<void> {
  // Check if linked
  if (!ctx.session?.isLinked) {
    void ctx.reply(
      '❌ Please link your account first using /link command.'
    );
    return;
  }

  try {
    // Send typing indicator
    await ctx.sendChatAction('typing');

    // Fetch user stats
    const stats = await apiClient.getUserStats(ctx.session.userId!);

    if (!stats) {
      throw new Error('Failed to fetch stats');
    }

    let message = `📊 <b>Your Tracking Statistics</b>\n\n`;

    message += `<b>Wallets:</b>\n`;
    message += `• Total: ${stats.totalWallets}\n`;
    message += `• Active: ${stats.activeWallets}\n`;
    message += `• Inactive: ${stats.totalWallets - stats.activeWallets}\n\n`;

    if (stats.groups > 0) {
      message += `<b>Groups:</b> ${stats.groups}\n\n`;
    }

    if (stats.recentTransactions !== undefined) {
      message += `<b>Recent Activity:</b>\n`;
      message += `• Transactions (24h): ${stats.recentTransactions}\n\n`;
    }

    // Add usage tips based on stats
    if (stats.totalWallets === 0) {
      message += `💡 <i>Tip: Start by adding wallets with /track command</i>`;
    } else if (stats.totalWallets === 1) {
      message += `💡 <i>Tip: Track multiple wallets to monitor your entire portfolio</i>`;
    } else if (stats.groups === 0) {
      message += `💡 <i>Tip: Use groups to organize your wallets (e.g., "DeFi", "NFTs")</i>`;
    }

    message += `\n\nUse /list to view all your wallets\n`;
    message += `Use /help for more commands`;

    await ctx.reply(message, { parse_mode: 'HTML' });
  } catch (error) {
    console.error('[StatsCommand] Error:', error);
    await ctx.reply(
      '❌ Failed to fetch statistics. Please try again later.'
    );
  }
}