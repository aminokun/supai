import { PrismaClient } from '../../generated/prisma/index.js';
import { alchemyService } from './alchemy.js';

const prisma = new PrismaClient();

export interface TrackedWalletData {
  userId: string;
  address: string;
  name: string;
  groupName?: string;
}

export class WalletManager {
  /**
   * Add a wallet to tracking
   */
  async addWallet(data: TrackedWalletData): Promise<any> {
    const { userId, address, name, groupName } = data;
    const normalizedAddress = address.toLowerCase();

    try {
      // Check if already tracked by this user
      const existing = await prisma.trackedWallet.findUnique({
        where: {
          userId_address: {
            userId,
            address: normalizedAddress
          }
        }
      });

      if (existing) {
        throw new Error('Wallet already tracked by this user');
      }

      // Add to database
      const wallet = await prisma.trackedWallet.create({
        data: {
          userId,
          address: normalizedAddress,
          name,
          groupName,
          isActive: true
        }
      });

      // Add to Alchemy webhook
      await alchemyService.addAddresses([normalizedAddress]);

      console.log(`[WalletManager] Added wallet ${name} (${normalizedAddress}) for user ${userId}`);
      return wallet;
    } catch (error) {
      console.error('[WalletManager] Error adding wallet:', error);
      throw error;
    }
  }

  /**
   * Remove a wallet from tracking
   */
  async removeWallet(userId: string, address: string): Promise<void> {
    const normalizedAddress = address.toLowerCase();

    try {
      // Remove from database
      await prisma.trackedWallet.delete({
        where: {
          userId_address: {
            userId,
            address: normalizedAddress
          }
        }
      });

      // Check if any other users are tracking this address
      const otherUsers = await prisma.trackedWallet.findFirst({
        where: { address: normalizedAddress }
      });

      // If no other users tracking, remove from Alchemy
      if (!otherUsers) {
        await alchemyService.removeAddresses([normalizedAddress]);
      }

      console.log(`[WalletManager] Removed wallet ${normalizedAddress} for user ${userId}`);
    } catch (error) {
      console.error('[WalletManager] Error removing wallet:', error);
      throw error;
    }
  }

  /**
   * Get all wallets for a user
   */
  async getUserWallets(userId: string): Promise<any[]> {
    return prisma.trackedWallet.findMany({
      where: {
        userId,
        isActive: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  /**
   * Get all wallets by group
   */
  async getWalletsByGroup(userId: string, groupName: string): Promise<any[]> {
    return prisma.trackedWallet.findMany({
      where: {
        userId,
        groupName,
        isActive: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  /**
   * Get all users tracking a specific address
   */
  async getUsersTrackingAddress(address: string): Promise<string[]> {
    const normalizedAddress = address.toLowerCase();

    const wallets = await prisma.trackedWallet.findMany({
      where: {
        address: normalizedAddress,
        isActive: true
      },
      select: { userId: true }
    });

    return wallets.map(w => w.userId);
  }

  /**
   * Update wallet details
   */
  async updateWallet(userId: string, address: string, updates: { name?: string; groupName?: string }): Promise<any> {
    const normalizedAddress = address.toLowerCase();

    return prisma.trackedWallet.update({
      where: {
        userId_address: {
          userId,
          address: normalizedAddress
        }
      },
      data: updates
    });
  }

  /**
   * Toggle wallet active status
   */
  async toggleWalletStatus(userId: string, address: string): Promise<any> {
    const normalizedAddress = address.toLowerCase();

    const wallet = await prisma.trackedWallet.findUnique({
      where: {
        userId_address: {
          userId,
          address: normalizedAddress
        }
      }
    });

    if (!wallet) {
      throw new Error('Wallet not found');
    }

    return prisma.trackedWallet.update({
      where: {
        userId_address: {
          userId,
          address: normalizedAddress
        }
      },
      data: { isActive: !wallet.isActive }
    });
  }

  /**
   * Get wallet groups for a user
   */
  async getUserGroups(userId: string): Promise<string[]> {
    const groups = await prisma.trackedWallet.findMany({
      where: {
        userId,
        groupName: { not: null }
      },
      select: { groupName: true },
      distinct: ['groupName']
    });

    return groups.map(g => g.groupName!).filter(Boolean);
  }

  /**
   * Get statistics for a user
   */
  async getUserStats(userId: string): Promise<any> {
    const wallets = await prisma.trackedWallet.findMany({
      where: { userId }
    });

    const groups = await this.getUserGroups(userId);

    return {
      totalWallets: wallets.length,
      activeWallets: wallets.filter(w => w.isActive).length,
      groups: groups.length,
      addresses: wallets.map(w => w.address)
    };
  }

  /**
   * Bulk add wallets
   */
  async bulkAddWallets(userId: string, wallets: Array<{ address: string; name: string; groupName?: string }>): Promise<any[]> {
    const results = [];
    const errors = [];

    for (const wallet of wallets) {
      try {
        const result = await this.addWallet({
          userId,
          address: wallet.address,
          name: wallet.name,
          groupName: wallet.groupName
        });
        results.push(result);
      } catch (error: any) {
        errors.push({ address: wallet.address, error: error.message });
      }
    }

    return { added: results, errors };
  }
}

export const walletManager = new WalletManager();