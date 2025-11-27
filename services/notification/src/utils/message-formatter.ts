/**
 * Utility functions for formatting Telegram notification messages
 */

export interface TransactionData {
  txHash: string;
  fromAddress: string;
  toAddress: string;
  value: string;
  asset: string;
  blockNumber?: number;
  category?: string;
}

export interface UserData {
  userId: string;
  telegramChatId?: string | null;
  telegramUsername?: string | null;
}

/**
 * Shorten Ethereum address for display
 */
export function shortenAddress(address: string): string {
  if (!address || address.length < 10) {
    return address;
  }
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Determine transaction direction for a user
 */
export function getTransactionDirection(
  transaction: TransactionData,
  userAddress: string
): 'incoming' | 'outgoing' | 'unknown' {
  const normalizedUserAddress = userAddress.toLowerCase();
  const normalizedToAddress = transaction.toAddress?.toLowerCase();
  const normalizedFromAddress = transaction.fromAddress?.toLowerCase();

  if (normalizedToAddress === normalizedUserAddress) {
    return 'incoming';
  } else if (normalizedFromAddress === normalizedUserAddress) {
    return 'outgoing';
  }
  return 'unknown';
}

/**
 * Get emoji for transaction direction
 */
export function getDirectionEmoji(direction: 'incoming' | 'outgoing' | 'unknown'): string {
  switch (direction) {
    case 'incoming':
      return '📥';
    case 'outgoing':
      return '📤';
    default:
      return '🔄';
  }
}

/**
 * Format transaction message for Telegram
 */
export function formatTransactionMessage(
  transaction: TransactionData,
  direction: 'incoming' | 'outgoing' | 'unknown'
): string {
  const emoji = getDirectionEmoji(direction);
  const directionText = direction.charAt(0).toUpperCase() + direction.slice(1);
  const shortHash = transaction.txHash.slice(0, 10);

  return `${emoji} <b>${directionText} Transaction</b>\n\n` +
    `<b>Amount:</b> ${transaction.value} ${transaction.asset}\n` +
    `<b>From:</b> <code>${shortenAddress(transaction.fromAddress)}</code>\n` +
    `<b>To:</b> <code>${shortenAddress(transaction.toAddress)}</code>\n` +
    `<b>Hash:</b> <code>${shortHash}...</code>\n` +
    (transaction.blockNumber ? `<b>Block:</b> ${transaction.blockNumber}\n` : '');
}

/**
 * Validate if user has Telegram linked
 */
export function hasValidTelegramChatId(user: UserData): boolean {
  return !!(user.telegramChatId && user.telegramChatId.trim().length > 0);
}

/**
 * Format error message for user
 */
export function formatErrorMessage(error: string): string {
  return `❌ <b>Error</b>\n\n${error}`;
}

/**
 * Format success message
 */
export function formatSuccessMessage(message: string): string {
  return `✅ <b>Success</b>\n\n${message}`;
}

/**
 * Validate Ethereum address format
 */
export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Normalize Ethereum address to lowercase
 */
export function normalizeAddress(address: string): string {
  return address.toLowerCase();
}
