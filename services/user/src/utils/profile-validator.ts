/**
 * Utility functions for validating and processing user profile data
 */

export interface ProfileData {
  bio?: string | null;
  phone?: string | null;
  address?: string | null;
  country?: string | null;
}

export interface TelegramData {
  telegramChatId?: string | null;
  telegramUsername?: string | null;
}

/**
 * Validate phone number format (basic E.164 format)
 */
export function isValidPhoneNumber(phone: string): boolean {
  if (!phone) return false;
  // Basic validation: starts with +, contains only digits after +
  return /^\+\d{7,15}$/.test(phone);
}

/**
 * Validate telegram chat ID format (numeric string)
 */
export function isValidTelegramChatId(chatId: string): boolean {
  if (!chatId) return false;
  return /^\d+$/.test(chatId);
}

/**
 * Validate telegram username format
 */
export function isValidTelegramUsername(username: string): boolean {
  if (!username) return false;
  // Telegram usernames: 5-32 characters, alphanumeric and underscores
  return /^[a-zA-Z0-9_]{5,32}$/.test(username);
}

/**
 * Sanitize bio text (remove dangerous characters, limit length)
 */
export function sanitizeBio(bio: string, maxLength: number = 500): string {
  if (!bio) return '';

  // Remove control characters except newlines and tabs
  let sanitized = bio.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');

  // Trim and limit length
  sanitized = sanitized.trim();
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
}

/**
 * Validate profile data completeness
 */
export function validateProfileData(data: ProfileData): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (data.phone && !isValidPhoneNumber(data.phone)) {
    errors.push('Invalid phone number format (use E.164: +1234567890)');
  }

  if (data.bio && data.bio.length > 500) {
    errors.push('Bio must be 500 characters or less');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validate telegram data
 */
export function validateTelegramData(data: TelegramData): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (data.telegramChatId && !isValidTelegramChatId(data.telegramChatId)) {
    errors.push('Invalid Telegram chat ID format');
  }

  if (data.telegramUsername && !isValidTelegramUsername(data.telegramUsername)) {
    errors.push('Invalid Telegram username format');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Check if profile data has any fields set
 */
export function hasProfileData(data: ProfileData): boolean {
  return !!(data.bio || data.phone || data.address || data.country);
}

/**
 * Check if telegram is linked
 */
export function isTelegramLinked(data: TelegramData): boolean {
  return !!(data.telegramChatId && data.telegramChatId.trim().length > 0);
}

/**
 * Count populated fields in profile
 */
export function countProfileFields(data: ProfileData): number {
  let count = 0;

  if (data.bio) count++;
  if (data.phone) count++;
  if (data.address) count++;
  if (data.country) count++;

  return count;
}

/**
 * Normalize profile data (trim strings, handle nulls)
 */
export function normalizeProfileData(data: ProfileData): ProfileData {
  return {
    bio: data.bio?.trim() || null,
    phone: data.phone?.trim() || null,
    address: data.address?.trim() || null,
    country: data.country?.trim() || null
  };
}

/**
 * Check profile completeness percentage
 */
export function getProfileCompleteness(data: ProfileData): number {
  const totalFields = 4; // bio, phone, address, country
  const populatedFields = countProfileFields(data);

  return Math.round((populatedFields / totalFields) * 100);
}

/**
 * Format telegram username for display (with @ prefix)
 */
export function formatTelegramUsername(username: string | null | undefined): string {
  if (!username) return '';
  return username.startsWith('@') ? username : `@${username}`;
}

/**
 * Parse telegram username (remove @ prefix if present)
 */
export function parseTelegramUsername(username: string): string {
  if (!username) return '';
  return username.startsWith('@') ? username.substring(1) : username;
}
