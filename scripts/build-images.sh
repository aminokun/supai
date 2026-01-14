#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}  Supai Docker Image Build Script${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""

# Use Minikube's Docker daemon
echo -e "${YELLOW}Setting up Minikube Docker environment...${NC}"
eval $(minikube docker-env)
echo -e "${GREEN}✓ Using Minikube Docker daemon${NC}"
echo ""

# Build images
declare -A images=(
    ["traefik"]="api-gateway"
    ["services/auth"]="auth-service"
    ["services/user"]="user-service"
    ["services/wallet-tracking"]="wallet-tracking-service"
    ["services/notification"]="notification-service"
    ["services/telegram-bot"]="telegram-bot"
    ["frontend/supai"]="frontend"
)

for dir in "${!images[@]}"; do
    image_name="supai/${images[$dir]}:latest"
    echo -e "${YELLOW}Building ${images[$dir]}...${NC}"
    docker build -t ${image_name} ${dir}
    echo -e "${GREEN}✓ Built ${image_name}${NC}"
    echo ""
done

echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}  All images built successfully!${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""
echo "Built images:"
docker images | grep supai
