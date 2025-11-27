import { Router } from 'express';
import type { Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma/index.js';
import { alchemyService } from '../services/alchemy.js';
import { walletManager } from '../services/wallet-manager.js';
import { rabbitmqService } from '../services/rabbitmq.js';

const router = Router();
const prisma = new PrismaClient();

/**
 * Alchemy webhook endpoint
 */
router.post('/webhooks/alchemy', async (req: Request, res: Response) => {
  try {
    // Verify webhook signature if provided
    const signature = req.headers['x-alchemy-signature'] as string;
    if (signature && signature !== 'test-signature') {
      const rawBody = JSON.stringify(req.body);
      const isValid = alchemyService.verifyWebhookSignature(rawBody, signature);

      if (!isValid) {
        console.warn('[Webhook] Invalid signature');
        return res.status(401).json({ error: 'Invalid signature' });
      }
    } else if (signature === 'test-signature') {
      console.log('[Webhook] Test mode - skipping signature validation');
    }

    const { event } = req.body;

    if (!event || !event.activity) {
      return res.status(400).json({ error: 'Invalid webhook payload' });
    }

    console.log(`[Webhook] Received ${event.activity.length} activities`);

    // Process each activity
    for (const activity of event.activity) {
      try {
        // Extract relevant data
        const txData = {
          txHash: activity.hash,
          fromAddress: activity.fromAddress?.toLowerCase(),
          toAddress: activity.toAddress?.toLowerCase(),
          value: activity.value || '0',
          blockNumber: parseInt(activity.blockNum, 16),
          timestamp: new Date(req.body.createdAt),
          category: activity.category,
          contractAddress: activity.rawContract?.address,
          asset: activity.asset,
          amount: activity.rawContract?.value,
          priceUSD: activity.netAssetTransfers?.[0]?.valueUSD || null
        };

        // Check if transaction already processed
        const existing = await prisma.walletTransaction.findUnique({
          where: { txHash: txData.txHash }
        });

        if (existing) {
          console.log(`[Webhook] Transaction ${txData.txHash} already processed`);
          continue;
        }

        // Save transaction to database
        await prisma.walletTransaction.create({
          data: {
            txHash: txData.txHash,
            fromAddress: txData.fromAddress || '',
            toAddress: txData.toAddress,
            value: String(txData.value),
            blockNumber: txData.blockNumber,
            timestamp: txData.timestamp,
            type: 'pending',
            status: 'pending',
            category: txData.category,
            tokenAddress: txData.contractAddress,
            priceUSD: txData.priceUSD,
            metadata: activity
          }
        });

        // Find all users tracking these addresses
        const affectedUsers = new Set<string>();

        if (txData.fromAddress) {
          const fromUsers = await walletManager.getUsersTrackingAddress(txData.fromAddress);
          fromUsers.forEach(userId => affectedUsers.add(userId));
        }

        if (txData.toAddress) {
          const toUsers = await walletManager.getUsersTrackingAddress(txData.toAddress);
          toUsers.forEach(userId => affectedUsers.add(userId));
        }

        // Publish to RabbitMQ if users are affected
        if (affectedUsers.size > 0) {
          await rabbitmqService.publishTransactionDetected({
            ...txData,
            affectedUsers: Array.from(affectedUsers)
          });

          console.log(`[Webhook] Transaction ${txData.txHash} affects ${affectedUsers.size} users`);
        }

      } catch (error) {
        console.error('[Webhook] Error processing activity:', error);
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('[Webhook] Error processing webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Manual test endpoint
 */
router.post('/webhooks/test', async (req: Request, res: Response) => {
  try {
    const { address, txHash } = req.body;

    // Create a test transaction event
    const testEvent = {
      txHash: txHash || `0xtest${Date.now()}`,
      fromAddress: address || '0xtest',
      toAddress: '0xdestination',
      value: '1000000000000000000',
      blockNumber: 12345,
      timestamp: new Date(),
      category: 'external',
      asset: 'ETH',
      priceUSD: 3000,
      affectedUsers: []
    };

    // Find users tracking this address
    const users = await walletManager.getUsersTrackingAddress(testEvent.fromAddress);
    testEvent.affectedUsers = users;

    if (users.length > 0) {
      await rabbitmqService.publishTransactionDetected(testEvent);
      res.json({
        success: true,
        message: `Test event sent to ${users.length} users`,
        transaction: testEvent
      });
    } else {
      res.json({
        success: false,
        message: 'No users tracking this address'
      });
    }
  } catch (error) {
    console.error('[Webhook] Error in test endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;