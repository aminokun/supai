/**
 * Seed Test Users for Load Testing
 *
 * This script creates test users in the user service database
 * for load testing the batch endpoint vs sequential fetches.
 *
 * Usage:
 *   node k6/seed-test-users.js
 *
 * Or with custom user count:
 *   USER_COUNT=50 node k6/seed-test-users.js
 */

const { PrismaClient } = require('../services/user/generated/prisma');

const prisma = new PrismaClient();

const USER_COUNT = parseInt(process.env.USER_COUNT || '20', 10);

async function seedTestUsers() {
  console.log(`\nSeeding ${USER_COUNT} test users for load testing...\n`);

  const users = [];

  for (let i = 1; i <= USER_COUNT; i++) {
    const userId = `test-user-${String(i).padStart(3, '0')}`;
    const chatId = `test-chat-${String(i).padStart(3, '0')}`;

    users.push({
      userId,
      bio: `Test user ${i} for load testing`,
      phone: `+1555000${String(i).padStart(4, '0')}`,
      address: `${i} Test Street`,
      country: 'Test Country',
      telegramChatId: chatId,
      telegramUsername: `testuser${i}`,
    });
  }

  let created = 0;
  let updated = 0;
  let errors = 0;

  for (const user of users) {
    try {
      await prisma.userProfile.upsert({
        where: { userId: user.userId },
        update: {
          bio: user.bio,
          phone: user.phone,
          address: user.address,
          country: user.country,
          telegramChatId: user.telegramChatId,
          telegramUsername: user.telegramUsername,
        },
        create: user,
      });

      // Check if it was created or updated
      const existing = await prisma.userProfile.findUnique({
        where: { userId: user.userId },
      });

      if (existing) {
        updated++;
      } else {
        created++;
      }
    } catch (error) {
      // Handle unique constraint on telegramChatId
      if (error.code === 'P2002') {
        console.log(`  Skipping ${user.userId} - telegramChatId already exists`);
        // Try without telegram data
        try {
          await prisma.userProfile.upsert({
            where: { userId: user.userId },
            update: {
              bio: user.bio,
              phone: user.phone,
              address: user.address,
              country: user.country,
            },
            create: {
              userId: user.userId,
              bio: user.bio,
              phone: user.phone,
              address: user.address,
              country: user.country,
            },
          });
          updated++;
        } catch (innerError) {
          errors++;
          console.error(`  Error with ${user.userId}:`, innerError.message);
        }
      } else {
        errors++;
        console.error(`  Error with ${user.userId}:`, error.message);
      }
    }
  }

  console.log('\n========================================');
  console.log('         SEED RESULTS SUMMARY          ');
  console.log('========================================');
  console.log(`  Total users processed: ${USER_COUNT}`);
  console.log(`  Created/Updated: ${created + updated}`);
  console.log(`  Errors: ${errors}`);
  console.log('========================================\n');

  // Print user IDs for k6 test
  const userIds = users.map(u => u.userId).join(',');
  console.log('User IDs for k6 test (copy this):');
  console.log(`USER_IDS="${userIds}"\n`);

  // Verify users exist
  const count = await prisma.userProfile.count({
    where: {
      userId: {
        startsWith: 'test-user-',
      },
    },
  });
  console.log(`Verified ${count} test users in database.\n`);
}

async function cleanupTestUsers() {
  console.log('\nCleaning up test users...\n');

  const result = await prisma.userProfile.deleteMany({
    where: {
      userId: {
        startsWith: 'test-user-',
      },
    },
  });

  console.log(`Deleted ${result.count} test users.\n`);
}

// Parse command line arguments
const args = process.argv.slice(2);
const isCleanup = args.includes('--cleanup') || args.includes('-c');

async function main() {
  try {
    if (isCleanup) {
      await cleanupTestUsers();
    } else {
      await seedTestUsers();
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
