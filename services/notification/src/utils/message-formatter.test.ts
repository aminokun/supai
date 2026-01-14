import { describe, it, expect } from 'vitest';
import {
  shortenAddress,
  getTransactionDirection,
  getDirectionEmoji,
  formatTransactionMessage,
  hasValidTelegramChatId,
  formatErrorMessage,
  formatSuccessMessage,
  isValidEthereumAddress,
  normalizeAddress,
  type TransactionData,
  type UserData
} from './message-formatter';

describe('Message Formatter Utils', () => {
  describe('shortenAddress', () => {
    it('should shorten a valid Ethereum address', () => {
      const address = '0x742d35cc6634c0532925a3b844bc9e7595f0beb5';
      const shortened = shortenAddress(address);

      expect(shortened).toBe('0x742d...beb5');
    });

    it('should handle short addresses', () => {
      const address = '0x123';
      const shortened = shortenAddress(address);

      expect(shortened).toBe('0x123');
    });

    it('should handle empty string', () => {
      const shortened = shortenAddress('');
      expect(shortened).toBe('');
    });
  });

  describe('getTransactionDirection', () => {
    const transaction: TransactionData = {
      txHash: '0xabc123',
      fromAddress: '0x1111111111111111111111111111111111111111',
      toAddress: '0x2222222222222222222222222222222222222222',
      value: '1.5',
      asset: 'ETH'
    };

    it('should detect incoming transaction', () => {
      const direction = getTransactionDirection(
        transaction,
        '0x2222222222222222222222222222222222222222'
      );

      expect(direction).toBe('incoming');
    });

    it('should detect outgoing transaction', () => {
      const direction = getTransactionDirection(
        transaction,
        '0x1111111111111111111111111111111111111111'
      );

      expect(direction).toBe('outgoing');
    });

    it('should handle unknown direction', () => {
      const direction = getTransactionDirection(
        transaction,
        '0x3333333333333333333333333333333333333333'
      );

      expect(direction).toBe('unknown');
    });

    it('should handle case-insensitive addresses', () => {
      const direction = getTransactionDirection(
        transaction,
        '0X2222222222222222222222222222222222222222'
      );

      expect(direction).toBe('incoming');
    });
  });

  describe('getDirectionEmoji', () => {
    it('should return incoming emoji', () => {
      expect(getDirectionEmoji('incoming')).toBe('📥');
    });

    it('should return outgoing emoji', () => {
      expect(getDirectionEmoji('outgoing')).toBe('📤');
    });

    it('should return unknown emoji', () => {
      expect(getDirectionEmoji('unknown')).toBe('🔄');
    });
  });

  describe('formatTransactionMessage', () => {
    const transaction: TransactionData = {
      txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      fromAddress: '0x1111111111111111111111111111111111111111',
      toAddress: '0x2222222222222222222222222222222222222222',
      value: '1.5',
      asset: 'ETH',
      blockNumber: 12345
    };

    it('should format incoming transaction message', () => {
      const message = formatTransactionMessage(transaction, 'incoming');

      expect(message).toContain('📥');
      expect(message).toContain('Incoming Transaction');
      expect(message).toContain('1.5 ETH');
      expect(message).toContain('0x1111...1111');
      expect(message).toContain('0x2222...2222');
      expect(message).toContain('Block');
      expect(message).toContain('12345');
    });

    it('should format outgoing transaction message', () => {
      const message = formatTransactionMessage(transaction, 'outgoing');

      expect(message).toContain('📤');
      expect(message).toContain('Outgoing Transaction');
    });

    it('should handle transaction without block number', () => {
      const txWithoutBlock = { ...transaction, blockNumber: undefined };
      const message = formatTransactionMessage(txWithoutBlock, 'incoming');

      expect(message).not.toContain('Block');
    });
  });

  describe('hasValidTelegramChatId', () => {
    it('should return true for valid chat id', () => {
      const user: UserData = {
        userId: 'user-123',
        telegramChatId: '123456789',
        telegramUsername: 'testuser'
      };

      expect(hasValidTelegramChatId(user)).toBe(true);
    });

    it('should return false for null chat id', () => {
      const user: UserData = {
        userId: 'user-123',
        telegramChatId: null
      };

      expect(hasValidTelegramChatId(user)).toBe(false);
    });

    it('should return false for empty chat id', () => {
      const user: UserData = {
        userId: 'user-123',
        telegramChatId: '   '
      };

      expect(hasValidTelegramChatId(user)).toBe(false);
    });

    it('should return false for missing chat id', () => {
      const user: UserData = {
        userId: 'user-123'
      };

      expect(hasValidTelegramChatId(user)).toBe(false);
    });
  });

  describe('formatErrorMessage', () => {
    it('should format error message with emoji', () => {
      const message = formatErrorMessage('Something went wrong');

      expect(message).toContain('❌');
      expect(message).toContain('Error');
      expect(message).toContain('Something went wrong');
    });
  });

  describe('formatSuccessMessage', () => {
    it('should format success message with emoji', () => {
      const message = formatSuccessMessage('Operation completed');

      expect(message).toContain('✅');
      expect(message).toContain('Success');
      expect(message).toContain('Operation completed');
    });
  });

  describe('isValidEthereumAddress', () => {
    it('should validate correct address', () => {
      const address = '0x742d35cc6634c0532925a3b844bc9e7595f0beb5';
      expect(isValidEthereumAddress(address)).toBe(true);
    });

    it('should accept uppercase letters', () => {
      const address = '0x742D35CC6634C0532925A3B844BC9E7595F0BEB5';
      expect(isValidEthereumAddress(address)).toBe(true);
    });

    it('should reject invalid format', () => {
      expect(isValidEthereumAddress('0xinvalid')).toBe(false);
      expect(isValidEthereumAddress('742d35cc6634c0532925a3b844bc9e7595f0beb5')).toBe(false);
      expect(isValidEthereumAddress('0x123')).toBe(false);
    });

    it('should reject address with invalid characters', () => {
      expect(isValidEthereumAddress('0x742d35cc6634c0532925a3b844bc9e7595f0bebg')).toBe(false);
    });
  });

  describe('normalizeAddress', () => {
    it('should convert address to lowercase', () => {
      const address = '0X742D35CC6634C0532925A3B844BC9E7595F0BEB5';
      expect(normalizeAddress(address)).toBe('0x742d35cc6634c0532925a3b844bc9e7595f0beb5');
    });

    it('should handle already lowercase address', () => {
      const address = '0x742d35cc6634c0532925a3b844bc9e7595f0beb5';
      expect(normalizeAddress(address)).toBe(address);
    });
  });
});
