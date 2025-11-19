import { Markup } from 'telegraf';
import { BotContext } from '../index.js';
import { sessionManager } from '../services/session-manager.js';
import { apiClient } from '../services/api-client.js';

export async function unlinkCommand(ctx: BotContext) {
  const chatId = ctx.chat!.id.toString();

  // Check if linked
  if (!ctx.session?.isLinked) {
    return ctx.reply(
      '❌ Your Telegram is not linked to any account.\n\n' +
      'Use /link to connect your Supai account.'
    );
  }

  // Ask for confirmation with inline keyboard
  await ctx.reply(
    '⚠️ <b>Unlink Confirmation</b>\n\n' +
    'Are you sure you want to unlink your Telegram from your Supai account?\n\n' +
    'You will:\n' +
    '• Stop receiving wallet transaction notifications\n' +
    '• Need to link again to use bot features\n' +
    '• Keep all your tracked wallets in your account',
    {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [
          Markup.button.callback('✅ Yes, unlink', 'confirm_unlink'),
          Markup.button.callback('❌ Cancel', 'cancel_unlink')
        ]
      ])
    }
  );
}

// Handle the confirmation callbacks
export async function handleUnlinkCallbacks(ctx: BotContext) {
  const action = ctx.callbackQuery?.data;

  if (action === 'confirm_unlink') {
    const chatId = ctx.chat!.id.toString();

    try {
      // Call API to unlink
      const success = await apiClient.unlinkTelegram(chatId);

      if (success) {
        // Clear session
        await sessionManager.removeSession(chatId);

        await ctx.editMessageText(
          '✅ <b>Successfully unlinked!</b>\n\n' +
          'Your Telegram has been disconnected from your Supai account.\n\n' +
          'You can link again anytime using /link command.',
          { parse_mode: 'HTML' }
        );
      } else {
        await ctx.editMessageText(
          '❌ Failed to unlink account. Please try again later.'
        );
      }
    } catch (error) {
      console.error('[UnlinkCommand] Error:', error);
      await ctx.editMessageText(
        '❌ An error occurred while unlinking. Please try again later.'
      );
    }
  } else if (action === 'cancel_unlink') {
    await ctx.editMessageText(
      '✅ Unlink cancelled. Your account remains connected.'
    );
  }

  await ctx.answerCbQuery();
}