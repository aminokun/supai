#!/bin/bash

# Alchemy webhook configuration
ALCHEMY_AUTH_TOKEN="MeUyrthPQP8PI6SHT4lwtp_OHpbqbhFy"
WEBHOOK_ID="wh_yxg2izkjty3odk2g"
NGROK_URL="https://020b7a5bb6c6.ngrok-free.app"

echo "🔍 Testing Alchemy webhook setup..."
echo ""
echo "📡 Your public webhook URL is:"
echo "   ${NGROK_URL}/webhooks/alchemy"
echo ""

# Test if our webhook endpoint is accessible
echo "🧪 Testing webhook endpoint..."
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" "${NGROK_URL}/health"

echo ""
echo "📋 To set up the webhook in Alchemy:"
echo "1. Go to https://dashboard.alchemy.com/"
echo "2. Navigate to your app: w19n9qvx2pr6u01x"
echo "3. Go to Webhooks section"
echo "4. Update or create a webhook with:"
echo "   - URL: ${NGROK_URL}/webhooks/alchemy"
echo "   - Type: Address Activity"
echo "   - Network: Ethereum Mainnet"
echo ""
echo "5. Add wallet addresses to track through the Alchemy dashboard"
echo ""
echo "🔑 Your webhook signing key (for verification):"
echo "   whsec_tE9CcC7raEk4tnmE4TtzMPEB"