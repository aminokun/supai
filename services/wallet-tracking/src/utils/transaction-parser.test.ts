import { describe, it, expect, beforeEach } from 'vitest';
import {
  parseBlockNumber,
  parseAlchemyActivity,
  isZeroValueTransaction,
  isContractInteraction,
  extractTransactionHashes,
  groupActivitiesByHash,
  isValidTransactionHash,
  TransactionDeduplicator,
  formatTransactionValue,
  getTransactionType,
  type AlchemyActivity,
  type ParsedTransaction
} from './transaction-parser';

describe('Transaction Parser Utils', () => {
  describe('parseBlockNumber', () => {
    it('should parse hex block number', () => {
      expect(parseBlockNumber('0x123')).toBe(291);
      expect(parseBlockNumber('0xabc')).toBe(2748);
      expect(parseBlockNumber('0x1')).toBe(1);
    });

    it('should parse decimal block number', () => {
      expect(parseBlockNumber('12345')).toBe(12345);
      expect(parseBlockNumber('999')).toBe(999);
    });

    it('should handle uppercase hex prefix', () => {
      // parseInt handles uppercase X in 0x prefix
      expect(parseBlockNumber('0xff')).toBe(255);
      expect(parseBlockNumber('0xABC')).toBe(2748);
    });
  });

  describe('parseAlchemyActivity', () => {
    it('should parse complete activity', () => {
      const activity: AlchemyActivity = {
        hash: '0xabc123',
        fromAddress: '0X1111111111111111111111111111111111111111',
        toAddress: '0X2222222222222222222222222222222222222222',
        blockNum: '0x123',
        value: 1.5,
        asset: 'ETH',
        category: 'external'
      };

      const parsed = parseAlchemyActivity(activity);

      expect(parsed.txHash).toBe('0xabc123');
      expect(parsed.fromAddress).toBe('0x1111111111111111111111111111111111111111');
      expect(parsed.toAddress).toBe('0x2222222222222222222222222222222222222222');
      expect(parsed.blockNumber).toBe(291);
      expect(parsed.value).toBe('1.5');
      expect(parsed.asset).toBe('ETH');
      expect(parsed.category).toBe('external');
    });

    it('should handle activity with null value', () => {
      const activity: AlchemyActivity = {
        hash: '0xabc',
        fromAddress: '0x1111',
        toAddress: '0x2222',
        blockNum: '100',
        value: null
      };

      const parsed = parseAlchemyActivity(activity);
      expect(parsed.value).toBe('0');
    });

    it('should use defaults for missing fields', () => {
      const activity: AlchemyActivity = {
        hash: '0xabc',
        fromAddress: '0x1111',
        toAddress: '0x2222',
        blockNum: '100'
      };

      const parsed = parseAlchemyActivity(activity);
      expect(parsed.asset).toBe('ETH');
      expect(parsed.category).toBe('external');
    });
  });

  describe('isZeroValueTransaction', () => {
    it('should detect zero value transaction', () => {
      const tx: ParsedTransaction = {
        txHash: '0xabc',
        fromAddress: '0x1111',
        toAddress: '0x2222',
        value: '0',
        blockNumber: 100,
        asset: 'ETH',
        category: 'external'
      };

      expect(isZeroValueTransaction(tx)).toBe(true);
    });

    it('should detect non-zero value transaction', () => {
      const tx: ParsedTransaction = {
        txHash: '0xabc',
        fromAddress: '0x1111',
        toAddress: '0x2222',
        value: '1.5',
        blockNumber: 100,
        asset: 'ETH',
        category: 'external'
      };

      expect(isZeroValueTransaction(tx)).toBe(false);
    });

    it('should handle string zero', () => {
      const tx: ParsedTransaction = {
        txHash: '0xabc',
        fromAddress: '0x1111',
        toAddress: '0x2222',
        value: '0.0',
        blockNumber: 100,
        asset: 'ETH',
        category: 'external'
      };

      expect(isZeroValueTransaction(tx)).toBe(true);
    });
  });

  describe('isContractInteraction', () => {
    it('should detect contract interaction categories', () => {
      expect(isContractInteraction('token')).toBe(true);
      expect(isContractInteraction('erc20')).toBe(true);
      expect(isContractInteraction('erc721')).toBe(true);
      expect(isContractInteraction('erc1155')).toBe(true);
      expect(isContractInteraction('internal')).toBe(true);
    });

    it('should handle case insensitivity', () => {
      expect(isContractInteraction('TOKEN')).toBe(true);
      expect(isContractInteraction('ERC20')).toBe(true);
    });

    it('should detect non-contract categories', () => {
      expect(isContractInteraction('external')).toBe(false);
      expect(isContractInteraction('unknown')).toBe(false);
    });
  });

  describe('extractTransactionHashes', () => {
    it('should extract unique hashes', () => {
      const activities: AlchemyActivity[] = [
        { hash: '0xaaa', fromAddress: '0x1', toAddress: '0x2', blockNum: '1' },
        { hash: '0xbbb', fromAddress: '0x1', toAddress: '0x2', blockNum: '1' },
        { hash: '0xaaa', fromAddress: '0x1', toAddress: '0x2', blockNum: '1' }
      ];

      const hashes = extractTransactionHashes(activities);

      expect(hashes).toHaveLength(2);
      expect(hashes).toContain('0xaaa');
      expect(hashes).toContain('0xbbb');
    });

    it('should handle empty array', () => {
      expect(extractTransactionHashes([])).toHaveLength(0);
    });
  });

  describe('groupActivitiesByHash', () => {
    it('should group activities by hash', () => {
      const activities: AlchemyActivity[] = [
        { hash: '0xaaa', fromAddress: '0x1', toAddress: '0x2', blockNum: '1', category: 'external' },
        { hash: '0xbbb', fromAddress: '0x3', toAddress: '0x4', blockNum: '1', category: 'external' },
        { hash: '0xaaa', fromAddress: '0x5', toAddress: '0x6', blockNum: '1', category: 'token' }
      ];

      const grouped = groupActivitiesByHash(activities);

      expect(grouped.size).toBe(2);
      expect(grouped.get('0xaaa')).toHaveLength(2);
      expect(grouped.get('0xbbb')).toHaveLength(1);
    });

    it('should handle empty array', () => {
      const grouped = groupActivitiesByHash([]);
      expect(grouped.size).toBe(0);
    });
  });

  describe('isValidTransactionHash', () => {
    it('should validate correct transaction hash', () => {
      const hash = '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890';
      expect(isValidTransactionHash(hash)).toBe(true);
    });

    it('should accept uppercase letters', () => {
      const hash = '0xABCDEF1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF1234567890';
      expect(isValidTransactionHash(hash)).toBe(true);
    });

    it('should reject hash without 0x prefix', () => {
      const hash = 'abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890';
      expect(isValidTransactionHash(hash)).toBe(false);
    });

    it('should reject hash with wrong length', () => {
      expect(isValidTransactionHash('0x123')).toBe(false);
      expect(isValidTransactionHash('0xabcdef12345')).toBe(false);
    });

    it('should reject hash with invalid characters', () => {
      const hash = '0xabcdefg234567890abcdef1234567890abcdef1234567890abcdef1234567890';
      expect(isValidTransactionHash(hash)).toBe(false);
    });
  });

  describe('TransactionDeduplicator', () => {
    let deduplicator: TransactionDeduplicator;

    beforeEach(() => {
      deduplicator = new TransactionDeduplicator();
    });

    it('should detect non-duplicate hash', () => {
      expect(deduplicator.isDuplicate('0xabc')).toBe(false);
    });

    it('should add hash and detect duplicate', () => {
      deduplicator.add('0xabc');
      expect(deduplicator.isDuplicate('0xabc')).toBe(true);
    });

    it('should be case-insensitive', () => {
      deduplicator.add('0xABC');
      expect(deduplicator.isDuplicate('0xabc')).toBe(true);
      expect(deduplicator.isDuplicate('0XABC')).toBe(true);
    });

    it('should track size', () => {
      expect(deduplicator.size()).toBe(0);
      deduplicator.add('0xabc');
      expect(deduplicator.size()).toBe(1);
      deduplicator.add('0xdef');
      expect(deduplicator.size()).toBe(2);
    });

    it('should clear all hashes', () => {
      deduplicator.add('0xabc');
      deduplicator.add('0xdef');
      expect(deduplicator.size()).toBe(2);

      deduplicator.clear();
      expect(deduplicator.size()).toBe(0);
      expect(deduplicator.isDuplicate('0xabc')).toBe(false);
    });
  });

  describe('formatTransactionValue', () => {
    it('should format zero value', () => {
      expect(formatTransactionValue('0')).toBe('0');
      expect(formatTransactionValue('0.0')).toBe('0');
    });

    it('should format with default decimals (18)', () => {
      const value = (1.5 * Math.pow(10, 18)).toString();
      const formatted = formatTransactionValue(value);

      expect(parseFloat(formatted)).toBeCloseTo(1.5, 2);
    });

    it('should format with custom decimals', () => {
      const value = (100 * Math.pow(10, 6)).toString(); // USDC has 6 decimals
      const formatted = formatTransactionValue(value, 6);

      expect(parseFloat(formatted)).toBe(100);
    });

    it('should remove trailing zeros', () => {
      expect(formatTransactionValue('1000000000000000000', 18)).toBe('1');
      expect(formatTransactionValue('1500000000000000000', 18)).toBe('1.5');
    });
  });

  describe('getTransactionType', () => {
    const userAddress = '0x3333333333333333333333333333333333333333';

    it('should detect incoming transaction', () => {
      const type = getTransactionType(
        '0x1111111111111111111111111111111111111111',
        userAddress,
        userAddress
      );

      expect(type).toBe('incoming');
    });

    it('should detect outgoing transaction', () => {
      const type = getTransactionType(
        userAddress,
        '0x2222222222222222222222222222222222222222',
        userAddress
      );

      expect(type).toBe('outgoing');
    });

    it('should detect self transaction', () => {
      const type = getTransactionType(userAddress, userAddress, userAddress);
      expect(type).toBe('self');
    });

    it('should be case-insensitive', () => {
      const type = getTransactionType(
        '0x1111111111111111111111111111111111111111',
        '0X3333333333333333333333333333333333333333',
        userAddress
      );

      expect(type).toBe('incoming');
    });
  });
});
