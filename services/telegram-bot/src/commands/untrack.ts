import { Markup } from 'telegraf';
import { BotContext } from '../index.js';
import { apiClient } from '../services/api-client.js';

export async function untrackCommand(ctx: BotContext) {
  // Check if linked
  if (!ctx.session?.isLinked) {
    return ctx.reply(
      '❌ Please link your account first using /link command.'
    );
  }

  // Parse command arguments
  const commandText = ctx.message?.text || '';
  const parts = commandText.split(' ').filter(p => p.length > 0);

  // Check if address provided
  if (parts.length < 2) {
    // Show list of wallets with untrack buttons
    try {
      const wallets = await apiClient.getUserWallets(ctx.session.userId!);

      if (wallets.length === 0) {
        return ctx.reply(
          `📝 <b>Untrack a Wallet</b>\n\n` +
          `You don't have any tracked wallets.\n\n` +
          `Use /track to add wallets first.`,
          { parse_mode: 'HTML' }
        );
      }

      let message = `📝 <b>Select a Wallet to Untrack</b>\n\n`;
      const buttons = [];

      for (const wallet of wallets) {
        message += `• <b>${wallet.name}</b>\n`;
        message += `  <code>${wallet.address.slice(0, 10)}...${wallet.address.slice(-8)}</code>\n\n`;

        buttons.push([
          Markup.button.callback(
            `❌ ${wallet.name}`,
            `untrack:${wallet.address}`
          )
        ]);
      }

      message += `Or use: <code>/untrack &lt;address&gt;</code>`;

      await ctx.reply(
        message,
        {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard(buttons)
        }
      );
    } catch (error) {
      console.error('[UntrackCommand] Error fetching wallets:', error);
      await ctx.reply(
        '❌ Failed to fetch wallets. Please try again later.'
      );
    }
    return;
  }

  const address = parts[1];

  // Validate address format
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return ctx.reply(
      `❌ Invalid Ethereum address format.\n\n` +
      `Please provide a valid address starting with 0x.\n\n` +
      `Example: <code>/untrack 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0</code>`,
      { parse_mode: 'HTML' }
    );
  }

  try {
    // Send typing indicator
    await ctx.sendChatAction('typing');

    // Remove wallet via API
    const success = await apiClient.removeWallet(ctx.session.userId!, address);

    if (success) {
      await ctx.reply(
        `✅ <b>Wallet Removed</b>\n\n` +
        `Address: <code>${address}</code>\n\n` +
        `You will no longer receive notifications for this wallet.\n\n` +
        `Use /list to see your remaining tracked wallets.`,
        { parse_mode: 'HTML' }
      );
    } else {
      await ctx.reply(
        '❌ Failed to remove wallet. Make sure the address is correct and try again.'
      );
    }
  } catch (error) {
    console.error('[UntrackCommand] Error:', error);
    await ctx.reply(
      '❌ Failed to remove wallet. Please try again later.'
    );
  }
}