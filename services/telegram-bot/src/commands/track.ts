import { BotContext } from '../index.js';
import { apiClient } from '../services/api-client.js';

export async function trackCommand(ctx: BotContext): Promise<void> {
  // Check if linked
  if (!ctx.session?.isLinked) {
    void ctx.reply(
      '❌ Please link your account first using /link command.'
    );
    return;
  }

  // Parse command arguments
  const commandText = ctx.message && 'text' in ctx.message ? ctx.message.text : '';
  const parts = commandText.split(' ').filter((p: string) => p.length > 0);

  // Check if arguments provided
  if (parts.length < 3) {
    void ctx.reply(
      `📝 <b>Track a Wallet</b>\n\n` +
      `<b>Usage:</b>\n` +
      `<code>/track &lt;address&gt; &lt;name&gt; [group]</code>\n\n` +
      `<b>Examples:</b>\n` +
      `• Basic: <code>/track 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0 Vitalik</code>\n` +
      `• With group: <code>/track 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0 Vitalik Developers</code>\n\n` +
      `<b>Parameters:</b>\n` +
      `• address: Ethereum wallet address (0x...)\n` +
      `• name: Custom name for the wallet\n` +
      `• group: Optional grouping (e.g., "DeFi", "NFT", "Personal")\n\n` +
      `Groups help organize your tracked wallets.`,
      { parse_mode: 'HTML' }
    );
    return;
  }

  const address = parts[1];
  const name = parts[2];
  const groupName = parts.slice(3).join(' ') || undefined;

  // Validate Ethereum address format
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    void ctx.reply(
      `❌ Invalid Ethereum address format.\n\n` +
      `Please provide a valid address starting with 0x followed by 40 hexadecimal characters.\n\n` +
      `Example: <code>0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0</code>`,
      { parse_mode: 'HTML' }
    );
    return;
  }

  // Validate name length
  if (name.length > 50) {
    void ctx.reply(
      '❌ Wallet name is too long. Please use a name under 50 characters.'
    );
    return;
  }

  try {
    // Send typing indicator
    await ctx.sendChatAction('typing');

    // Add wallet via API
    const wallet = await apiClient.addWallet(
      ctx.session.userId!,
      address,
      name,
      groupName
    );

    if (wallet) {
      let successMessage = `✅ <b>Wallet Added Successfully!</b>\n\n`;
      successMessage += `<b>Name:</b> ${wallet.name}\n`;
      successMessage += `<b>Address:</b> <code>${wallet.address}</code>\n`;

      if (groupName) {
        successMessage += `<b>Group:</b> ${groupName}\n`;
      }

      successMessage += `\nYou'll receive notifications when transactions occur on this wallet.\n\n`;
      successMessage += `Use /list to see all your tracked wallets.`;

      await ctx.reply(successMessage, { parse_mode: 'HTML' });
    } else {
      throw new Error('Failed to add wallet');
    }
  } catch (error: any) {
    console.error('[TrackCommand] Error:', error);

    let errorMessage = '❌ ';

    if (error.message?.includes('already tracked')) {
      errorMessage += 'You are already tracking this wallet.';
    } else if (error.message?.includes('limit')) {
      errorMessage += 'You have reached the maximum number of tracked wallets.';
    } else {
      errorMessage += 'Failed to add wallet. Please try again later.';
    }

    await ctx.reply(errorMessage);
  }
}