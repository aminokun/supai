import { Request, Response, NextFunction } from "express";
import { getCachedSession, cacheSession, isRedisConnected } from "./redis-client.js";

// Paths that don't require authentication
const SKIP_AUTH_PATHS = [
  "/api/auth/sign-up",
  "/api/auth/sign-in",
  "/api/auth/callback",
  "/api/auth/reset-password",
  "/health",
  "/dashboard",
  "/webhooks/alchemy", // Webhook from Alchemy - IP restricted instead
];

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "http://auth:3001";
const AUTH_SESSION_TIMEOUT = 5000; // 5 seconds
const SESSION_CACHE_TTL = 300; // 5 minutes cache TTL

interface AuthSession {
  user: {
    id: string;
    email: string;
    name?: string;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };
  session: {
    id: string;
    expiresAt: string;
    token: string;
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * API Gateway Authentication Middleware
 * Validates user session with the Auth Service before routing to protected endpoints
 */
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // Skip authentication for public paths
  if (SKIP_AUTH_PATHS.some((path) => req.path.startsWith(path))) {
    next();
    return;
  }

  // Extract session token - prefer cookie, fall back to Authorization header
  // better-auth uses cookies with format: token.signature
  let sessionToken: string | undefined;

  // First, try to get from cookie (contains full token with signature)
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      if (key && value) acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
    sessionToken = cookies['better-auth.session_token'];
  }

  // Fall back to Authorization header if no cookie
  if (!sessionToken) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && typeof authHeader === "string") {
      const tokenMatch = authHeader.match(/^Bearer\s+(.+)$/i);
      if (tokenMatch) {
        sessionToken = tokenMatch[1];
      }
    }
  }

  if (!sessionToken) {
    res.status(401).json({
      error: "Missing authorization token",
      code: "NO_AUTH_TOKEN",
    });
    return;
  }

  const token = sessionToken;

  try {
    let session: AuthSession | null = null;

    // Check Redis cache first (if Redis is connected)
    if (isRedisConnected()) {
      session = await getCachedSession(token);
    }

    // Cache miss or Redis not connected - verify with Auth Service
    if (!session) {
      session = await verifySessionWithAuthService(token);

      // Cache the session in Redis for future requests
      if (isRedisConnected()) {
        await cacheSession(token, session, SESSION_CACHE_TTL);
      }
    }

    // Validate session expiration
    const expiresAt = new Date(session.session.expiresAt);
    if (expiresAt < new Date()) {
      res.status(401).json({
        error: "Session expired",
        code: "SESSION_EXPIRED",
      });
      return;
    }

    // Verify email is confirmed (optional - based on your requirements)
    // if (!session.user.emailVerified) {
    //   res.status(403).json({
    //     error: "Email not verified",
    //     code: "EMAIL_NOT_VERIFIED",
    //   });
    //   return;
    // }

    // Add user and session info to request for downstream services
    (req as any).user = session.user;
    (req as any).session = session.session;
    (req as any).token = token;

    // Add headers for downstream services to identify the user
    req.headers["x-user-id"] = session.user.id;
    req.headers["x-user-email"] = session.user.email;
    if (session.user.name) {
      req.headers["x-user-name"] = session.user.name;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    console.error("[Auth Middleware] Verification failed:", errorMessage);

    res.status(401).json({
      error: "Unauthorized: Session verification failed",
      code: "SESSION_VERIFICATION_FAILED",
      details: errorMessage,
    });
  }
}

/**
 * Verify session with Auth Service
 * Calls /api/auth/get-session endpoint with the session cookie
 * better-auth uses cookies for session management, not Bearer tokens
 */
async function verifySessionWithAuthService(token: string): Promise<AuthSession> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), AUTH_SESSION_TIMEOUT);

  try {
    // better-auth expects the session token in a cookie, not Bearer header
    // The token from Authorization header is the same as the cookie token (first part before the dot)
    const response = await fetch(`${AUTH_SERVICE_URL}/api/auth/get-session`, {
      method: "GET",
      headers: {
        // Forward the session as a cookie - better-auth expects this format
        Cookie: `better-auth.session_token=${token}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid or expired session token");
      }
      if (response.status === 403) {
        throw new Error("User forbidden or session revoked");
      }
      if (response.status === 404) {
        throw new Error("Session not found");
      }

      const errorBody = await response.text();
      throw new Error(`Auth service returned ${response.status}: ${errorBody}`);
    }

    const session = (await response.json()) as AuthSession;

    // Validate response structure
    if (!session.user || !session.user.id || !session.user.email) {
      throw new Error("Invalid session response: missing required user fields");
    }

    if (!session.session || !session.session.id) {
      throw new Error("Invalid session response: missing session data");
    }

    return session;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error("Auth service request timeout");
      }
      throw error;
    }
    throw new Error("Failed to verify session with auth service");
  }
}

export default authMiddleware;
