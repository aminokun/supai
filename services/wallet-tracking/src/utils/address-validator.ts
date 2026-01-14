/**
 * Utility functions for Ethereum address validation and normalization
 */

/**
 * Validate Ethereum address format (0x + 40 hex characters)
 */
export function isValidEthereumAddress(address: string): boolean {
  if (!address) return false;
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Normalize address to lowercase for consistent comparison
 */
export function normalizeAddress(address: string): string {
  return address.toLowerCase();
}

/**
 * Check if two addresses are equal (case-insensitive)
 */
export function addressesEqual(address1: string, address2: string): boolean {
  return normalizeAddress(address1) === normalizeAddress(address2);
}

/**
 * Shorten address for display (0x1234...5678)
 */
export function shortenAddress(address: string, prefixLength: number = 6, suffixLength: number = 4): string {
  if (!address || address.length < prefixLength + suffixLength) {
    return address;
  }
  return `${address.slice(0, prefixLength)}...${address.slice(-suffixLength)}`;
}

/**
 * Extract addresses from a transaction
 */
export interface Transaction {
  fromAddress?: string;
  toAddress?: string;
}

export function getTransactionAddresses(transaction: Transaction): string[] {
  const addresses: string[] = [];

  if (transaction.fromAddress) {
    addresses.push(normalizeAddress(transaction.fromAddress));
  }

  if (transaction.toAddress) {
    addresses.push(normalizeAddress(transaction.toAddress));
  }

  return addresses;
}

/**
 * Check if address is involved in transaction
 */
export function isAddressInTransaction(address: string, transaction: Transaction): boolean {
  const normalizedAddress = normalizeAddress(address);
  const txAddresses = getTransactionAddresses(transaction);
  return txAddresses.includes(normalizedAddress);
}

/**
 * Batch validate multiple addresses
 */
export function validateAddresses(addresses: string[]): { valid: string[], invalid: string[] } {
  const valid: string[] = [];
  const invalid: string[] = [];

  for (const address of addresses) {
    if (isValidEthereumAddress(address)) {
      valid.push(address);
    } else {
      invalid.push(address);
    }
  }

  return { valid, invalid };
}

/**
 * Remove duplicate addresses from array
 */
export function deduplicateAddresses(addresses: string[]): string[] {
  const normalized = addresses.map(normalizeAddress);
  return Array.from(new Set(normalized));
}
