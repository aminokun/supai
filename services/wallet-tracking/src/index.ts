import express from 'express';
import promClient from "prom-client";
import cors from 'cors';
import 'dotenv/config';

// Import services
import { rabbitmqService } from './services/rabbitmq.js';
import { alchemyService } from './services/alchemy.js';
import { PrismaClient } from '../generated/prisma/index.js';

// Import routes
import webhookRoutes from './routes/webhooks.js';
import walletRoutes from './routes/wallets.js';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3003;

// ============================================================
// Prometheus Metrics
// ============================================================

const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['route', 'code', 'method'],
  registers: [register]
});

const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['route', 'code', 'method'],
  registers: [register]
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase limit for webhook payloads
app.use(express.urlencoded({ extended: true }));

// Metrics middleware
app.use((req: any, res: any, next: any) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route?.path || req.path;
    const code = res.statusCode.toString();

    httpRequestDuration
      .labels(route, code, req.method)
      .observe(duration);

    httpRequestsTotal
      .labels(route, code, req.method)
      .inc();
  });
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'wallet-tracking-service',
    timestamp: new Date().toISOString()
  });
});

// Metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.send(await register.metrics());
});

// Internal endpoint: Deactivate user (called by user service during deletion request)
app.post('/api/internal/users/:userId/deactivate', async (req, res) => {
  try {
    const { userId } = req.params;

    // Verify this is an internal request
    const internalKey = req.headers['x-internal-service'];
    if (internalKey !== process.env.INTERNAL_SERVICE_KEY && internalKey !== 'user-service') {
      return res.status(403).json({ error: 'Forbidden - internal endpoint' });
    }

    // Get all tracked wallet addresses for this user
    const trackedWallets = await prisma.trackedWallet.findMany({
      where: { userId },
      select: { address: true },
    });

    const addresses = trackedWallets.map((w) => w.address);

    // Remove from Alchemy webhooks
    if (addresses.length > 0) {
      try {
        await alchemyService.removeAddresses(addresses);
      } catch (error) {
        console.log(`[GDPR] Alchemy cleanup skipped: ${error}`);
      }
    }

    // Note: We don't delete wallets here yet - that happens after the grace period
    // via the RabbitMQ user.deleted event

    console.log(`[GDPR] Deactivated wallets for user ${userId}, removed from ${addresses.length} webhook addresses`);

    res.json({
      success: true,
      addressesRemoved: addresses.length,
    });
  } catch (error) {
    console.error('[GDPR] Error deactivating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Routes
app.use('/', webhookRoutes); // Webhook routes at root level
app.use('/api/wallet-tracking', walletRoutes); // API routes

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[Error]', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    service: 'wallet-tracking-service'
  });
});

// Initialize services
async function initializeServices() {
  try {
    // Connect to RabbitMQ
    await rabbitmqService.connect();
    console.log('[Init] RabbitMQ connected');

    // Update Alchemy webhook URL if configured
    if (process.env.ALCHEMY_WEBHOOK_URL) {
      await alchemyService.updateWebhookUrl(process.env.ALCHEMY_WEBHOOK_URL);
      console.log('[Init] Alchemy webhook URL updated');
    }

    console.log('[Init] All services initialized successfully');
  } catch (error) {
    console.error('[Init] Error initializing services:', error);
    // Continue running even if some services fail to initialize
  }
}

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Wallet tracking service running on port ${PORT}`);
  console.log(`📍 Webhook endpoint: http://localhost:${PORT}/webhooks/alchemy`);
  console.log(`📍 API endpoint: http://localhost:${PORT}/api/wallet-tracking`);

  // Initialize services after server starts
  await initializeServices();
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('[Shutdown] SIGTERM received, closing connections...');
  await rabbitmqService.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('[Shutdown] SIGINT received, closing connections...');
  await rabbitmqService.close();
  process.exit(0);
});