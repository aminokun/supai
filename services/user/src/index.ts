import cors from "cors";
import "dotenv/config";
import express from "express";
import amqp from "amqplib";
import { PrismaClient } from "../generated/prisma/index.js";
import { v4 as uuidv4 } from "uuid";
import { schedulePurgeJob } from "./jobs/purge-deleted-users.js";

const PORT = process.env.PORT || 3007;
const prisma = new PrismaClient();
const app = express();

// Temporary storage for linking codes (in production, use Redis)
const linkingCodes = new Map<string, { userId: string; createdAt: Date }>();

// Cleanup expired linking codes every minute
setInterval(() => {
  const now = new Date();
  for (const [code, data] of linkingCodes.entries()) {
    const age = now.getTime() - data.createdAt.getTime();
    if (age > 5 * 60 * 1000) { // 5 minutes expiry
      linkingCodes.delete(code);
    }
  }
}, 60000);

app.use(
  cors({
    origin: process.env.TRUSTED_ORIGINS || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// Middleware to extract user ID from auth service headers
const extractUserId = (req: express.Request): string | null => {
  return req.headers['x-user-id'] as string || null;
};

// Health check
app.get("/health", (req: any, res: any) => {
  res.json({ status: "ok", service: "user-service" });
});

// Get user profile by ID (for internal services)
// NOTE: Use specific path to avoid route conflicts with /api/users/telegram-status etc.
app.get("/api/users/by-id/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const profile = await prisma.userProfile.findUnique({
      where: { userId: id },
    });

    if (!profile) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Batch get users by IDs (optimized endpoint to fix N+1 query problem)
app.post("/api/users/batch", async (req: any, res: any) => {
  try {
    const { userIds, fields } = req.body;

    if (!userIds || !Array.isArray(userIds)) {
      return res.status(400).json({ error: "userIds array required" });
    }

    if (userIds.length === 0) {
      return res.json({ users: [], notFound: [], count: 0 });
    }

    if (userIds.length > 100) {
      return res.status(400).json({ error: "Maximum 100 users per batch request" });
    }

    // Build select clause if specific fields requested
    const select = fields?.length
      ? Object.fromEntries([
          ['userId', true],  // Always include userId
          ...fields.map((f: string) => [f, true])
        ])
      : undefined;

    // Single query for all users - fixes N+1 problem
    // Excludes anonymized users (GDPR deleted accounts)
    const profiles = await prisma.userProfile.findMany({
      where: {
        userId: { in: userIds },
        isAnonymized: false,  // Exclude deleted users
      },
      ...(select && { select }),
    });

    // Find which IDs weren't found
    const foundIds = new Set(profiles.map((p: any) => p.userId));
    const notFound = userIds.filter((id: string) => !foundIds.has(id));

    res.json({
      users: profiles,
      notFound,
      count: profiles.length,
    });
  } catch (error) {
    console.error("Error fetching batch users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get user profile
app.get("/api/users/profile", async (req: any, res: any) => {
  try {
    const userId = extractUserId(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const profile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create or update user profile
app.post("/api/users/profile", async (req: any, res: any) => {
  try {
    const userId = extractUserId(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { bio, phone, address, country } = req.body;

    const profile = await prisma.userProfile.upsert({
      where: { userId },
      update: { bio, phone, address, country },
      create: {
        userId,
        bio,
        phone,
        address,
        country,
      },
    });

    res.json(profile);
  } catch (error) {
    console.error("Error creating/updating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update user profile
app.put("/api/users/profile", async (req: any, res: any) => {
  try {
    const userId = extractUserId(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { bio, phone, address, country } = req.body;

    const profile = await prisma.userProfile.update({
      where: { userId },
      data: { bio, phone, address, country },
    });

    res.json(profile);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Profile not found" });
    }
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Generate linking code for Telegram
app.post("/api/users/telegram/generate-code", async (req: any, res: any) => {
  try {
    const userId = extractUserId(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if user already has Telegram linked
    const profile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (profile?.telegramChatId) {
      return res.status(400).json({
        error: "Telegram already linked",
        telegramUsername: profile.telegramUsername
      });
    }

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Store code with user ID
    linkingCodes.set(code, { userId, createdAt: new Date() });

    res.json({
      code,
      expiresIn: "5 minutes",
      instruction: "Send this code to the Telegram bot using /link command"
    });
  } catch (error) {
    console.error("Error generating linking code:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Verify linking code and link Telegram account (called by Telegram bot)
app.post("/api/users/telegram/verify-code", async (req: any, res: any) => {
  try {
    const { code, telegramChatId, telegramUsername } = req.body;

    if (!code || !telegramChatId) {
      return res.status(400).json({ error: "Code and telegramChatId required" });
    }

    // Check if code exists
    const codeData = linkingCodes.get(code);
    if (!codeData) {
      return res.status(400).json({ error: "Invalid or expired code" });
    }

    const { userId } = codeData;

    // Check if Telegram chat ID is already linked to another user
    const existingProfile = await prisma.userProfile.findUnique({
      where: { telegramChatId },
    });

    if (existingProfile) {
      return res.status(400).json({
        error: "This Telegram account is already linked to another user"
      });
    }

    // Link Telegram to user profile
    const profile = await prisma.userProfile.upsert({
      where: { userId },
      update: {
        telegramChatId,
        telegramUsername: telegramUsername || null,
      },
      create: {
        userId,
        telegramChatId,
        telegramUsername: telegramUsername || null,
      },
    });

    // Remove used code
    linkingCodes.delete(code);

    res.json({
      success: true,
      userId,
      message: "Telegram account linked successfully"
    });
  } catch (error) {
    console.error("Error verifying linking code:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get Telegram link status
app.get("/api/users/telegram-status", async (req: any, res: any) => {
  try {
    const userId = extractUserId(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const profile = await prisma.userProfile.findUnique({
      where: { userId },
      select: {
        telegramChatId: true,
        telegramUsername: true,
      },
    });

    const isLinked = !!(profile?.telegramChatId);

    res.json({
      linked: isLinked,
      telegramUsername: profile?.telegramUsername,
    });
  } catch (error) {
    console.error("Error fetching Telegram status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Unlink Telegram account
app.delete("/api/users/telegram", async (req: any, res: any) => {
  try {
    const userId = extractUserId(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    await prisma.userProfile.update({
      where: { userId },
      data: {
        telegramChatId: null,
        telegramUsername: null,
      },
    });

    res.json({ success: true, message: "Telegram account unlinked" });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Profile not found" });
    }
    console.error("Error unlinking Telegram:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get user by Telegram chat ID (for internal service use)
app.get("/api/users/by-telegram/:chatId", async (req: any, res: any) => {
  try {
    const { chatId } = req.params;

    const profile = await prisma.userProfile.findUnique({
      where: { telegramChatId: chatId },
    });

    if (!profile) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      userId: profile.userId,
      telegramUsername: profile.telegramUsername,
    });
  } catch (error) {
    console.error("Error fetching user by Telegram ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Telegram bot API endpoints (simplified paths for bot service)
app.post("/api/telegram/link", async (req: any, res: any) => {
  try {
    const { code, chatId, username } = req.body;

    if (!code || !chatId) {
      return res.status(400).json({ error: "Code and chatId required" });
    }

    // Check if code exists
    const codeData = linkingCodes.get(code);
    if (!codeData) {
      return res.status(400).json({ error: "Invalid or expired code" });
    }

    const { userId } = codeData;

    // Check if Telegram chat ID is already linked to another user
    const existingProfile = await prisma.userProfile.findUnique({
      where: { telegramChatId: chatId },
    });

    if (existingProfile) {
      return res.status(400).json({
        error: "This Telegram account is already linked to another user"
      });
    }

    // Link Telegram to user profile
    await prisma.userProfile.upsert({
      where: { userId },
      update: {
        telegramChatId: chatId,
        telegramUsername: username || null,
      },
      create: {
        userId,
        telegramChatId: chatId,
        telegramUsername: username || null,
      },
    });

    // Remove used code
    linkingCodes.delete(code);

    res.json({
      success: true,
      userId,
      message: "Telegram account linked successfully"
    });
  } catch (error) {
    console.error("Error linking Telegram:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/telegram/unlink", async (req: any, res: any) => {
  try {
    const { chatId } = req.body;

    if (!chatId) {
      return res.status(400).json({ error: "chatId required" });
    }

    const profile = await prisma.userProfile.findUnique({
      where: { telegramChatId: chatId },
    });

    if (!profile) {
      return res.status(404).json({ error: "Telegram account not linked" });
    }

    await prisma.userProfile.update({
      where: { userId: profile.userId },
      data: {
        telegramChatId: null,
        telegramUsername: null,
      },
    });

    res.json({ success: true, message: "Telegram account unlinked" });
  } catch (error) {
    console.error("Error unlinking Telegram:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/telegram/user/:chatId", async (req: any, res: any) => {
  try {
    const { chatId } = req.params;

    const profile = await prisma.userProfile.findUnique({
      where: { telegramChatId: chatId },
    });

    if (!profile) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      userId: profile.userId,
      telegramChatId: profile.telegramChatId,
      telegramUsername: profile.telegramUsername,
      linkedAt: profile.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching user by Telegram ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ============================================================
// GDPR Compliance Endpoints - Account Deletion
// ============================================================

const GRACE_PERIOD_DAYS = 30;
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "http://localhost:3001";
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || "http://localhost:3005";
const WALLET_TRACKING_SERVICE_URL = process.env.WALLET_TRACKING_SERVICE_URL || "http://localhost:3003";

// Request account deletion (soft delete with 30-day grace period)
app.delete("/api/users/account", async (req: any, res: any) => {
  try {
    const userId = extractUserId(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { confirmEmail, reason } = req.body;

    if (!confirmEmail) {
      return res.status(400).json({ error: "Email confirmation required" });
    }

    // Calculate deletion schedule (30 days from now)
    const deleteRequestedAt = new Date();
    const deletionScheduledAt = new Date();
    deletionScheduledAt.setDate(deletionScheduledAt.getDate() + GRACE_PERIOD_DAYS);

    // Step 1: Mark user for deletion in Auth service
    try {
      await fetch(`${AUTH_SERVICE_URL}/api/internal/users/${userId}/request-deletion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Internal-Service': 'user-service'
        },
        body: JSON.stringify({
          confirmEmail,
          deleteRequestedAt: deleteRequestedAt.toISOString(),
          deletionScheduledAt: deletionScheduledAt.toISOString(),
          reason
        })
      });
    } catch (authError) {
      console.log("[GDPR] Auth service deletion request skipped (endpoint may not exist yet)");
    }

    // Step 2: Anonymize user profile immediately (GDPR right to erasure)
    const profile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (profile) {
      await prisma.userProfile.update({
        where: { userId },
        data: {
          // Anonymize PII
          bio: null,
          phone: null,
          address: null,
          country: null,
          telegramChatId: null,
          telegramUsername: null,
          // Mark as anonymized
          anonymizedAt: new Date(),
          isAnonymized: true,
        },
      });
    }

    // Step 3: Notify other services to clean up (fire and forget)
    try {
      // Deactivate wallet tracking
      fetch(`${WALLET_TRACKING_SERVICE_URL}/api/internal/users/${userId}/deactivate`, {
        method: 'POST',
        headers: { 'X-Internal-Service': 'user-service' }
      }).catch(() => {});

      // Clear notification queue
      fetch(`${NOTIFICATION_SERVICE_URL}/api/internal/users/${userId}/cleanup`, {
        method: 'POST',
        headers: { 'X-Internal-Service': 'user-service' }
      }).catch(() => {});
    } catch (e) {
      console.log("[GDPR] Service notification skipped");
    }

    console.log(`[GDPR] Account deletion requested for user ${userId}, scheduled for ${deletionScheduledAt.toISOString()}`);

    res.json({
      success: true,
      deleteRequestedAt: deleteRequestedAt.toISOString(),
      deletionScheduledAt: deletionScheduledAt.toISOString(),
      gracePeriodDays: GRACE_PERIOD_DAYS,
      message: `Your account has been scheduled for deletion on ${deletionScheduledAt.toLocaleDateString()}. You can cancel this within ${GRACE_PERIOD_DAYS} days.`
    });
  } catch (error) {
    console.error("[GDPR] Error requesting account deletion:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Cancel account deletion (within grace period)
app.post("/api/users/account/cancel-deletion", async (req: any, res: any) => {
  try {
    const userId = extractUserId(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if profile exists and is anonymized
    const profile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    if (!profile.isAnonymized) {
      return res.status(400).json({ error: "No pending deletion request" });
    }

    // Reactivate profile (user will need to re-enter their data)
    await prisma.userProfile.update({
      where: { userId },
      data: {
        anonymizedAt: null,
        isAnonymized: false,
      },
    });

    // Cancel deletion in Auth service
    try {
      await fetch(`${AUTH_SERVICE_URL}/api/internal/users/${userId}/cancel-deletion`, {
        method: 'POST',
        headers: { 'X-Internal-Service': 'user-service' }
      });
    } catch (authError) {
      console.log("[GDPR] Auth service cancellation skipped (endpoint may not exist yet)");
    }

    console.log(`[GDPR] Account deletion cancelled for user ${userId}`);

    res.json({
      success: true,
      message: "Account deletion cancelled. Your account is now active again. Note: You will need to re-enter your profile information and re-link Telegram."
    });
  } catch (error) {
    console.error("[GDPR] Error cancelling account deletion:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Check account deletion status
app.get("/api/users/account/deletion-status", async (req: any, res: any) => {
  try {
    const userId = extractUserId(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const profile = await prisma.userProfile.findUnique({
      where: { userId },
      select: {
        isAnonymized: true,
        anonymizedAt: true,
      },
    });

    if (!profile) {
      return res.json({
        isPendingDeletion: false,
        message: "No profile found"
      });
    }

    if (!profile.isAnonymized) {
      return res.json({
        isPendingDeletion: false,
        message: "Account is active"
      });
    }

    // Calculate days remaining
    const anonymizedDate = profile.anonymizedAt ? new Date(profile.anonymizedAt) : new Date();
    const deletionDate = new Date(anonymizedDate);
    deletionDate.setDate(deletionDate.getDate() + GRACE_PERIOD_DAYS);

    const now = new Date();
    const daysRemaining = Math.max(0, Math.ceil((deletionDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

    res.json({
      isPendingDeletion: true,
      deleteRequestedAt: anonymizedDate.toISOString(),
      deletionScheduledAt: deletionDate.toISOString(),
      daysRemaining,
      canCancel: daysRemaining > 0,
      message: daysRemaining > 0
        ? `Your account will be permanently deleted in ${daysRemaining} days. You can still cancel.`
        : "Your account is being permanently deleted."
    });
  } catch (error) {
    console.error("[GDPR] Error fetching deletion status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ============================================================
// Force Deletion Endpoint (User-initiated immediate deletion)
// ============================================================

/**
 * Helper function to publish user.deleted event to RabbitMQ
 * Reuses the same logic as the purge job
 */
async function publishUserDeletedEvent(userId: string, reason: string): Promise<boolean> {
  try {
    const rabbitmqUrl = process.env.RABBITMQ_URL;
    if (!rabbitmqUrl) {
      console.error('[GDPR] RABBITMQ_URL not configured');
      return false;
    }

    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();

    // Assert the events exchange
    await channel.assertExchange('events', 'topic', { durable: true });

    const event = {
      id: `force-delete-${userId}-${Date.now()}`,
      type: 'user.deleted',
      timestamp: new Date().toISOString(),
      source: 'user-service',
      data: {
        userId,
        deletedAt: new Date().toISOString(),
        reason
      }
    };

    const message = Buffer.from(JSON.stringify(event));

    channel.publish('events', 'user.deleted', message, {
      persistent: true,
      timestamp: Date.now(),
      messageId: event.id,
      headers: {
        'x-event-type': 'user.deleted',
        'x-source': 'user-service'
      }
    });

    await channel.close();
    await connection.close();

    console.log(`[GDPR] Published USER_DELETED event for ${userId}`);
    return true;
  } catch (error) {
    console.error(`[GDPR] Failed to publish event for ${userId}:`, error);
    return false;
  }
}

// Force delete account immediately (bypasses 30-day grace period)
app.post("/api/users/account/force-delete", async (req: any, res: any) => {
  try {
    const userId = extractUserId(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if user has pending deletion
    const profile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    if (!profile.isAnonymized) {
      return res.status(400).json({
        error: "No pending deletion",
        message: "You must first request account deletion before you can force delete it."
      });
    }

    // Permanently delete profile
    await prisma.userProfile.delete({
      where: { userId },
    });

    // Publish user.deleted event to RabbitMQ for other services to clean up
    await publishUserDeletedEvent(userId, 'GDPR - user requested immediate deletion');

    console.log(`[GDPR] Force deletion completed for user ${userId}`);

    res.json({
      success: true,
      message: "Account permanently deleted"
    });
  } catch (error) {
    console.error("[GDPR] Error force deleting:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Internal endpoint: Permanently delete user data (called by purge job)
app.delete("/api/internal/users/:userId/purge", async (req: any, res: any) => {
  try {
    // Verify internal service call
    const internalService = req.headers['x-internal-service'];
    if (!internalService) {
      return res.status(403).json({ error: "Internal service access required" });
    }

    const { userId } = req.params;

    // Permanently delete the profile
    const result = await prisma.userProfile.deleteMany({
      where: { userId },
    });

    console.log(`[GDPR Purge] Permanently deleted profile for user ${userId}`);

    res.json({
      success: true,
      deleted: result.count,
      userId
    });
  } catch (error) {
    console.error("[GDPR Purge] Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`User Service is running on port: ${PORT}`);

  // Schedule GDPR purge job (runs daily at 2 AM)
  if (process.env.ENABLE_PURGE_JOB !== 'false') {
    schedulePurgeJob();
  }
});