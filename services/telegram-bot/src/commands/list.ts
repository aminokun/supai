import { Markup } from 'telegraf';
import { BotContext } from '../index.js';
import { apiClient } from '../services/api-client.js';

export async function listCommand(ctx: BotContext) {
  // Check if linked
  if (!ctx.session?.isLinked) {
    return ctx.reply(
      '❌ Please link your account first using /link command.'
    );
  }

  try {
    // Fetch user's wallets
    const wallets = await apiClient.getUserWallets(ctx.session.userId!);

    if (wallets.length === 0) {
      return ctx.reply(
        `📋 <b>Your Tracked Wallets</b>\n\n` +
        `You haven't added any wallets yet.\n\n` +
        `Use /track command to start tracking wallets:\n` +
        `<code>/track 0xAddress WalletName</code>`,
        { parse_mode: 'HTML' }
      );
    }

    // Group wallets by groupName
    const grouped = wallets.reduce((acc, wallet) => {
      const group = wallet.groupName || 'Ungrouped';
      if (!acc[group]) acc[group] = [];
      acc[group].push(wallet);
      return acc;
    }, {} as Record<string, typeof wallets>);

    let message = `📋 <b>Your Tracked Wallets</b> (${wallets.length} total)\n\n`;

    // Display wallets by group
    for (const [group, groupWallets] of Object.entries(grouped)) {
      if (group !== 'Ungrouped') {
        message += `<b>📁 ${group}</b>\n`;
      }

      for (const wallet of groupWallets) {
        const status = wallet.isActive ? '🟢' : '🔴';
        message += `${status} <b>${wallet.name}</b>\n`;
        message += `<code>${wallet.address}</code>\n`;

        // Add inline button for quick untrack
        message += `/untrack_${wallet.address.slice(0, 8)}\n\n`;
      }
    }

    // Add summary
    const activeCount = wallets.filter(w => w.isActive).length;
    message += `<i>Active: ${activeCount} | Inactive: ${wallets.length - activeCount}</i>\n\n`;
    message += `Use /track to add more wallets\n`;
    message += `Use /untrack to remove wallets`;

    await ctx.reply(message, { parse_mode: 'HTML' });
  } catch (error) {
    console.error('[ListCommand] Error:', error);
    await ctx.reply(
      '❌ Failed to fetch your wallets. Please try again later.'
    );
  }
}