import { describe, it, expect } from 'vitest';
import {
  isValidEthereumAddress,
  normalizeAddress,
  addressesEqual,
  shortenAddress,
  getTransactionAddresses,
  isAddressInTransaction,
  validateAddresses,
  deduplicateAddresses,
  type Transaction
} from './address-validator';

describe('Address Validator Utils', () => {
  describe('isValidEthereumAddress', () => {
    it('should validate correct Ethereum address', () => {
      const address = '0x742d35cc6634c0532925a3b844bc9e7595f0beb5';
      expect(isValidEthereumAddress(address)).toBe(true);
    });

    it('should accept uppercase letters', () => {
      const address = '0x742D35CC6634C0532925A3B844BC9E7595F0BEB5';
      expect(isValidEthereumAddress(address)).toBe(true);
    });

    it('should reject address without 0x prefix', () => {
      const address = '742d35cc6634c0532925a3b844bc9e7595f0beb5';
      expect(isValidEthereumAddress(address)).toBe(false);
    });

    it('should reject address with wrong length', () => {
      expect(isValidEthereumAddress('0x123')).toBe(false);
      expect(isValidEthereumAddress('0x742d35cc6634c0532925a3b844bc9e7595f0beb512')).toBe(false);
    });

    it('should reject address with invalid characters', () => {
      const address = '0x742d35cc6634c0532925a3b844bc9e7595f0bebg';
      expect(isValidEthereumAddress(address)).toBe(false);
    });

    it('should reject empty string', () => {
      expect(isValidEthereumAddress('')).toBe(false);
    });

    it('should reject null or undefined', () => {
      expect(isValidEthereumAddress(null as any)).toBe(false);
      expect(isValidEthereumAddress(undefined as any)).toBe(false);
    });
  });

  describe('normalizeAddress', () => {
    it('should convert address to lowercase', () => {
      const address = '0X742D35CC6634C0532925A3B844BC9E7595F0BEB5';
      const normalized = normalizeAddress(address);

      expect(normalized).toBe('0x742d35cc6634c0532925a3b844bc9e7595f0beb5');
    });

    it('should handle already lowercase address', () => {
      const address = '0x742d35cc6634c0532925a3b844bc9e7595f0beb5';
      expect(normalizeAddress(address)).toBe(address);
    });

    it('should handle mixed case', () => {
      const address = '0xAbCdEf1234567890aBcDeF1234567890AbCdEf12';
      expect(normalizeAddress(address)).toBe('0xabcdef1234567890abcdef1234567890abcdef12');
    });
  });

  describe('addressesEqual', () => {
    it('should return true for same address in different cases', () => {
      const addr1 = '0x742d35cc6634c0532925a3b844bc9e7595f0beb5';
      const addr2 = '0X742D35CC6634C0532925A3B844BC9E7595F0BEB5';

      expect(addressesEqual(addr1, addr2)).toBe(true);
    });

    it('should return false for different addresses', () => {
      const addr1 = '0x742d35cc6634c0532925a3b844bc9e7595f0beb5';
      const addr2 = '0x1111111111111111111111111111111111111111';

      expect(addressesEqual(addr1, addr2)).toBe(false);
    });

    it('should return true for identical addresses', () => {
      const addr = '0x742d35cc6634c0532925a3b844bc9e7595f0beb5';
      expect(addressesEqual(addr, addr)).toBe(true);
    });
  });

  describe('shortenAddress', () => {
    it('should shorten address with default parameters', () => {
      const address = '0x742d35cc6634c0532925a3b844bc9e7595f0beb5';
      const shortened = shortenAddress(address);

      expect(shortened).toBe('0x742d...beb5');
    });

    it('should use custom prefix and suffix lengths', () => {
      const address = '0x742d35cc6634c0532925a3b844bc9e7595f0beb5';
      const shortened = shortenAddress(address, 8, 6);

      expect(shortened).toBe('0x742d35...f0beb5');
    });

    it('should handle short addresses', () => {
      const address = '0x123';
      expect(shortenAddress(address)).toBe('0x123');
    });

    it('should handle empty string', () => {
      expect(shortenAddress('')).toBe('');
    });
  });

  describe('getTransactionAddresses', () => {
    it('should extract both addresses from transaction', () => {
      const transaction: Transaction = {
        fromAddress: '0x1111111111111111111111111111111111111111',
        toAddress: '0x2222222222222222222222222222222222222222'
      };

      const addresses = getTransactionAddresses(transaction);

      expect(addresses).toHaveLength(2);
      expect(addresses).toContain('0x1111111111111111111111111111111111111111');
      expect(addresses).toContain('0x2222222222222222222222222222222222222222');
    });

    it('should handle transaction with only fromAddress', () => {
      const transaction: Transaction = {
        fromAddress: '0x1111111111111111111111111111111111111111'
      };

      const addresses = getTransactionAddresses(transaction);

      expect(addresses).toHaveLength(1);
      expect(addresses[0]).toBe('0x1111111111111111111111111111111111111111');
    });

    it('should handle transaction with only toAddress', () => {
      const transaction: Transaction = {
        toAddress: '0x2222222222222222222222222222222222222222'
      };

      const addresses = getTransactionAddresses(transaction);

      expect(addresses).toHaveLength(1);
      expect(addresses[0]).toBe('0x2222222222222222222222222222222222222222');
    });

    it('should handle empty transaction', () => {
      const transaction: Transaction = {};
      const addresses = getTransactionAddresses(transaction);

      expect(addresses).toHaveLength(0);
    });

    it('should normalize addresses', () => {
      const transaction: Transaction = {
        fromAddress: '0X1111111111111111111111111111111111111111',
        toAddress: '0X2222222222222222222222222222222222222222'
      };

      const addresses = getTransactionAddresses(transaction);

      expect(addresses[0]).toBe('0x1111111111111111111111111111111111111111');
      expect(addresses[1]).toBe('0x2222222222222222222222222222222222222222');
    });
  });

  describe('isAddressInTransaction', () => {
    const transaction: Transaction = {
      fromAddress: '0x1111111111111111111111111111111111111111',
      toAddress: '0x2222222222222222222222222222222222222222'
    };

    it('should return true if address is fromAddress', () => {
      expect(isAddressInTransaction('0x1111111111111111111111111111111111111111', transaction)).toBe(true);
    });

    it('should return true if address is toAddress', () => {
      expect(isAddressInTransaction('0x2222222222222222222222222222222222222222', transaction)).toBe(true);
    });

    it('should return false if address is not in transaction', () => {
      expect(isAddressInTransaction('0x3333333333333333333333333333333333333333', transaction)).toBe(false);
    });

    it('should be case-insensitive', () => {
      expect(isAddressInTransaction('0X1111111111111111111111111111111111111111', transaction)).toBe(true);
    });
  });

  describe('validateAddresses', () => {
    it('should separate valid and invalid addresses', () => {
      const addresses = [
        '0x742d35cc6634c0532925a3b844bc9e7595f0beb5', // valid
        '0xinvalid',                                    // invalid
        '0x1111111111111111111111111111111111111111', // valid
        'notanaddress',                                // invalid
        '0x2222222222222222222222222222222222222222'  // valid
      ];

      const result = validateAddresses(addresses);

      expect(result.valid).toHaveLength(3);
      expect(result.invalid).toHaveLength(2);
      expect(result.valid).toContain('0x742d35cc6634c0532925a3b844bc9e7595f0beb5');
      expect(result.invalid).toContain('0xinvalid');
    });

    it('should handle all valid addresses', () => {
      const addresses = [
        '0x742d35cc6634c0532925a3b844bc9e7595f0beb5',
        '0x1111111111111111111111111111111111111111'
      ];

      const result = validateAddresses(addresses);

      expect(result.valid).toHaveLength(2);
      expect(result.invalid).toHaveLength(0);
    });

    it('should handle all invalid addresses', () => {
      const addresses = ['invalid1', 'invalid2', '0x123'];

      const result = validateAddresses(addresses);

      expect(result.valid).toHaveLength(0);
      expect(result.invalid).toHaveLength(3);
    });

    it('should handle empty array', () => {
      const result = validateAddresses([]);

      expect(result.valid).toHaveLength(0);
      expect(result.invalid).toHaveLength(0);
    });
  });

  describe('deduplicateAddresses', () => {
    it('should remove duplicate addresses', () => {
      const addresses = [
        '0x1111111111111111111111111111111111111111',
        '0x2222222222222222222222222222222222222222',
        '0x1111111111111111111111111111111111111111', // duplicate
        '0x3333333333333333333333333333333333333333'
      ];

      const unique = deduplicateAddresses(addresses);

      expect(unique).toHaveLength(3);
      expect(unique).toContain('0x1111111111111111111111111111111111111111');
      expect(unique).toContain('0x2222222222222222222222222222222222222222');
      expect(unique).toContain('0x3333333333333333333333333333333333333333');
    });

    it('should handle case-insensitive duplicates', () => {
      const addresses = [
        '0x1111111111111111111111111111111111111111',
        '0X1111111111111111111111111111111111111111', // same but uppercase
        '0x2222222222222222222222222222222222222222'
      ];

      const unique = deduplicateAddresses(addresses);

      expect(unique).toHaveLength(2);
    });

    it('should handle array with no duplicates', () => {
      const addresses = [
        '0x1111111111111111111111111111111111111111',
        '0x2222222222222222222222222222222222222222'
      ];

      const unique = deduplicateAddresses(addresses);

      expect(unique).toHaveLength(2);
    });

    it('should handle empty array', () => {
      const unique = deduplicateAddresses([]);
      expect(unique).toHaveLength(0);
    });
  });
});
