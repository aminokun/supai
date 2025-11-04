#!/bin/bash

# K6 Load Testing Runner Script
# Usage: ./run-tests.sh

set -e

BASE_URL="${BASE_URL:-http://localhost:8080}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_header() {
  echo -e "${BLUE}==================================${NC}"
  echo -e "${BLUE}$1${NC}"
  echo -e "${BLUE}==================================${NC}"
}

print_success() {
  echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
  echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
  echo -e "${RED}✗ $1${NC}"
}

check_k6() {
  if ! command -v k6 &> /dev/null; then
    print_error "K6 is not installed!"
    echo "Install K6 from: https://k6.io/docs/getting-started/installation"
    exit 1
  fi
  print_success "K6 is installed ($(k6 --version))"
}

check_service() {
  print_warning "Checking if auth service is running at $BASE_URL..."

  if curl -s -f "$BASE_URL/health" > /dev/null 2>&1; then
    print_success "Auth service is running!"
  else
    print_error "Auth service is NOT running at $BASE_URL"
    echo "Start the auth service:"
    echo "  cd services/auth && npm run dev"
    exit 1
  fi
}

run_load_test() {
  print_header "Running Load Test (Standard Load)"
  echo "This test ramps up gradually to 100 concurrent users."
  echo "Expected duration: ~8 minutes"
  echo ""

  k6 run \
    --env BASE_URL="$BASE_URL" \
    "$(dirname "$0")/auth-service-load-test.js"
}


# Main script
check_k6
echo ""
check_service
echo ""
run_load_test
echo ""
print_success "Load test completed!"
