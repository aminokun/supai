import { Router } from 'express';
import type { Request, Response } from 'express';
import { walletManager } from '../services/wallet-manager.js';
import { rabbitmqService } from '../services/rabbitmq.js';

const router = Router();

// Middleware to extract user ID from headers (set by API gateway)
const getUserId = (req: Request): string | null => {
  return req.headers['x-user-id'] as string || null;
};

/**
 * GET /api/wallet-tracking/wallets
 * Get all wallets for the authenticated user
 */
router.get('/wallets', async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const wallets = await walletManager.getUserWallets(userId);
    res.json(wallets);
  } catch (error) {
    console.error('[WalletRoute] Error fetching wallets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/wallet-tracking/wallets
 * Add a new wallet to tracking
 */
router.post('/wallets', async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { address, name, groupName } = req.body;

    if (!address || !name) {
      return res.status(400).json({ error: 'Address and name are required' });
    }

    // Validate Ethereum address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return res.status(400).json({ error: 'Invalid Ethereum address format' });
    }

    const wallet = await walletManager.addWallet({
      userId,
      address,
      name,
      groupName
    });

    // Publish event to RabbitMQ
    await rabbitmqService.publishWalletAdded(userId, address, name);

    res.status(201).json(wallet);
  } catch (error: any) {
    console.error('[WalletRoute] Error adding wallet:', error);

    if (error.message === 'Wallet already tracked by this user') {
      return res.status(409).json({ error: error.message });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/wallet-tracking/wallets/bulk
 * Add multiple wallets at once
 */
router.post('/wallets/bulk', async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { wallets } = req.body;

    if (!Array.isArray(wallets) || wallets.length === 0) {
      return res.status(400).json({ error: 'Wallets array is required' });
    }

    const result = await walletManager.bulkAddWallets(userId, wallets);

    // Publish events for successfully added wallets
    for (const wallet of result.added) {
      await rabbitmqService.publishWalletAdded(userId, wallet.address, wallet.name);
    }

    res.status(201).json(result);
  } catch (error) {
    console.error('[WalletRoute] Error bulk adding wallets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PUT /api/wallet-tracking/wallets/:address
 * Update wallet details
 */
router.put('/wallets/:address', async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { address } = req.params;
    const { name, groupName } = req.body;

    const wallet = await walletManager.updateWallet(userId, address, {
      name,
      groupName
    });

    res.json(wallet);
  } catch (error) {
    console.error('[WalletRoute] Error updating wallet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * DELETE /api/wallet-tracking/wallets/:address
 * Remove a wallet from tracking
 */
router.delete('/wallets/:address', async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { address } = req.params;

    await walletManager.removeWallet(userId, address);

    // Publish event to RabbitMQ
    await rabbitmqService.publishWalletRemoved(userId, address);

    res.json({ success: true, message: 'Wallet removed successfully' });
  } catch (error) {
    console.error('[WalletRoute] Error removing wallet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/wallet-tracking/wallets/:address/toggle
 * Toggle wallet active status
 */
router.post('/wallets/:address/toggle', async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { address } = req.params;

    const wallet = await walletManager.toggleWalletStatus(userId, address);
    res.json(wallet);
  } catch (error) {
    console.error('[WalletRoute] Error toggling wallet status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/wallet-tracking/groups
 * Get all groups for the authenticated user
 */
router.get('/groups', async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const groups = await walletManager.getUserGroups(userId);
    res.json(groups);
  } catch (error) {
    console.error('[WalletRoute] Error fetching groups:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/wallet-tracking/groups/:groupName
 * Get wallets in a specific group
 */
router.get('/groups/:groupName', async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { groupName } = req.params;

    const wallets = await walletManager.getWalletsByGroup(userId, groupName);
    res.json(wallets);
  } catch (error) {
    console.error('[WalletRoute] Error fetching group wallets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/wallet-tracking/stats
 * Get user statistics
 */
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const stats = await walletManager.getUserStats(userId);
    res.json(stats);
  } catch (error) {
    console.error('[WalletRoute] Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;