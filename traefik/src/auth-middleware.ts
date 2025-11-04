import { Request, Response, NextFunction } from "express";

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

  // Extract Authorization header (Bearer token)
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || typeof authHeader !== "string") {
    res.status(401).json({
      error: "Missing authorization token",
      code: "NO_AUTH_TOKEN",
    });
    return;
  }

  // Validate header format (Bearer <token>)
  const tokenMatch = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!tokenMatch) {
    res.status(401).json({
      error: 'Invalid authorization header format. Use: "Bearer <token>"',
      code: "INVALID_AUTH_FORMAT",
    });
    return;
  }

  const token = tokenMatch[1];

  try {
    // Verify session with Auth Service
    const session = await verifySessionWithAuthService(token);

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
 * Calls /api/auth/session endpoint with the Bearer token
 * This is the proper way to verify a user with better-auth
 */
async function verifySessionWithAuthService(token: string): Promise<AuthSession> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), AUTH_SESSION_TIMEOUT);

  try {
    const response = await fetch(`${AUTH_SERVICE_URL}/api/auth/session`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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
