import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// Import services
import { rabbitmqService } from './services/rabbitmq.js';
import { alchemyService } from './services/alchemy.js';

// Import routes
import webhookRoutes from './routes/webhooks.js';
import walletRoutes from './routes/wallets.js';

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase limit for webhook payloads
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'wallet-tracking-service',
    timestamp: new Date().toISOString()
  });
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