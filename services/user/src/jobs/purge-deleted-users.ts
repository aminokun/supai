/**
 * GDPR Purge Job - Permanently Delete User Data
 *
 * This job runs daily at 2 AM to permanently delete user data
 * for accounts that have been in the deletion grace period for 30+ days.
 *
 * Event-based deletion:
 * 1. Find users ready for deletion
 * 2. Delete local UserProfile
 * 3. Publish USER_DELETED event to RabbitMQ
 * 4. Other services (wallet-tracking, notification, auth) subscribe
 *    to this event and clean up their own data
 */

import cron from 'node-cron';
import amqp from 'amqplib';
import { PrismaClient } from '../../generated/prisma/index.js';

const prisma = new PrismaClient();

// RabbitMQ connection
const RABBITMQ_URL = process.env.RABBITMQ_URL;
if (!RABBITMQ_URL) {
  throw new Error("RABBITMQ_URL environment variable is required");
}

// Grace period in days
const GRACE_PERIOD_DAYS = 30;

// Batch size for processing
const BATCH_SIZE = 50;

interface PurgeResult {
  userId: string;
  success: boolean;
  profileDeleted: boolean;
  eventPublished: boolean;
  error?: string;
}

let rabbitChannel: amqp.Channel | null = null;

/**
 * Connect to RabbitMQ
 */
async function connectRabbitMQ(): Promise<amqp.Channel> {
  if (rabbitChannel) return rabbitChannel;

  try {
    const connection = await amqp.connect(RABBITMQ_URL!);
    rabbitChannel = await connection.createChannel();

    // Assert the events exchange
    await rabbitChannel.assertExchange('events', 'topic', { durable: true });

    console.log('[Purge] Connected to RabbitMQ');
    return rabbitChannel;
  } catch (error) {
    console.error('[Purge] RabbitMQ connection failed:', error);
    throw error;
  }
}

/**
 * Find users ready for permanent deletion
 */
async function findUsersToDelete(): Promise<string[]> {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - GRACE_PERIOD_DAYS);

  const profiles = await prisma.userProfile.findMany({
    where: {
      isAnonymized: true,
      anonymizedAt: {
        lte: cutoffDate
      }
    },
    select: {
      userId: true
    },
    take: BATCH_SIZE
  });

  return profiles.map(p => p.userId);
}

/**
 * Delete user profile from database
 */
async function deleteUserProfile(userId: string): Promise<boolean> {
  try {
    const result = await prisma.userProfile.deleteMany({
      where: { userId }
    });
    return result.count > 0;
  } catch (error) {
    console.error(`[Purge] User profile deletion failed for ${userId}:`, error);
    return false;
  }
}

/**
 * Publish USER_DELETED event to RabbitMQ
 * Other services will consume this event and clean up their data
 */
async function publishUserDeletedEvent(userId: string): Promise<boolean> {
  try {
    const channel = await connectRabbitMQ();

    const event = {
      id: `purge-${userId}-${Date.now()}`,
      type: 'user.deleted',
      timestamp: new Date().toISOString(),
      source: 'user-service',
      data: {
        userId,
        deletedAt: new Date().toISOString(),
        reason: 'GDPR purge - grace period expired'
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

    console.log(`[Purge] Published USER_DELETED event for ${userId}`);
    return true;
  } catch (error) {
    console.error(`[Purge] Failed to publish event for ${userId}:`, error);
    return false;
  }
}

/**
 * Permanently delete all data for a single user
 */
async function purgeUser(userId: string): Promise<PurgeResult> {
  console.log(`[Purge] Starting deletion for user ${userId}`);

  const result: PurgeResult = {
    userId,
    success: false,
    profileDeleted: false,
    eventPublished: false
  };

  try {
    // Step 1: Delete local user profile
    result.profileDeleted = await deleteUserProfile(userId);
    console.log(`[Purge] User profile: ${result.profileDeleted ? 'DELETED' : 'NOT FOUND'}`);

    // Step 2: Publish USER_DELETED event for other services
    result.eventPublished = await publishUserDeletedEvent(userId);
    console.log(`[Purge] Event published: ${result.eventPublished ? 'YES' : 'FAILED'}`);

    // Success if profile was deleted (or didn't exist) and event was published
    result.success = result.eventPublished;
    console.log(`[Purge] User ${userId} deletion ${result.success ? 'COMPLETE' : 'FAILED'}`);

  } catch (error: any) {
    result.error = error.message;
    console.error(`[Purge] Unexpected error for user ${userId}:`, error);
  }

  return result;
}

/**
 * Main purge job function
 */
export async function runPurgeJob(): Promise<void> {
  console.log('\n========================================');
  console.log('[GDPR Purge Job] Starting at', new Date().toISOString());
  console.log('========================================\n');

  try {
    // Ensure RabbitMQ is connected
    await connectRabbitMQ();

    const userIds = await findUsersToDelete();

    if (userIds.length === 0) {
      console.log('[Purge] No users ready for permanent deletion');
      return;
    }

    console.log(`[Purge] Found ${userIds.length} users ready for deletion`);

    const results: PurgeResult[] = [];

    for (const userId of userIds) {
      const result = await purgeUser(userId);
      results.push(result);

      // Small delay between users to avoid overwhelming RabbitMQ
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Summary
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log('\n========================================');
    console.log('[GDPR Purge Job] Summary');
    console.log('========================================');
    console.log(`  Total processed: ${results.length}`);
    console.log(`  Successful: ${successful}`);
    console.log(`  Failed: ${failed}`);
    console.log('========================================\n');

  } catch (error) {
    console.error('[Purge] Job failed:', error);
  }
}

/**
 * Schedule the purge job to run daily at 2 AM
 */
export function schedulePurgeJob(): void {
  // Cron expression: "0 2 * * *" = At 02:00 every day
  cron.schedule('0 2 * * *', async () => {
    await runPurgeJob();
  });

  console.log('[GDPR Purge Job] Scheduled to run daily at 2:00 AM');
}

/**
 * Run immediately if called directly
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  runPurgeJob()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
