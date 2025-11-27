#!/bin/bash

# Test Alchemy API endpoints
ALCHEMY_AUTH_TOKEN="MeUyrthPQP8PI6SHT4lwtp_OHpbqbhFy"
WEBHOOK_ID="wh_yxg2izkjty3odk2g"
TEST_ADDRESS="0x742d35cc6634c0532925a3b844bc9e7595f0beb5"

echo "🔍 Testing Alchemy Notify API..."
echo ""

# Try to update webhook addresses using the Notify API
echo "📡 Attempting to add address to webhook..."

# Using Alchemy Notify API v2 endpoint
curl -X PATCH \
  "https://dashboard.alchemyapi.io/api/update-webhook-addresses" \
  -H "X-Alchemy-Token: ${ALCHEMY_AUTH_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "webhook_id": "'${WEBHOOK_ID}'",
    "addresses_to_add": ["'${TEST_ADDRESS}'"],
    "addresses_to_remove": []
  }' \
  -w "\nHTTP Status: %{http_code}\n"

echo ""
echo "If this fails, try updating addresses manually in Alchemy Dashboard"