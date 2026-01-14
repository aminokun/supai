import { describe, it, expect } from 'vitest';
import {
  isValidPhoneNumber,
  isValidTelegramChatId,
  isValidTelegramUsername,
  sanitizeBio,
  validateProfileData,
  validateTelegramData,
  hasProfileData,
  isTelegramLinked,
  countProfileFields,
  normalizeProfileData,
  getProfileCompleteness,
  formatTelegramUsername,
  parseTelegramUsername,
  type ProfileData,
  type TelegramData
} from './profile-validator';

describe('Profile Validator Utils', () => {
  describe('isValidPhoneNumber', () => {
    it('should validate correct E.164 phone numbers', () => {
      expect(isValidPhoneNumber('+1234567890')).toBe(true);
      expect(isValidPhoneNumber('+12345678901234')).toBe(true);
      expect(isValidPhoneNumber('+447700900000')).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(isValidPhoneNumber('1234567890')).toBe(false); // no +
      expect(isValidPhoneNumber('+123')).toBe(false); // too short
      expect(isValidPhoneNumber('+12345678901234567')).toBe(false); // too long
      expect(isValidPhoneNumber('+123abc7890')).toBe(false); // contains letters
      expect(isValidPhoneNumber('')).toBe(false);
    });

    it('should handle null/undefined', () => {
      expect(isValidPhoneNumber(null as any)).toBe(false);
      expect(isValidPhoneNumber(undefined as any)).toBe(false);
    });
  });

  describe('isValidTelegramChatId', () => {
    it('should validate numeric chat IDs', () => {
      expect(isValidTelegramChatId('123456789')).toBe(true);
      expect(isValidTelegramChatId('1')).toBe(true);
      expect(isValidTelegramChatId('987654321123456')).toBe(true);
    });

    it('should reject invalid chat IDs', () => {
      expect(isValidTelegramChatId('abc123')).toBe(false);
      expect(isValidTelegramChatId('12-34')).toBe(false);
      expect(isValidTelegramChatId('')).toBe(false);
      expect(isValidTelegramChatId('+123')).toBe(false);
    });
  });

  describe('isValidTelegramUsername', () => {
    it('should validate correct usernames', () => {
      expect(isValidTelegramUsername('testuser')).toBe(true);
      expect(isValidTelegramUsername('test_user')).toBe(true);
      expect(isValidTelegramUsername('user123')).toBe(true);
      expect(isValidTelegramUsername('a1b2c')).toBe(true); // minimum 5 chars
    });

    it('should reject invalid usernames', () => {
      expect(isValidTelegramUsername('test')).toBe(false); // too short
      expect(isValidTelegramUsername('a'.repeat(33))).toBe(false); // too long
      expect(isValidTelegramUsername('test-user')).toBe(false); // hyphen not allowed
      expect(isValidTelegramUsername('test user')).toBe(false); // space not allowed
      expect(isValidTelegramUsername('@testuser')).toBe(false); // @ not allowed
      expect(isValidTelegramUsername('')).toBe(false);
    });
  });

  describe('sanitizeBio', () => {
    it('should allow normal text', () => {
      const bio = 'This is a normal bio.';
      expect(sanitizeBio(bio)).toBe(bio);
    });

    it('should preserve newlines and tabs', () => {
      const bio = 'Line 1\nLine 2\tTabbed';
      expect(sanitizeBio(bio)).toBe(bio);
    });

    it('should remove control characters', () => {
      const bio = 'Normal text\x00with\x1Fcontrol\x7Fchars';
      const sanitized = sanitizeBio(bio);

      expect(sanitized).not.toContain('\x00');
      expect(sanitized).not.toContain('\x1F');
      expect(sanitized).not.toContain('\x7F');
    });

    it('should trim whitespace', () => {
      expect(sanitizeBio('  text  ')).toBe('text');
      expect(sanitizeBio('\n\ntext\n\n')).toBe('text');
    });

    it('should limit length to default 500 chars', () => {
      const longBio = 'a'.repeat(600);
      const sanitized = sanitizeBio(longBio);

      expect(sanitized.length).toBe(500);
    });

    it('should respect custom max length', () => {
      const bio = 'a'.repeat(150);
      const sanitized = sanitizeBio(bio, 100);

      expect(sanitized.length).toBe(100);
    });

    it('should handle empty string', () => {
      expect(sanitizeBio('')).toBe('');
      expect(sanitizeBio(null as any)).toBe('');
    });
  });

  describe('validateProfileData', () => {
    it('should validate correct profile data', () => {
      const data: ProfileData = {
        bio: 'My bio',
        phone: '+1234567890',
        address: '123 Main St',
        country: 'USA'
      };

      const result = validateProfileData(data);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect invalid phone number', () => {
      const data: ProfileData = {
        phone: '1234567890' // no +
      };

      const result = validateProfileData(data);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Invalid phone number format (use E.164: +1234567890)');
    });

    it('should detect bio too long', () => {
      const data: ProfileData = {
        bio: 'a'.repeat(501)
      };

      const result = validateProfileData(data);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Bio must be 500 characters or less');
    });

    it('should collect multiple errors', () => {
      const data: ProfileData = {
        bio: 'a'.repeat(501),
        phone: 'invalid'
      };

      const result = validateProfileData(data);

      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(2);
    });

    it('should allow empty data', () => {
      const result = validateProfileData({});
      expect(result.valid).toBe(true);
    });
  });

  describe('validateTelegramData', () => {
    it('should validate correct telegram data', () => {
      const data: TelegramData = {
        telegramChatId: '123456789',
        telegramUsername: 'testuser'
      };

      const result = validateTelegramData(data);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect invalid chat ID', () => {
      const data: TelegramData = {
        telegramChatId: 'abc123'
      };

      const result = validateTelegramData(data);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Invalid Telegram chat ID format');
    });

    it('should detect invalid username', () => {
      const data: TelegramData = {
        telegramUsername: 'test'
      };

      const result = validateTelegramData(data);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Invalid Telegram username format');
    });
  });

  describe('hasProfileData', () => {
    it('should return true if any field is set', () => {
      expect(hasProfileData({ bio: 'text' })).toBe(true);
      expect(hasProfileData({ phone: '+123' })).toBe(true);
      expect(hasProfileData({ address: '123 St' })).toBe(true);
      expect(hasProfileData({ country: 'USA' })).toBe(true);
    });

    it('should return false if no fields are set', () => {
      expect(hasProfileData({})).toBe(false);
      expect(hasProfileData({ bio: null, phone: null })).toBe(false);
    });
  });

  describe('isTelegramLinked', () => {
    it('should return true for valid chat ID', () => {
      expect(isTelegramLinked({ telegramChatId: '123456' })).toBe(true);
    });

    it('should return false for null chat ID', () => {
      expect(isTelegramLinked({ telegramChatId: null })).toBe(false);
    });

    it('should return false for empty chat ID', () => {
      expect(isTelegramLinked({ telegramChatId: '   ' })).toBe(false);
    });

    it('should return false for missing chat ID', () => {
      expect(isTelegramLinked({})).toBe(false);
    });
  });

  describe('countProfileFields', () => {
    it('should count all fields', () => {
      const data: ProfileData = {
        bio: 'bio',
        phone: '+123',
        address: 'address',
        country: 'country'
      };

      expect(countProfileFields(data)).toBe(4);
    });

    it('should count partial fields', () => {
      expect(countProfileFields({ bio: 'bio', phone: '+123' })).toBe(2);
      expect(countProfileFields({ country: 'USA' })).toBe(1);
    });

    it('should return 0 for empty data', () => {
      expect(countProfileFields({})).toBe(0);
    });

    it('should not count null fields', () => {
      expect(countProfileFields({ bio: null, phone: null })).toBe(0);
    });
  });

  describe('normalizeProfileData', () => {
    it('should trim all string fields', () => {
      const data: ProfileData = {
        bio: '  bio  ',
        phone: '  +123  ',
        address: '  addr  ',
        country: '  USA  '
      };

      const normalized = normalizeProfileData(data);

      expect(normalized.bio).toBe('bio');
      expect(normalized.phone).toBe('+123');
      expect(normalized.address).toBe('addr');
      expect(normalized.country).toBe('USA');
    });

    it('should convert empty strings to null', () => {
      const data: ProfileData = {
        bio: '',
        phone: '  ',
        address: '',
        country: null
      };

      const normalized = normalizeProfileData(data);

      expect(normalized.bio).toBeNull();
      expect(normalized.phone).toBeNull();
      expect(normalized.address).toBeNull();
      expect(normalized.country).toBeNull();
    });

    it('should handle undefined fields', () => {
      const data: ProfileData = {};
      const normalized = normalizeProfileData(data);

      expect(normalized.bio).toBeNull();
      expect(normalized.phone).toBeNull();
      expect(normalized.address).toBeNull();
      expect(normalized.country).toBeNull();
    });
  });

  describe('getProfileCompleteness', () => {
    it('should return 100 for complete profile', () => {
      const data: ProfileData = {
        bio: 'bio',
        phone: '+123',
        address: 'addr',
        country: 'USA'
      };

      expect(getProfileCompleteness(data)).toBe(100);
    });

    it('should return 50 for half complete profile', () => {
      const data: ProfileData = {
        bio: 'bio',
        phone: '+123'
      };

      expect(getProfileCompleteness(data)).toBe(50);
    });

    it('should return 25 for quarter complete profile', () => {
      const data: ProfileData = {
        bio: 'bio'
      };

      expect(getProfileCompleteness(data)).toBe(25);
    });

    it('should return 0 for empty profile', () => {
      expect(getProfileCompleteness({})).toBe(0);
    });
  });

  describe('formatTelegramUsername', () => {
    it('should add @ prefix if missing', () => {
      expect(formatTelegramUsername('testuser')).toBe('@testuser');
    });

    it('should not add @ if already present', () => {
      expect(formatTelegramUsername('@testuser')).toBe('@testuser');
    });

    it('should handle null/undefined', () => {
      expect(formatTelegramUsername(null)).toBe('');
      expect(formatTelegramUsername(undefined)).toBe('');
    });

    it('should handle empty string', () => {
      expect(formatTelegramUsername('')).toBe('');
    });
  });

  describe('parseTelegramUsername', () => {
    it('should remove @ prefix', () => {
      expect(parseTelegramUsername('@testuser')).toBe('testuser');
    });

    it('should handle username without @', () => {
      expect(parseTelegramUsername('testuser')).toBe('testuser');
    });

    it('should handle empty string', () => {
      expect(parseTelegramUsername('')).toBe('');
    });
  });
});
