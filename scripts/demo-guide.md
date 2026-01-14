# Kubernetes Autoscaling Demo Guide for School Project

## Prerequisites
- Minikube is running with all services deployed
- Terminal open with kubectl configured
- Browser open for Grafana/Prometheus
- Screenshot tool ready

---

## Part 1: Baseline Performance (No Autoscaling)

### Step 1: Disable HPA and Set Fixed Replicas
```bash
# Disable HPA temporarily
kubectl delete hpa api-gateway-hpa -n supai

# Set to 2 replicas (fixed)
kubectl scale deployment api-gateway --replicas=2 -n supai
```

**Screenshot 1:** Show that HPA is deleted and we have fixed replicas
```bash
kubectl get hpa -n supai
kubectl get pods -n supai | grep api-gateway
```

### Step 2: Open Monitoring Dashboards
```bash
# Open Prometheus in browser
minikube service prometheus -n supai --url
# Screenshot 2: Prometheus UI showing 2 targets for api-gateway

# Open Grafana
minikube service grafana -n supai --url
# Login: admin/admin
# Screenshot 3: Grafana dashboard showing 2 pods
```

### Step 3: Generate Load
```bash
# In one terminal, start monitoring
watch -n 1 'kubectl top pods -n supai | grep api-gateway'

# In another terminal, generate load
API_URL=$(minikube service api-gateway -n supai --url)
hey -n 50000 -c 50 $API_URL/health
```

**Screenshot 4:** Hey output showing request statistics (50,000 requests, ~7500 req/sec)

**Screenshot 5:** Terminal showing pod resource usage (high CPU/memory under load)

**Screenshot 6:** Prometheus metrics showing high request rate

### Step 4: Show Latency Degradation
```bash
# Run a more intensive load test
hey -n 100000 -c 100 $API_URL/health
```

**Screenshot 7:** Note the increased latency in hey output (slowest requests, P95, P99)

---

## Part 2: Autoscaling Performance (With HPA)

### Step 5: Re-enable HPA with Low Threshold
```bash
# Create HPA with low memory threshold (easy to trigger)
cat <<EOF | kubectl apply -n supai -f -
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-gateway-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api-gateway
  minReplicas: 2
  maxReplicas: 8
  metrics:
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 20
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
      - type: Percent
        value: 100
        periodSeconds: 15
    scaleDown:
      stabilizationWindowSeconds: 60
      policies:
      - type: Percent
        value: 50
        periodSeconds: 30
EOF
```

**Screenshot 8:** HPA created with configuration (min=2, max=8, target=20%)

```bash
# Verify HPA
kubectl get hpa -n supai
kubectl describe hpa api-gateway-hpa -n supai
```

**Screenshot 9:** HPA details showing min/max replicas and target

### Step 6: Reduce Memory Request (Make Scaling Easier)
```bash
# Patch deployment with lower memory request
kubectl patch deployment api-gateway -n supai --type=json -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/resources/requests/memory", "value":"48Mi"}]'
```

### Step 7: Watch Autoscaling in Action

**Terminal 1 - Watch HPA and Pods:**
```bash
watch -n 2 'echo "=== HPA Status ===" && kubectl get hpa -n supai | grep api-gateway && echo "" && echo "=== Pods ===" && kubectl get pods -n supai | grep api-gateway'
```

**Terminal 2 - Watch Resource Usage:**
```bash
watch -n 1 'kubectl top pods -n supai | grep api-gateway'
```

**Terminal 3 - Generate Increasing Load:**
```bash
API_URL=$(minikube service api-gateway -n supai --url)

# Phase 1: Light load (2 pods should handle)
echo "Phase 1: Light load..."
hey -n 10000 -c 20 $API_URL/health

# Phase 2: Medium load (should trigger scaling to 4)
echo "Phase 2: Medium load..."
hey -n 20000 -c 50 $API_URL/health

# Phase 3: Heavy load (should scale to 6-8)
echo "Phase 3: Heavy load..."
hey -n 50000 -c 100 $API_URL/health
```

**Screenshot 10:** Terminal showing pods scaling from 2 → 4 → 6

**Screenshot 11:** HPA output showing REPLICAS column increasing (2 → 4 → 6)

**Screenshot 12:** Resource usage across more pods (load distributed)

### Step 8: Show Scale-Down After Load
```bash
# Stop load and watch pods scale down
watch -n 2 'kubectl get pods -n supai | grep api-gateway'
```

