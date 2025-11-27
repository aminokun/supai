#!/bin/bash

echo "🚀 Sending test transaction notification..."

# Sample successful transaction with string value
curl -X POST https://020b7a5bb6c6.ngrok-free.app/webhooks/alchemy \
  -H "Content-Type: application/json" \
  -H "x-alchemy-signature: test-signature" \
  -d '{
  "webhookId": "wh_yxg2izkjty3odk2g",
  "id": "test-success-001",
  "createdAt": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",
  "type": "ADDRESS_ACTIVITY",
  "event": {
    "network": "ETH_MAINNET",
    "activity": [{
      "fromAddress": "0x742d35cc6634c0532925a3b844bc9e7595f0beb5",
      "toAddress": "0x90ec1abe6b06b4ac171309e7f09b96252a258873",
      "blockNum": "0x999999",
      "hash": "0xtest-success-'$(date +%s)'",
      "value": "1.5",
      "asset": "ETH",
      "category": "external",
      "typeTraceAddress": null
    }]
  }
}'

echo ""
echo "✅ Test transaction sent! Check logs for processing."