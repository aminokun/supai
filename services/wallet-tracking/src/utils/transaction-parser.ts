/**
 * Utility functions for parsing and processing blockchain transactions
 */

export interface AlchemyActivity {
  hash: string;
  fromAddress: string;
  toAddress: string;
  blockNum: string;
  value?: number | null;
  asset?: string;
  category?: string;
  rawContract?: {
    address: string;
    decimal: string | null;
  };
}

export interface ParsedTransaction {
  txHash: string;
  fromAddress: string;
  toAddress: string;
  value: string;
  blockNumber: number;
  asset: string;
  category: string;
}

/**
 * Convert hex block number to decimal
 */
export function parseBlockNumber(blockNum: string): number {
  if (blockNum.startsWith('0x')) {
    return parseInt(blockNum, 16);
  }
  return parseInt(blockNum, 10);
}

/**
 * Parse Alchemy activity into transaction format
 */
export function parseAlchemyActivity(activity: AlchemyActivity): ParsedTransaction {
  return {
    txHash: activity.hash,
    fromAddress: activity.fromAddress.toLowerCase(),
    toAddress: activity.toAddress.toLowerCase(),
    value: activity.value?.toString() || '0',
    blockNumber: parseBlockNumber(activity.blockNum),
    asset: activity.asset || 'ETH',
    category: activity.category || 'external'
  };
}

/**
 * Check if transaction value is zero
 */
export function isZeroValueTransaction(transaction: ParsedTransaction): boolean {
  return parseFloat(transaction.value) === 0;
}

/**
 * Check if transaction is a contract interaction
 */
export function isContractInteraction(category: string): boolean {
  return ['token', 'erc20', 'erc721', 'erc1155', 'internal'].includes(category.toLowerCase());
}

/**
 * Extract unique transaction hashes from activities
 */
export function extractTransactionHashes(activities: AlchemyActivity[]): string[] {
  return Array.from(new Set(activities.map(a => a.hash)));
}

/**
 * Group activities by transaction hash
 */
export function groupActivitiesByHash(activities: AlchemyActivity[]): Map<string, AlchemyActivity[]> {
  const grouped = new Map<string, AlchemyActivity[]>();

  for (const activity of activities) {
    const existing = grouped.get(activity.hash) || [];
    existing.push(activity);
    grouped.set(activity.hash, existing);
  }

  return grouped;
}

/**
 * Check if transaction hash is valid format
 */
export function isValidTransactionHash(hash: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(hash);
}

/**
 * Detect duplicate transactions using Set
 */
export class TransactionDeduplicator {
  private seenHashes: Set<string>;

  constructor() {
    this.seenHashes = new Set();
  }

  isDuplicate(hash: string): boolean {
    return this.seenHashes.has(hash.toLowerCase());
  }

  add(hash: string): void {
    this.seenHashes.add(hash.toLowerCase());
  }

  clear(): void {
    this.seenHashes.clear();
  }

  size(): number {
    return this.seenHashes.size;
  }
}

/**
 * Format transaction value for display
 */
export function formatTransactionValue(value: string, decimals: number = 18): string {
  const numValue = parseFloat(value);
  if (numValue === 0) return '0';

  const divisor = Math.pow(10, decimals);
  const formatted = numValue / divisor;

  return formatted.toFixed(6).replace(/\.?0+$/, '');
}

/**
 * Determine transaction type based on addresses
 */
export function getTransactionType(
  fromAddress: string,
  toAddress: string,
  userAddress: string
): 'incoming' | 'outgoing' | 'self' {
  const normalizedUser = userAddress.toLowerCase();
  const normalizedFrom = fromAddress.toLowerCase();
  const normalizedTo = toAddress.toLowerCase();

  if (normalizedFrom === normalizedTo) {
    return 'self';
  }

  if (normalizedTo === normalizedUser) {
    return 'incoming';
  }

  if (normalizedFrom === normalizedUser) {
    return 'outgoing';
  }

  // Default to incoming if user matches toAddress
  return normalizedTo === normalizedUser ? 'incoming' : 'outgoing';
}
