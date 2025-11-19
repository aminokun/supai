# Telegram Integration Guide

## Overview
The Telegram integration allows users to link their Telegram account to receive real-time notifications about wallet transactions.

## Architecture

### Frontend Components
- **API Client** (`/frontend/supai/lib/api-client.ts`) - Centralized API client for authenticated requests
- **useTelegram Hook** (`/frontend/supai/hooks/useTelegram.ts`) - React hook managing Telegram linking state
- **TelegramLinkingCard** (`/frontend/supai/components/telegram-linking-card.tsx`) - UI component for linking
- **Settings Page** (`/frontend/supai/app/(user)/settings/page.tsx`) - Settings page with Telegram integration

### Backend Services

#### User Service Endpoints
- `POST /api/users/telegram/generate-code` - Generate 6-digit linking code
- `GET /api/users/telegram-status` - Check if Telegram is linked
- `DELETE /api/users/telegram` - Unlink Telegram account
- `POST /api/telegram/link` - Verify code and link account (called by bot)
- `POST /api/telegram/unlink` - Unlink from Telegram side (called by bot)
- `GET /api/telegram/user/:chatId` - Get user by Telegram chat ID (called by bot)

#### Telegram Bot Service
- Location: `/services/telegram-bot`
- Port: 3006 (configurable)
- Bot Commands:
  - `/start` - Welcome message
  - `/link <code>` - Link account with 6-digit code
  - `/unlink` - Unlink Telegram account
  - `/list` - View tracked wallets
  - `/track <address> <name>` - Add wallet to tracking
  - `/untrack <address>` - Remove wallet from tracking
  - `/stats` - View tracking statistics
  - `/help` - Show help message

## User Flow

### Linking Telegram Account

1. **User navigates to Settings**
   - Go to `/settings` in the frontend
   - Click on "Account" tab (default)

2. **Generate Linking Code**
   - Find "Telegram Integration" card
   - Click "Connect Telegram" button
   - System generates 6-digit code (expires in 5 minutes)

3. **Link via Telegram Bot**
   - Open Telegram app
   - Search for `@supai_wallet_bot` (or configured bot username)
   - Start conversation with `/start`
   - Send `/link 123456` (replace with your code)

4. **Confirmation**
   - Bot confirms successful linking
   - Frontend automatically updates to show linked status
   - User can now receive notifications

### Unlinking Account

**From Frontend:**
1. Go to Settings → Account
2. Click "Unlink" button in Telegram Integration card
3. Confirm unlinking

**From Telegram:**
1. Send `/unlink` command to bot
2. Confirm unlinking via inline buttons

## Testing the Integration

### Prerequisites
1. Auth service running on port 3001
2. User service running on port 3002
3. API Gateway running on port 8080
4. Frontend running on port 3000
5. Telegram bot token configured

### Test Steps

1. **Start Backend Services**
```bash
# In root directory
docker-compose up -d rabbitmq
cd services/auth && npm run dev
cd services/user && npm run dev
cd services/wallet-tracking && npm run dev
```

2. **Start Telegram Bot**
```bash
cd services/telegram-bot
npm install
npm run dev
```

3. **Start Frontend**
```bash
cd frontend/supai
npm run dev
```

4. **Test Flow**
   - Create account and login
   - Navigate to Settings
   - Generate linking code
   - Open Telegram and link account
   - Test wallet tracking commands

### Environment Variables

**Frontend (.env)**
```env
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:8080
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=supai_wallet_bot
```

**Telegram Bot Service (.env)**
```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
BOT_USERNAME=supai_wallet_bot
PORT=3006
USER_SERVICE_URL=http://localhost:3002
API_GATEWAY_URL=http://localhost:8080/api
RABBITMQ_URL=amqp://rabbitmq_admin:rabbitmqpassword@localhost:5672
```

## Features

### Current Features
✅ Account linking with 6-digit code
✅ Real-time status updates (polling)
✅ Code expiration (5 minutes)
✅ Copy code to clipboard
✅ Visual countdown timer
✅ Telegram username display
✅ Unlink from both sides
✅ Session management in bot
✅ Wallet tracking commands

### UI Features
- Clean card-based interface
- Loading states for all operations
- Toast notifications for feedback
- Responsive design
- Dark mode compatible
- Clear instructions with step-by-step guide

### Security
- 6-digit codes expire in 5 minutes
- Codes are single-use only
- Session-based authentication
- User ID validation
- HTTPS in production

## Troubleshooting

### Common Issues

1. **"Invalid or expired code"**
   - Code has expired (5 minute limit)
   - Code already used
   - Generate a new code

2. **"Telegram already linked"**
   - Account already has Telegram linked
   - Unlink first, then link again

3. **Bot not responding**
   - Check bot token is correct
   - Ensure bot service is running
   - Check RabbitMQ connection

4. **Frontend not updating after linking**
   - Polling might be delayed (5 second intervals)
   - Refresh the page manually
   - Check browser console for errors

## Next Steps

### To Implement
- [ ] Notification service for sending messages
- [ ] Real-time WebSocket updates instead of polling
- [ ] QR code for easier bot access
- [ ] Email notifications option
- [ ] Notification preferences per wallet
- [ ] Group notifications
- [ ] Rich notifications with transaction details

### Production Considerations
- Use Redis for linking code storage
- Implement rate limiting
- Add monitoring and logging
- Use HTTPS for all services
- Implement webhook mode for Telegram bot
- Add database indexes for performance
- Implement proper error recovery

## API Examples

### Generate Code
```javascript
const response = await fetch('http://localhost:8080/api/users/telegram/generate-code', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
// { code: "123456", expiresIn: "5 minutes", instruction: "..." }
```

### Check Status
```javascript
const response = await fetch('http://localhost:8080/api/users/telegram-status', {
  method: 'GET',
  credentials: 'include'
});

const data = await response.json();
// { linked: true, telegramUsername: "johndoe" }
```

### Unlink Account
```javascript
const response = await fetch('http://localhost:8080/api/users/telegram', {
  method: 'DELETE',
  credentials: 'include'
});

const data = await response.json();
// { success: true, message: "Telegram account unlinked" }
```