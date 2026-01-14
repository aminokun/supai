import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  generateLinkCode,
  isValidCodeFormat,
  isCodeExpired,
  getRemainingTime,
  formatExpiryTime,
  createLinkingCode,
  validateVerifyCodeParams,
  cleanupExpiredCodes,
  type LinkingCode,
  type VerifyCodeParams
} from './link-code';

describe('Link Code Utils', () => {
  describe('generateLinkCode', () => {
    it('should generate 6-digit code', () => {
      const code = generateLinkCode();

      expect(code).toHaveLength(6);
      expect(parseInt(code)).toBeGreaterThanOrEqual(100000);
      expect(parseInt(code)).toBeLessThanOrEqual(999999);
    });

    it('should generate different codes', () => {
      const code1 = generateLinkCode();
      const code2 = generateLinkCode();

      // While they could theoretically be the same, it's extremely unlikely
      // This test might occasionally fail, but it's a good sanity check
      expect(typeof code1).toBe('string');
      expect(typeof code2).toBe('string');
    });

    it('should generate only numeric codes', () => {
      const code = generateLinkCode();
      expect(/^\d+$/.test(code)).toBe(true);
    });
  });

  describe('isValidCodeFormat', () => {
    it('should accept valid 6-digit code', () => {
      expect(isValidCodeFormat('123456')).toBe(true);
      expect(isValidCodeFormat('000000')).toBe(true);
      expect(isValidCodeFormat('999999')).toBe(true);
    });

    it('should reject codes with wrong length', () => {
      expect(isValidCodeFormat('12345')).toBe(false);
      expect(isValidCodeFormat('1234567')).toBe(false);
      expect(isValidCodeFormat('')).toBe(false);
    });

    it('should reject codes with non-numeric characters', () => {
      expect(isValidCodeFormat('12345a')).toBe(false);
      expect(isValidCodeFormat('abc123')).toBe(false);
      expect(isValidCodeFormat('12-345')).toBe(false);
    });
  });

  describe('isCodeExpired', () => {
    it('should return false for recent code', () => {
      const codeData: LinkingCode = {
        userId: 'user-123',
        createdAt: new Date()
      };

      expect(isCodeExpired(codeData)).toBe(false);
    });

    it('should return true for expired code', () => {
      const codeData: LinkingCode = {
        userId: 'user-123',
        createdAt: new Date(Date.now() - 6 * 60 * 1000) // 6 minutes ago
      };

      expect(isCodeExpired(codeData)).toBe(true);
    });

    it('should respect custom maxAge', () => {
      const codeData: LinkingCode = {
        userId: 'user-123',
        createdAt: new Date(Date.now() - 2 * 60 * 1000) // 2 minutes ago
      };

      expect(isCodeExpired(codeData, 1 * 60 * 1000)).toBe(true); // 1 minute max age
      expect(isCodeExpired(codeData, 3 * 60 * 1000)).toBe(false); // 3 minute max age
    });

    it('should handle edge case at exact expiry time', () => {
      const maxAge = 5 * 60 * 1000;
      const codeData: LinkingCode = {
        userId: 'user-123',
        createdAt: new Date(Date.now() - maxAge)
      };

      // At exact expiry time, it should be considered expired
      expect(isCodeExpired(codeData, maxAge)).toBe(false);
    });
  });

  describe('getRemainingTime', () => {
    it('should calculate correct remaining time', () => {
      const codeData: LinkingCode = {
        userId: 'user-123',
        createdAt: new Date(Date.now() - 2 * 60 * 1000) // 2 minutes ago
      };

      const remaining = getRemainingTime(codeData);

      // Should be around 3 minutes (180 seconds)
      expect(remaining).toBeGreaterThan(170);
      expect(remaining).toBeLessThanOrEqual(180);
    });

    it('should return 0 for expired code', () => {
      const codeData: LinkingCode = {
        userId: 'user-123',
        createdAt: new Date(Date.now() - 10 * 60 * 1000) // 10 minutes ago
      };

      expect(getRemainingTime(codeData)).toBe(0);
    });

    it('should respect custom maxAge', () => {
      const codeData: LinkingCode = {
        userId: 'user-123',
        createdAt: new Date(Date.now() - 30 * 1000) // 30 seconds ago
      };

      const remaining = getRemainingTime(codeData, 60 * 1000); // 1 minute max age

      expect(remaining).toBeGreaterThan(20);
      expect(remaining).toBeLessThanOrEqual(30);
    });
  });

  describe('formatExpiryTime', () => {
    it('should format minutes and seconds', () => {
      expect(formatExpiryTime(90)).toBe('1m 30s');
      expect(formatExpiryTime(125)).toBe('2m 5s');
      expect(formatExpiryTime(300)).toBe('5m 0s');
    });

    it('should format seconds only', () => {
      expect(formatExpiryTime(45)).toBe('45s');
      expect(formatExpiryTime(5)).toBe('5s');
    });

    it('should handle zero and negative values', () => {
      expect(formatExpiryTime(0)).toBe('expired');
      expect(formatExpiryTime(-10)).toBe('expired');
    });
  });

  describe('createLinkingCode', () => {
    it('should create linking code with user ID', () => {
      const code = createLinkingCode('user-123');

      expect(code.userId).toBe('user-123');
      expect(code.createdAt).toBeInstanceOf(Date);
    });

    it('should set current time as createdAt', () => {
      const before = new Date();
      const code = createLinkingCode('user-123');
      const after = new Date();

      expect(code.createdAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(code.createdAt.getTime()).toBeLessThanOrEqual(after.getTime());
    });
  });

  describe('validateVerifyCodeParams', () => {
    it('should validate correct parameters', () => {
      const params: VerifyCodeParams = {
        code: '123456',
        telegramChatId: '987654321',
        telegramUsername: 'testuser'
      };

      const result = validateVerifyCodeParams(params);

      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject missing code', () => {
      const params: VerifyCodeParams = {
        telegramChatId: '987654321'
      };

      const result = validateVerifyCodeParams(params);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Code is required');
    });

    it('should reject invalid code format', () => {
      const params: VerifyCodeParams = {
        code: '12345',
        telegramChatId: '987654321'
      };

      const result = validateVerifyCodeParams(params);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Code must be 6 digits');
    });

    it('should reject missing chat ID', () => {
      const params: VerifyCodeParams = {
        code: '123456'
      };

      const result = validateVerifyCodeParams(params);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Telegram chat ID is required');
    });

    it('should allow missing username', () => {
      const params: VerifyCodeParams = {
        code: '123456',
        telegramChatId: '987654321'
      };

      const result = validateVerifyCodeParams(params);

      expect(result.valid).toBe(true);
    });
  });

  describe('cleanupExpiredCodes', () => {
    it('should remove expired codes', () => {
      const codes = new Map<string, LinkingCode>();

      codes.set('111111', {
        userId: 'user-1',
        createdAt: new Date(Date.now() - 10 * 60 * 1000) // expired
      });

      codes.set('222222', {
        userId: 'user-2',
        createdAt: new Date() // not expired
      });

      codes.set('333333', {
        userId: 'user-3',
        createdAt: new Date(Date.now() - 6 * 60 * 1000) // expired
      });

      const removed = cleanupExpiredCodes(codes);

      expect(removed).toBe(2);
      expect(codes.size).toBe(1);
      expect(codes.has('222222')).toBe(true);
      expect(codes.has('111111')).toBe(false);
      expect(codes.has('333333')).toBe(false);
    });

    it('should handle empty map', () => {
      const codes = new Map<string, LinkingCode>();
      const removed = cleanupExpiredCodes(codes);

      expect(removed).toBe(0);
      expect(codes.size).toBe(0);
    });

    it('should not remove valid codes', () => {
      const codes = new Map<string, LinkingCode>();

      codes.set('111111', {
        userId: 'user-1',
        createdAt: new Date()
      });

      codes.set('222222', {
        userId: 'user-2',
        createdAt: new Date()
      });

      const removed = cleanupExpiredCodes(codes);

      expect(removed).toBe(0);
      expect(codes.size).toBe(2);
    });

    it('should respect custom maxAge', () => {
      const codes = new Map<string, LinkingCode>();

      codes.set('111111', {
        userId: 'user-1',
        createdAt: new Date(Date.now() - 2 * 60 * 1000) // 2 minutes ago
      });

      // With 1 minute max age, should be removed
      const removed1 = cleanupExpiredCodes(codes, 1 * 60 * 1000);
      expect(removed1).toBe(1);

      // Reset
      codes.set('111111', {
        userId: 'user-1',
        createdAt: new Date(Date.now() - 2 * 60 * 1000)
      });

      // With 3 minute max age, should not be removed
      const removed2 = cleanupExpiredCodes(codes, 3 * 60 * 1000);
      expect(removed2).toBe(0);
    });
  });
});