Wait 2-3 minutes for the stabilization window.

**Screenshot 13:** Pods scaling back down (6 → 4 → 2)

---

## Part 3: Comparison Screenshots for Documentation

### Screenshot 14: Performance Comparison Table
Create a table in your document:

| Metric | No Autoscaling | With Autoscaling |
|--------|----------------|------------------|
| Max Replicas | 2 (fixed) | 8 (scaled up) |
| P95 Latency | [from Screenshot 7] | [from Screenshot 11-12] |
| Throughput | ~7500 req/sec | ~7500 req/sec per pod |
| Resource Usage | High per pod | Distributed across pods |
| Availability | Degraded under load | Maintained |

### Screenshot 15: Grafana Comparison
- Show request rate graph for both scenarios
- Show latency comparison
- Show pod count over time

---

## Part 4: Key Explanations for Teacher

### What to Say During Demo:

**Introduction:**
"Today I'm demonstrating Kubernetes Horizontal Pod Autoscaling for my microservices application. I'll show how the system responds differently to load with and without autoscaling enabled."

**Part 1 (No Autoscaling):**
"First, I've disabled the HPA and fixed the replica count at 2. Watch what happens when I generate 50,000 requests - the pods get overwhelmed, latency increases, and there's no way to handle the additional load."

**Part 2 (With Autoscaling):**
"Now I've re-enabled the HPA with a minimum of 2 and maximum of 8 replicas. When I generate the same load, watch how Kubernetes automatically detects the resource pressure and spins up more pods to distribute the load."

**Part 3 (Results):**
"Here you can see the comparison:
- Without autoscaling: Fixed 2 pods, higher latency per pod
- With autoscaling: Scaled to 6-8 pods, lower latency per pod, better availability
- After load: Pods automatically scaled back down to save resources"

**Technical Points to Mention:**
1. **Metrics Server**: Collects CPU/memory metrics from pods
2. **HPA Controller**: Continuously checks metrics against target
3. **Scaling Behavior**: Configurable stabilization windows prevent thrashing
4. **Resource Efficiency**: Scale down when load decreases

---

## Quick Reference Commands

```bash
# Get all pod statuses
kubectl get pods -n supai

# Get HPA status
kubectl get hpa -n supai

# Watch resource usage
kubectl top pods -n supai

# Describe HPA (detailed info)
kubectl describe hpa api-gateway-hpa -n supai

# Get service URL
minikube service api-gateway -n supai --url

# Manual scale (for comparison)
kubectl scale deployment api-gateway --replicas=N -n supai

# Delete HPA
kubectl delete hpa api-gateway-hpa -n supai

# Get logs from a pod
kubectl logs <pod-name> -n supai
```

---

## Screenshot Checklist

Print this and check off as you go:

**Part 1: No Autoscaling**
- [ ] S1: HPA deleted, fixed 2 replicas
- [ ] S2: Prometheus showing 2 targets
- [ ] S3: Grafana dashboard with 2 pods
- [ ] S4: Hey output (50K requests)
- [ ] S5: Pod resource usage (high)
- [ ] S6: Prometheus metrics
- [ ] S7: Latency degradation

**Part 2: With Autoscaling**
- [ ] S8: HPA configuration
- [ ] S9: HPA details (min/max/target)
- [ ] S10: Pods scaling up (2→4→6)
- [ ] S11: HPA REPLICAS column
- [ ] S12: Distributed resource usage
- [ ] S13: Pods scaling down

**Part 3: Comparison**
- [ ] S14: Performance comparison table
- [ ] S15: Grafana comparison graphs

---

## Troubleshooting

**If HPA shows `<unknown>` for metrics:**
```bash
# Wait a bit longer for metrics-server
kubectl top pods -n supai

# Check metrics-server is running
kubectl get pods -n kube-system | grep metrics
```

**If pods aren't scaling:**
```bash
# Check HPA events
kubectl describe hpa api-gateway-hpa -n supai

# Lower the threshold further
kubectl patch hpa api-gateway-hpa -n supai -p '{"spec":{"metrics":[{"type":"Resource","resource":{"name":"memory","target":{"type":"Utilization","averageUtilization":15}}}]}}'
```

**If load test finishes too fast:**
- Increase request count: `-n 100000`
- Increase concurrency: `-c 150`
- Run multiple hey commands in parallel

