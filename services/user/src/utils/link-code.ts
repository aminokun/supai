/**
 * Utility functions for managing Telegram linking codes
 */

export interface LinkingCode {
  userId: string;
  createdAt: Date;
}

/**
 * Generate a 6-digit linking code
 */
export function generateLinkCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Validate linking code format (must be 6 digits)
 */
export function isValidCodeFormat(code: string): boolean {
  return /^\d{6}$/.test(code);
}

/**
 * Check if a linking code has expired
 */
export function isCodeExpired(codeData: LinkingCode, maxAgeMs: number = 5 * 60 * 1000): boolean {
  const now = new Date();
  const age = now.getTime() - codeData.createdAt.getTime();
  return age > maxAgeMs;
}

/**
 * Calculate remaining time for a code in seconds
 */
export function getRemainingTime(codeData: LinkingCode, maxAgeMs: number = 5 * 60 * 1000): number {
  const now = new Date();
  const age = now.getTime() - codeData.createdAt.getTime();
  const remaining = maxAgeMs - age;
  return Math.max(0, Math.floor(remaining / 1000));
}

/**
 * Format expiry time as human-readable string
 */
export function formatExpiryTime(seconds: number): string {
  if (seconds <= 0) return 'expired';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }
  return `${remainingSeconds}s`;
}

/**
 * Create a new linking code data structure
 */
export function createLinkingCode(userId: string): LinkingCode {
  return {
    userId,
    createdAt: new Date()
  };
}

/**
 * Validate linking code request parameters
 */
export interface VerifyCodeParams {
  code?: string;
  telegramChatId?: string;
  telegramUsername?: string;
}

export function validateVerifyCodeParams(params: VerifyCodeParams): {
  valid: boolean;
  error?: string;
} {
  if (!params.code) {
    return { valid: false, error: 'Code is required' };
  }

  if (!isValidCodeFormat(params.code)) {
    return { valid: false, error: 'Code must be 6 digits' };
  }

  if (!params.telegramChatId) {
    return { valid: false, error: 'Telegram chat ID is required' };
  }

  return { valid: true };
}

/**
 * Clean up expired codes from a Map
 */
export function cleanupExpiredCodes(
  codes: Map<string, LinkingCode>,
  maxAgeMs: number = 5 * 60 * 1000
): number {
  let removed = 0;

  for (const [code, data] of codes.entries()) {
    if (isCodeExpired(data, maxAgeMs)) {
      codes.delete(code);
      removed++;
    }
  }

  return removed;
}
