import cors from "cors";
import "dotenv/config";
import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";
import { v4 as uuidv4 } from "uuid";

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

app.listen(PORT, () => {
  console.log(`User Service is running on port: ${PORT}`);
});