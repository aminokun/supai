import { BotContext } from '../index.js';

export async function statusCommand(ctx: BotContext) {
  try {
    const chatId = ctx.chat?.id.toString();

    if (!chatId) {
      return ctx.reply('❌ Unable to determine chat ID.');
    }

    // Check session status
    const session = ctx.session;

    if (!session || !session.isLinked || !session.userId) {
      return ctx.reply(
        '📊 *Status*\n\n' +
        '❌ Account not linked\n\n' +
        'Use /link to connect your account.',
        { parse_mode: 'Markdown' }
      );
    }

    // Get user details
    const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:3007';
    const url = `${userServiceUrl}/api/users/${session.userId}`;
    console.log(`[StatusCommand] Fetching user details from: ${url}`);

    const response = await fetch(url);

    if (!response.ok) {
      console.error(`[StatusCommand] Failed to fetch user: ${response.status} ${response.statusText}`);
      return ctx.reply('❌ Unable to fetch account details. Please try again later.');
    }

    const user = await response.json();

    // Format status message
    let statusMessage = '📊 *Account Status*\n\n';
    statusMessage += `✅ Linked to account\n`;
    statusMessage += `👤 Username: ${user.telegramUsername || 'Not set'}\n`;
    statusMessage += `🔗 Chat ID: ${chatId}\n`;
    statusMessage += `📅 Linked since: ${new Date(session.lastActivity).toLocaleDateString()}\n\n`;
    statusMessage += '💡 _Your account is ready to receive notifications_';

    return ctx.reply(statusMessage, { parse_mode: 'Markdown' });
  } catch (error) {
    console.error('[StatusCommand] Error:', error);
    return ctx.reply('❌ Failed to fetch status. Please try again later.');
  }
}