import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'wallet-tracking-service' });
});

app.listen(PORT, () => {
  console.log(`Wallet tracking service running on port ${PORT}`);
});
