#!/bin/bash

echo "🚀 Testing Complete Notification Flow"
echo "===================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📝 Make sure these services are running:${NC}"
echo "1. Wallet-tracking service (port 3003)"
echo "2. Notification service (port 3005)"
echo "3. RabbitMQ (port 5672)"
echo "4. Ngrok tunnel active"
echo ""

# Use the wallet address that was tracked in the previous session
# This is the address from the user's testing
WALLET_ADDRESS="0x90ec1abe6b06b4ac171309e7f09b96252a258873"

echo -e "${GREEN}🔄 Sending test transaction to tracked wallet:${NC}"
echo "To: $WALLET_ADDRESS"
echo "Amount: 2.5 ETH"
echo ""

# Generate unique IDs for this test
TIMESTAMP=$(date +%s)
TX_HASH="0xtest$(openssl rand -hex 32 2>/dev/null || echo $TIMESTAMP)"

# Send webhook with proper value format (as string, not wei)
curl -X POST https://020b7a5bb6c6.ngrok-free.app/webhooks/alchemy \
  -H "Content-Type: application/json" \
  -H "x-alchemy-signature: test-signature" \
  -d '{
  "webhookId": "wh_yxg2izkjty3odk2g",
  "id": "test-notification-'$TIMESTAMP'",
  "createdAt": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",
  "type": "ADDRESS_ACTIVITY",
  "event": {
    "network": "ETH_MAINNET",
    "activity": [{
      "fromAddress": "0x742d35cc6634c0532925a3b844bc9e7595f0beb5",
      "toAddress": "'$WALLET_ADDRESS'",
      "blockNum": "0x1234567",
      "hash": "'$TX_HASH'",
      "value": "2.5",
      "asset": "ETH",
      "category": "external",
      "typeTraceAddress": null
    }]
  }
}'

echo ""
echo -e "${GREEN}✅ Webhook sent successfully!${NC}"
echo ""
echo -e "${YELLOW}📱 Check your Telegram for the notification!${NC}"
echo "You should receive a message with:"
echo "  - 📥 Incoming Transaction Alert"
echo "  - 💰 Amount: 2.5 ETH"
echo "  - Transaction details and Etherscan link"
echo ""
echo -e "${YELLOW}🔍 If you don't receive a notification:${NC}"
echo "1. Check notification service logs for [RabbitMQ] and [Notification] messages"
echo "2. Check wallet-tracking logs for webhook processing"
echo "3. Verify your Telegram is linked (use /status in Telegram bot)"
echo "4. Check ngrok inspector: http://localhost:4040"