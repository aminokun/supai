# K6 Load Testing - Quick Start Guide

## Install K6

```bash
# macOS
brew install k6

# Verify installation
k6 --version
```

## Start Auth Service Locally

```bash
cd /Users/mino/Documents/Projects/supai/services/auth
npm run dev
```

This will start the auth service on `http://localhost:8080`

## Run Load Tests

Navigate to the k6 directory and run tests:

```bash
cd /Users/mino/Documents/Projects/supai/k6
```

### Option 1: Use the Helper Script (Easiest)

```bash
# Run just the load test
./run-tests.sh load

# Run stress test
./run-tests.sh stress

# Run spike test
./run-tests.sh spike

# Run all tests (takes ~35 minutes)
./run-tests.sh all
```

### Option 2: Run Tests Directly

```bash
# Load test (standard traffic patterns, 8 minutes)
k6 run auth-service-load-test.js

# Stress test (find breaking point, 15 minutes)
k6 run auth-service-stress-test.js

# Spike test (sudden traffic spikes, 8 minutes)
k6 run auth-service-spike-test.js
```

## What Each Test Does

### Load Test
- **Simulates**: Normal traffic patterns
- **Duration**: ~8 minutes
- **Users**: Ramps from 0 to 100 concurrent users
- **Endpoints tested**:
  - `GET /health` (health check)
  - `POST /auth/signup` (user registration)
  - `POST /auth/signin` (user login)
- **Success criteria**:
  - 95% of requests < 500ms
  - 99% of requests < 1000ms
  - Error rate < 1%

### Stress Test
- **Simulates**: Gradually increasing heavy load
- **Duration**: ~15 minutes
- **Users**: Ramps from 100 → 200 → 400 → 600 → 800 → 1000
- **Purpose**: Find where system starts to fail
- **Success criteria**:
  - 99% of requests < 5 seconds
  - Error rate < 5%

### Spike Test
- **Simulates**: Sudden traffic spikes
- **Duration**: ~8 minutes
- **Users**: Baseline 10, then spikes to 500, then 1000
- **Purpose**: Test recovery after sudden load
- **Success criteria**:
  - 95% of requests < 2 seconds during spikes
  - Error rate < 10%

## Example Output

```
     /\      |‾‾| /‾‾/‾‾/‾‾/‾‾/‾‾/‾‾/‾‾/‾‾/‾‾/‾‾/‾‾/‾‾/‾‾/‾‾/
    /  \     |  |/  /  /  /  /  /  /  /  /  /  /  /  /  /  /  /
   /    \    |     (  (  (  (  (  (  (  (  (  (  (  (  (  (  (
  /      \   |  |\ \  \  \  \  \  \  \  \  \  \  \  \  \  \  \
 /________\  |__| \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

  ✓ health_check_duration...: avg=12.34ms
  ✓ http_req_duration.......: avg=245.21ms p(95)=412.45ms p(99)=523.21ms
  ✓ http_req_failed.........: 0.00%
  ✓ requests_total..........: 2145
  ✓ signup_duration.........: avg=312.45ms p(95)=521.32ms
  ✓ signin_duration.........: avg=198.32ms p(95)=389.23ms
  ✓ success.................: 100.00%
  ✓ errors..................: 0.00%
```

## Interpreting Results

### Green Checkmark (✓)
Test **PASSED** - The metric met the threshold

### Red X (✗)
Test **FAILED** - The metric exceeded the threshold

### Key Metrics

| Metric | What It Means | Good Value |
|--------|---------------|-----------|
| `http_req_duration` | Time per request | p(95) < 500ms |
| `http_req_failed` | % of failed requests | < 1% |
| `p(95)` | 95% of requests faster than this | < 500ms |
| `p(99)` | 99% of requests faster than this | < 1000ms |
| `requests_total` | Total requests made | Varies |
| `success` | % successful requests | > 99% |

## Running Against Remote Server

```bash
# Test against your Coolify deployment
BASE_URL=http://your-domain:3001 k6 run auth-service-load-test.js

# Or with the script
BASE_URL=http://your-domain:3001 ./run-tests.sh load
```

## Common Issues

### "K6 is not installed"
```bash
brew install k6
```

### "Auth service is NOT running"
```bash
# Start the auth service
cd services/auth
npm run dev
```

### "Connection refused"
```bash
# Make sure auth service is on port 3001
curl http://localhost:3001/health

# If it responds, the service is running
# If not, check if the service is actually running
```

### Test fails with high error rate
1. Check auth service logs
2. Verify database is running: `docker-compose ps`
3. Check if signup/signin endpoints are implemented
4. Check environment variables

## Next Steps

1. **Run load test**: `./run-tests.sh load`
2. **Review results**: Check if all metrics have ✓
3. **If tests fail**:
   - Review auth service logs
   - Check database status
   - Implement missing endpoints
4. **Re-run**: Verify improvements
5. **Run stress test**: `./run-tests.sh stress` (optional, for deeper analysis)

## Useful K6 Commands

```bash
# Run with verbose output
k6 run -v auth-service-load-test.js

# Run and output to JSON for analysis
k6 run --out json=results.json auth-service-load-test.js

# Run with custom environment variable
k6 run --env BASE_URL=http://custom:3001 auth-service-load-test.js

# Run only up to a certain stage
k6 run --stage "ramp-up:30s:10" auth-service-load-test.js

# Run with specific number of iterations instead of duration
k6 run --iterations 100 auth-service-load-test.js
```

## More Information

- Full documentation: `/Users/mino/Documents/Projects/supai/k6/README.md`
- K6 official docs: https://k6.io/docs
- View all tests: `/Users/mino/Documents/Projects/supai/k6/`

---

**Ready to test?** Run: `./run-tests.sh load`
