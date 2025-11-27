import { BotContext } from '../index.js';
import { sessionManager } from '../services/session-manager.js';

export async function linkCommand(ctx: BotContext): Promise<void> {
  const chatId = ctx.chat!.id.toString();

  // Check if already linked
  if (ctx.session?.isLinked) {
    return ctx.reply(
      '✅ Your Telegram is already linked to a Supai account.\n\n' +
      'Use /unlink if you want to disconnect and link a different account.'
    );
  }

  // Check for code in command (e.g., /link 123456)
  const commandText = ctx.message?.text || '';
  const parts = commandText.split(' ');

  if (parts.length > 1) {
    // Code provided with command
    const code = parts[1].trim();

    // Validate code format
    if (!/^\d{6}$/.test(code)) {
      return ctx.reply(
        '❌ Invalid code format. Please enter a 6-digit code.\n\n' +
        'Example: /link 123456'
      );
    }

    // Process code directly
    try {
      const { apiClient } = await import('../services/api-client.js');
      const result = await apiClient.verifyLinkCode(code, chatId, ctx.from?.username);

      if (result.success) {
        // Update session
        ctx.session = {
          userId: result.userId,
          isLinked: true,
          lastActivity: new Date()
        };
        await sessionManager.updateSession(chatId, ctx.session);

        await ctx.reply(
          `✅ <b>Account linked successfully!</b>\n\n` +
          `Your Telegram is now connected to your Supai account.\n` +
          `You will receive notifications for wallet transactions here.\n\n` +
          `Use /help to see available commands.`,
          { parse_mode: 'HTML' }
        );
      } else {
        await ctx.reply(
          `❌ ${result.error || 'Invalid or expired code'}\n\n` +
          'Please check your code and try again.\n' +
          'Get a new code from your account settings if needed.'
        );
      }
    } catch (error) {
      console.error('[LinkCommand] Error:', error);
      await ctx.reply('Failed to verify code. Please try again later.');
    }
  } else {
    // No code provided, set waiting state
    sessionManager.setLinkingState(chatId);

    await ctx.reply(
      `🔗 <b>Link Your Supai Account</b>\n\n` +
      `Please follow these steps:\n` +
      `1. Log in to your account at supai.app\n` +
      `2. Go to Settings → Connect Telegram\n` +
      `3. Copy the 6-digit code\n` +
      `4. Send the code here\n\n` +
      `<i>The code expires in 15 minutes.</i>\n\n` +
      `You can also use: /link YOUR_CODE`,
      { parse_mode: 'HTML' }
    );
  }
}