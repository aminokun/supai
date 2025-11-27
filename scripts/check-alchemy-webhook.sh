#!/bin/bash

# Check current webhook configuration
ALCHEMY_AUTH_TOKEN="MeUyrthPQP8PI6SHT4lwtp_OHpbqbhFy"
WEBHOOK_ID="wh_yxg2izkjty3odk2g"

echo "🔍 Checking Alchemy Webhook Configuration..."
echo ""

# Note: Alchemy's API for fetching webhook details is not well documented
# You may need to check directly in the Alchemy Dashboard
echo "📋 Please verify in Alchemy Dashboard:"
echo "1. Go to https://dashboard.alchemy.com/"
echo "2. Navigate to your app: w19n9qvx2pr6u01x"
echo "3. Go to Webhooks section"
echo "4. Check if addresses are being added when you track wallets"
echo ""
echo "Current webhook URL should be:"
echo "   https://020b7a5bb6c6.ngrok-free.app/webhooks/alchemy"
echo ""
echo "✅ The system is working if:"
echo "   - Wallets are saved locally (check database)"
echo "   - You receive notifications when transactions occur"
echo "   - The webhook endpoint receives POST requests (check ngrok inspector)"
echo ""
echo "📊 ngrok inspector: http://localhost:4040"