#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}  Supai Kubernetes Deployment Script${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""

# Check if Minikube is running
echo -e "${YELLOW}Checking Minikube status...${NC}"
if ! minikube status &>/dev/null; then
    echo -e "${RED}Minikube is not running. Please start it with:${NC}"
    echo "  minikube start --cpus=4 --memory=8192 --driver=docker"
    echo "  minikube addons enable metrics-server"
    exit 1
fi
echo -e "${GREEN}Minikube is running${NC}"
echo ""

# Verify metrics-server
echo -e "${YELLOW}Verifying metrics-server...${NC}"
if ! kubectl get pods -n kube-system | grep -q metrics-server; then
    echo -e "${RED}metrics-server not found. Enabling...${NC}"
    minikube addons enable metrics-server
    sleep 10
fi
echo -e "${GREEN}metrics-server is running${NC}"
echo ""

# Function to apply k8s manifests
apply_manifests() {
    local dir=$1
    local description=$2

    echo -e "${YELLOW}Applying ${description}...${NC}"
    if [ -d "$dir" ]; then
        for yaml in $(find "$dir" -name "*.yaml" | sort); do
            echo "  Applying $yaml"
            kubectl apply -f "$yaml"
        done
    else
        echo -e "${RED}Directory $dir not found${NC}"
        return 1
    fi
    echo -e "${GREEN}✓ ${description} applied${NC}"
    echo ""
}

# 1. Create namespace
echo -e "${YELLOW}Step 1: Creating namespace...${NC}"
kubectl apply -f k8s/namespace.yaml
echo -e "${GREEN}✓ Namespace created${NC}"
echo ""

# 2. Deploy infrastructure
apply_manifests "k8s/infrastructure" "Infrastructure (RabbitMQ, Redis)"

# 3. Wait for infrastructure to be ready
echo -e "${YELLOW}Waiting for infrastructure pods to be ready...${NC}"
kubectl wait --for=condition=ready pod -l app=rabbitmq -n supai --timeout=120s || true
kubectl wait --for=condition=ready pod -l app=redis -n supai --timeout=60s || true
echo -e "${GREEN}✓ Infrastructure ready${NC}"
echo ""

# 4. Deploy microservices
apply_manifests "k8s/services/auth-service" "Auth Service"
apply_manifests "k8s/services/user-service" "User Service"
apply_manifests "k8s/services/wallet-tracking-service" "Wallet-tracking Service"
apply_manifests "k8s/services/notification-service" "Notification Service"
apply_manifests "k8s/services/telegram-bot" "Telegram Bot"
apply_manifests "k8s/services/api-gateway" "API Gateway"

# 5. Wait for services to be ready
echo -e "${YELLOW}Waiting for microservices to be ready...${NC}"
kubectl wait --for=condition=available deployment/auth-service -n supai --timeout=120s || true
kubectl wait --for=condition=available deployment/user-service -n supai --timeout=120s || true
kubectl wait --for=condition=available deployment/wallet-tracking-service -n supai --timeout=120s || true
kubectl wait --for=condition=available deployment/notification-service -n supai --timeout=120s || true
kubectl wait --for=condition=available deployment/telegram-bot -n supai --timeout=120s || true
kubectl wait --for=condition=available deployment/api-gateway -n supai --timeout=120s || true
echo -e "${GREEN}✓ Microservices ready${NC}"
echo ""

# 6. Deploy monitoring
apply_manifests "k8s/monitoring/prometheus" "Prometheus"
apply_manifests "k8s/monitoring/grafana" "Grafana"

# 7. Wait for monitoring
echo -e "${YELLOW}Waiting for monitoring to be ready...${NC}"
kubectl wait --for=condition=available deployment/prometheus -n supai --timeout=120s || true
kubectl wait --for=condition=available deployment/grafana -n supai --timeout=120s || true
echo -e "${GREEN}✓ Monitoring ready${NC}"
echo ""

# 8. Deploy frontend
apply_manifests "k8s/frontend" "Frontend"

# 9. Wait for frontend
echo -e "${YELLOW}Waiting for frontend to be ready...${NC}"
kubectl wait --for=condition=available deployment/frontend -n supai --timeout=180s || true
echo -e "${GREEN}✓ Frontend ready${NC}"
echo ""

# Summary
echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}  Deployment Complete!${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""
echo "To access services:"
echo ""
echo "Frontend:"
minikube service frontend -n supai --url
echo ""
echo "API Gateway:"
minikube service api-gateway -n supai --url
echo ""
echo "Prometheus:"
minikube service prometheus -n supai --url
echo ""
echo "Grafana:"
minikube service grafana -n supai --url
echo ""
echo -e "${YELLOW}To check pod status:${NC}"
echo "  kubectl get pods -n supai"
echo ""
echo -e "${YELLOW}To check HPA status:${NC}"
echo "  kubectl get hpa -n supai"
echo ""
echo -e "${YELLOW}To watch pods scale:${NC}"
echo "  kubectl get pods -n supai -w"
echo ""
echo -e "${YELLOW}To check resource usage:${NC}"
echo "  kubectl top pods -n supai"
echo ""
