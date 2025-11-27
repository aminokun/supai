#!/bin/bash

echo "🧪 Running tests with coverage for all services..."
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Track results
TOTAL_SERVICES=0
PASSED_SERVICES=0
FAILED_SERVICES=0

# Services to test
SERVICES=(
  "auth"
  "user"
  "wallet-tracking"
  "notification"
  "asset-price"
  "portfolio"
)

for service in "${SERVICES[@]}"; do
  TOTAL_SERVICES=$((TOTAL_SERVICES + 1))

  if [ -f "services/$service/package.json" ]; then
    echo -e "${YELLOW}Testing $service...${NC}"

    if (cd "services/$service" && npm test -- --coverage --run 2>&1); then
      echo -e "${GREEN}✓ $service tests passed${NC}"
      PASSED_SERVICES=$((PASSED_SERVICES + 1))

      # Show coverage summary if available
      if [ -f "services/$service/coverage/coverage-summary.json" ]; then
        echo "Coverage report: services/$service/coverage/index.html"
      fi
    else
      echo -e "${RED}✗ $service tests failed${NC}"
      FAILED_SERVICES=$((FAILED_SERVICES + 1))
    fi

    echo ""
  else
    echo -e "${YELLOW}⊘ Skipping $service (no package.json)${NC}"
    echo ""
  fi
done

# Summary
echo "=================================================="
echo "📊 Test Summary"
echo "=================================================="
echo -e "Total services:  $TOTAL_SERVICES"
echo -e "${GREEN}Passed:          $PASSED_SERVICES${NC}"
if [ $FAILED_SERVICES -gt 0 ]; then
  echo -e "${RED}Failed:          $FAILED_SERVICES${NC}"
else
  echo -e "Failed:          $FAILED_SERVICES"
fi
echo ""

# Coverage reports
echo "📁 Coverage Reports:"
for service in "${SERVICES[@]}"; do
  if [ -f "services/$service/coverage/index.html" ]; then
    echo "  • services/$service/coverage/index.html"
  fi
done

echo ""
echo "💡 Tip: Open coverage/index.html files in your browser to view detailed coverage reports"
