import express, { Request, Response, NextFunction } from "express";
import httpProxy from "http-proxy";
import cors from "cors";
import authMiddleware from "./auth-middleware.js";
import "dotenv/config";
import { IncomingMessage, ServerResponse } from "http";

const app = express();
const PORT = process.env.PORT || 80;

// CORS configuration
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000",
      process.env.TELEGRAM_BOT_URL || "http://localhost:3006",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["X-Total-Count", "X-Page-Number"],
  })
);

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", service: "api-gateway" });
});

// ============================================================
// Proxy targets
// ============================================================

const authProxy = httpProxy.createProxyServer({
  target: process.env.AUTH_SERVICE_URL || "http://auth:3001",
  changeOrigin: true,
  timeout: 10000,
  proxyTimeout: 10000,
});

const assetPriceProxy = httpProxy.createProxyServer({
  target: process.env.ASSET_PRICE_SERVICE_URL || "http://asset-price:3002",
  changeOrigin: true,
  timeout: 10000,
  proxyTimeout: 10000,
});

const walletTrackingProxy = httpProxy.createProxyServer({
  target: process.env.WALLET_TRACKING_SERVICE_URL || "http://wallet-tracking:3003",
  changeOrigin: true,
  timeout: 10000,
  proxyTimeout: 10000,
});

const portfolioProxy = httpProxy.createProxyServer({
  target: process.env.PORTFOLIO_SERVICE_URL || "http://portfolio:3004",
  changeOrigin: true,
  timeout: 10000,
  proxyTimeout: 10000,
});

const notificationProxy = httpProxy.createProxyServer({
  target: process.env.NOTIFICATION_SERVICE_URL || "http://notification:3005",
  changeOrigin: true,
  timeout: 10000,
  proxyTimeout: 10000,
});

// ============================================================
// Error handling for proxies
// ============================================================

const handleProxyError = (error: Error, req: IncomingMessage, res: ServerResponse) => {
  console.error(`[Proxy Error]:`, error.message);

  if (res.headersSent) return;

  res.writeHead(503, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      error: "Service unavailable",
      message: "The requested service is temporarily unavailable",
    })
  );
};

authProxy.on("error", (error, req, res) => handleProxyError(error, req, res as ServerResponse));
assetPriceProxy.on("error", (error, req, res) =>
  handleProxyError(error, req, res as ServerResponse)
);
walletTrackingProxy.on("error", (error, req, res) =>
  handleProxyError(error, req, res as ServerResponse)
);
portfolioProxy.on("error", (error, req, res) =>
  handleProxyError(error, req, res as ServerResponse)
);
notificationProxy.on("error", (error, req, res) =>
  handleProxyError(error, req, res as ServerResponse)
);

// ============================================================
// Routes
// ============================================================

// Auth Service (no auth required for signup/signin)
app.use("/api/auth", (req: Request, res: Response, next: NextFunction) => {
  authProxy.web(req, res);
});

// Asset Price Service (requires auth)
app.use(
  "/alerts",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    assetPriceProxy.web(req, res);
  }
);

// Wallet Tracking Service (requires auth, except for webhooks)
app.use(
  "/wallets",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    walletTrackingProxy.web(req, res);
  }
);

// Alchemy webhooks (no auth required, IP-restricted)
app.use(
  "/webhooks/alchemy",
  (req: Request, res: Response, next: NextFunction) => {
    // TODO: Add IP whitelist check for Alchemy
    walletTrackingProxy.web(req, res);
  }
);

// Portfolio Service (requires auth)
app.use(
  "/portfolio",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    portfolioProxy.web(req, res);
  }
);

// Notification Service (internal only, requires auth)
app.use(
  "/api/notifications",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    notificationProxy.web(req, res);
  }
);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Not found",
    path: req.path,
    message: "The requested endpoint does not exist",
  });
});

// Global error handler
app.use(
  (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error("[Global Error]", error);

    if (res.headersSent) return;

    res.status(500).json({
      error: "Internal server error",
      message: error.message || "An unexpected error occurred",
    });
  }
);

// ============================================================
// Server startup
// ============================================================

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log(`Auth Service: ${process.env.AUTH_SERVICE_URL || "http://auth:3001"}`);
  console.log(`Asset Price Service: ${process.env.ASSET_PRICE_SERVICE_URL || "http://asset-price:3002"}`);
  console.log(`Wallet Tracking Service: ${process.env.WALLET_TRACKING_SERVICE_URL || "http://wallet-tracking:3003"}`);
  console.log(`Portfolio Service: ${process.env.PORTFOLIO_SERVICE_URL || "http://portfolio:3004"}`);
  console.log(`Notification Service: ${process.env.NOTIFICATION_SERVICE_URL || "http://notification:3005"}`);
});

export default app;
