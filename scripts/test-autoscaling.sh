#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}  Supai Autoscaling Test Script${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""

# Get API Gateway URL
echo -e "${YELLOW}Getting API Gateway URL...${NC}"
API_URL=$(minikube service api-gateway -n supai --url)
echo -e "${GREEN}API Gateway: ${API_URL}${NC}"
echo ""

# Check initial pod count
echo -e "${YELLOW}Initial pod status:${NC}"
kubectl get pods -n supai
echo ""
echo -e "${YELLOW}Initial HPA status:${NC}"
kubectl get hpa -n supai
echo ""

# Function to generate load
generate_load() {
    local duration=$1
    local concurrency=$2
    local requests=$3

    echo -e "${CYAN}Generating load: ${requests} requests with ${concurrency} concurrent connections for ${duration}s...${NC}"

    # Use hey for load testing (install with: brew install hey)
    if command -v hey &> /dev/null; then
        hey -n ${requests} -c ${concurrency} -m GET -t ${duration}s ${API_URL}/health || true
    elif command -v wrk &> /dev/null; then
        wrk -t${concurrency} -c${concurrency} -d${duration}s ${API_URL}/health || true
    elif command -v ab &> /dev/null; then
        ab -n ${requests} -c ${concurrency} ${API_URL}/health || true
    else
        # Fallback to curl loop
        echo -e "${YELLOW}hey/wrk/ab not found. Using curl loop...${NC}"
        for i in $(seq 1 ${requests}); do
            curl -s ${API_URL}/health > /dev/null &
            if [ $((i % 100)) -eq 0 ]; then
                wait
            fi
        done
        wait
    fi
}

# Start watching HPA in background
echo -e "${YELLOW}Starting HPA monitor (background)...${NC}"
(
    while true; do
        clear
        echo -e "${CYAN}=== HPA Status ===${NC}"
        kubectl get hpa -n supai
        echo ""
        echo -e "${CYAN}=== Pod Status ===${NC}"
        kubectl get pods -n supai
        echo ""
        sleep 2
    done
) &
HPA_MONITOR_PID=$!

# Trap to kill background process on exit
trap "kill ${HPA_MONITOR_PID} 2>/dev/null || true" EXIT

# Generate increasing load
echo -e "${YELLOW}Phase 1: Light load (should trigger some scaling)...${NC}"
generate_load 30 10 1000

sleep 5

echo -e "${YELLOW}Phase 2: Medium load (should trigger more scaling)...${NC}"
generate_load 30 25 2500

sleep 5

echo -e "${YELLOW}Phase 3: Heavy load (should trigger max scaling)...${NC}"
generate_load 45 50 5000

# Let HPA stabilize
echo ""
echo -e "${YELLOW}Waiting for HPA to stabilize...${NC}"
sleep 30

# Show final status
echo ""
echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}  Final Status${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""
echo -e "${CYAN}HPA Status:${NC}"
kubectl get hpa -n supai
echo ""
echo -e "${CYAN}Pod Status:${NC}"
kubectl get pods -n supai
echo ""
echo -e "${CYAN}Resource Usage:${NC}"
kubectl top pods -n supai || echo "Metrics not available yet"
echo ""

echo -e "${GREEN}Test complete! Press Ctrl+C to exit or wait for autoscaling to stabilize...${NC}"
wait
