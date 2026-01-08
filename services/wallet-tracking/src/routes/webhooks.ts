import { Router } from "express";
import type { Request, Response } from "express";
import axios from "axios";
import { PrismaClient } from "../../generated/prisma/index.js";
import { alchemyService } from "../services/alchemy.js";
import { walletManager } from "../services/wallet-manager.js";
import { rabbitmqService } from "../services/rabbitmq.js";

const router = Router();
const prisma = new PrismaClient();
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || "http://user:3007";

interface AffectedUser {
  userId: string;
  telegramChatId?: string;
  telegramUsername?: string;
}

/**
 * Fetch user profiles with telegram data from user service
 * Uses batch endpoint to avoid N+1 queries
 */
async function fetchUserProfiles(userIds: string[]): Promise<AffectedUser[]> {
  if (userIds.length === 0) return [];

  try {
    const response = await axios.post(`${USER_SERVICE_URL}/api/users/batch`, {
      userIds,
      fields: ["userId", "telegramChatId", "telegramUsername"],
    });

    const { users } = response.data;
    return users.map((u: any) => ({
      userId: u.userId,
      telegramChatId: u.telegramChatId,
      telegramUsername: u.telegramUsername,
    }));
  } catch (error) {
    console.error("[Webhook] Failed to fetch user profiles:", error);
    // Fallback: return just user IDs without telegram data
    return userIds.map((userId) => ({ userId }));
  }
}

/**
 * Alchemy webhook endpoint
 */
router.post("/webhooks/alchemy", async (req: Request, res: Response) => {
  try {
    // Verify webhook signature if provided
    const signature = req.headers["x-alchemy-signature"] as string;
    if (signature && signature !== "test-signature") {
      const rawBody = JSON.stringify(req.body);
      const isValid = alchemyService.verifyWebhookSignature(
        rawBody,
        "test-signature"
      );

      if (!isValid) {
        console.warn("[Webhook] Invalid signature");
        return res.status(401).json({ error: "Invalid signature" });
      }
    } else if (signature === "test-signature") {
      console.log("[Webhook] Test mode - skipping signature validation");
    }

    const { event } = req.body;

    if (!event || !event.activity) {
      return res.status(400).json({ error: "Invalid webhook payload" });
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
          value: activity.value || "0",
          blockNumber: parseInt(activity.blockNum, 16),
          timestamp: new Date(req.body.createdAt),
          category: activity.category,
          contractAddress: activity.rawContract?.address,
          asset: activity.asset,
          assetName: activity.asset || "ETH", // Token symbol
          decimals: activity.rawContract?.decimal || null, // Token decimals
          amount: activity.rawContract?.value,
          amountFloat: activity.rawContract?.value && activity.rawContract?.decimal
            ? parseFloat(activity.rawContract.value) / Math.pow(10, activity.rawContract.decimal)
            : parseFloat(activity.value || 0) / 1e18,
          priceUSD: activity.netAssetTransfers?.[0]?.valueUSD || null,
        };

        // Check if transaction already processed
        const existing = await prisma.walletTransaction.findUnique({
          where: { txHash: txData.txHash },
        });

        if (existing) {
          console.log(
            `[Webhook] Transaction ${txData.txHash} already processed`
          );
          continue;
        }

        // Save transaction to database
        await prisma.walletTransaction.create({
          data: {
            txHash: txData.txHash,
            fromAddress: txData.fromAddress || "",
            toAddress: txData.toAddress,
            value: String(txData.value),
            blockNumber: txData.blockNumber,
            timestamp: txData.timestamp,
            type: "pending",
            status: "pending",
            category: txData.category,
            tokenAddress: txData.contractAddress,
            tokenSymbol: txData.assetName,
            tokenName: txData.assetName,
            amount: txData.amountFloat ? String(txData.amountFloat) : null,
            priceUSD: txData.priceUSD,
            metadata: activity,
          },
        });

        // Find all users tracking these addresses
        const affectedUserIds = new Set<string>();

        if (txData.fromAddress) {
          const fromUsers = await walletManager.getUsersTrackingAddress(
            txData.fromAddress
          );
          fromUsers.forEach((userId) => affectedUserIds.add(userId));
        }

        if (txData.toAddress) {
          const toUsers = await walletManager.getUsersTrackingAddress(
            txData.toAddress
          );
          toUsers.forEach((userId) => affectedUserIds.add(userId));
        }

        // Publish to RabbitMQ if users are affected
        if (affectedUserIds.size > 0) {
          // Fetch user profiles with telegram data (single batch call)
          const affectedUsers = await fetchUserProfiles(
            Array.from(affectedUserIds)
          );

          await rabbitmqService.publishTransactionDetected({
            ...txData,
            affectedUsers,
          });

          console.log(
            `[Webhook] Transaction ${txData.txHash} affects ${affectedUsers.length} users`
          );
        }
      } catch (error) {
        console.error("[Webhook] Error processing activity:", error);
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("[Webhook] Error processing webhook:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Manual test endpoint
 */
router.post("/webhooks/test", async (req: Request, res: Response) => {
  try {
    const { address, txHash } = req.body;

    // Create a test transaction event
    const testEvent: any = {
      txHash: txHash || `0xtest${Date.now()}`,
      fromAddress: address || "0xtest",
      toAddress: "0xdestination",
      value: "1000000000000000000",
      blockNumber: 12345,
      timestamp: new Date(),
      category: "external",
      asset: "ETH",
      assetName: "ETH",
      decimals: 18,
      amountFloat: 1.0,
      priceUSD: 3000,
      affectedUsers: [] as AffectedUser[],
    };

    // Find users tracking this address
    const userIds = await walletManager.getUsersTrackingAddress(
      testEvent.fromAddress
    );

    if (userIds.length > 0) {
      // Fetch user profiles with telegram data
      testEvent.affectedUsers = await fetchUserProfiles(userIds);

      await rabbitmqService.publishTransactionDetected(testEvent);
      res.json({
        success: true,
        message: `Test event sent to ${testEvent.affectedUsers.length} users`,
        transaction: testEvent,
      });
    } else {
      res.json({
        success: false,
        message: "No users tracking this address",
      });
    }
  } catch (error) {
    console.error("[Webhook] Error in test endpoint:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
