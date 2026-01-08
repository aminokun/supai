import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const successRate = new Rate('success');
const sequentialFetchDuration = new Trend('sequential_fetch_duration');
const batchFetchDuration = new Trend('batch_fetch_duration');
const singleUserFetchDuration = new Trend('single_user_fetch_duration');
const requestCount = new Counter('requests_total');

export const options = {
  scenarios: {
    // Scenario 1: Baseline - Sequential fetches (N+1 pattern)
    baseline: {
      executor: 'ramping-vus',
      startVUs: 1,
      stages: [
        { duration: '30s', target: 10 },
        { duration: '1m', target: 25 },
        { duration: '1m', target: 50 },
        { duration: '30s', target: 10 },
      ],
      env: { MODE: 'sequential' },
      tags: { scenario: 'baseline' },
    },
    // Scenario 2: Optimized - Batch fetch
    optimized: {
      executor: 'ramping-vus',
      startVUs: 1,
      stages: [
        { duration: '30s', target: 10 },
        { duration: '1m', target: 25 },
        { duration: '1m', target: 50 },
        { duration: '30s', target: 10 },
      ],
      env: { MODE: 'batch' },
      tags: { scenario: 'optimized' },
      startTime: '3m30s', // Start after baseline completes
    },
  },
  thresholds: {
    // Baseline thresholds (current N+1 pattern)
    'sequential_fetch_duration{scenario:baseline}': ['p(95)<3000'],
    // Optimized thresholds (batch pattern - should be much faster)
    'batch_fetch_duration{scenario:optimized}': ['p(95)<500'],
    'errors': ['rate<0.05'],
    'success': ['rate>0.95'],
  },
};

const BASE_URL = __ENV.USER_SERVICE_URL || 'http://localhost:3007';

// Test user IDs - these should exist in the database
// In a real test, seed these users first using seed-test-users.js
const TEST_USER_IDS = __ENV.USER_IDS
  ? __ENV.USER_IDS.split(',')
  : [
    'test-user-001',
    'test-user-002',
    'test-user-003',
    'test-user-004',
    'test-user-005',
    'test-user-006',
    'test-user-007',
    'test-user-008',
    'test-user-009',
    'test-user-010',
  ];

// Simulate different user counts to show N+1 scaling problem
const USER_COUNTS = [5, 10, 15, 20];

export default function () {
  const mode = __ENV.MODE || 'sequential';
  const userCount = USER_COUNTS[Math.floor(Math.random() * USER_COUNTS.length)];
  const userIds = TEST_USER_IDS.slice(0, userCount);

  if (mode === 'sequential') {
    group('Sequential Fetch (N+1 Pattern)', function () {
      const start = Date.now();
      let allSuccess = true;

      // Simulate the current N+1 pattern in notification service
      for (const userId of userIds) {
        const singleStart = Date.now();
        const res = http.get(`${BASE_URL}/api/users/${userId}`);
        singleUserFetchDuration.add(Date.now() - singleStart);
        requestCount.add(1);

        const isSuccess = check(res, {
          'single fetch status is 200 or 404': (r) => r.status === 200 || r.status === 404,
        });

        if (!isSuccess) {
          allSuccess = false;
        }
      }

      const totalDuration = Date.now() - start;
      sequentialFetchDuration.add(totalDuration);

      if (allSuccess) {
        successRate.add(1);
      } else {
        errorRate.add(1);
      }

      // Log for visibility during test
      if (__VU === 1 && __ITER % 10 === 0) {
        console.log(`[Sequential] ${userIds.length} users fetched in ${totalDuration}ms`);
      }
    });
  } else {
    group('Batch Fetch (Optimized)', function () {
      const start = Date.now();

      const res = http.post(
        `${BASE_URL}/api/users/batch`,
        JSON.stringify({ userIds }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const duration = Date.now() - start;
      batchFetchDuration.add(duration);
      requestCount.add(1);

      const isSuccess = check(res, {
        'batch fetch status is 200': (r) => r.status === 200,
        'batch returns users array': (r) => {
          try {
            const data = r.json();
            return data.users !== undefined && Array.isArray(data.users);
          } catch {
            return false;
          }
        },
        'batch returns count': (r) => {
          try {
            const data = r.json();
            return typeof data.count === 'number';
          } catch {
            return false;
          }
        },
      });

      if (isSuccess) {
        successRate.add(1);
      } else {
        errorRate.add(1);
      }

      // Log for visibility during test
      if (__VU === 1 && __ITER % 10 === 0) {
        console.log(`[Batch] ${userIds.length} users fetched in ${duration}ms`);
      }
    });
  }

  sleep(0.5);
}

// Summary handler to print comparison
export function handleSummary(data) {
  const baseline = data.metrics.sequential_fetch_duration;
  const optimized = data.metrics.batch_fetch_duration;

  let summary = '\n========================================\n';
  summary += '       LOAD TEST RESULTS SUMMARY       \n';
  summary += '========================================\n\n';

  if (baseline && baseline.values) {
    summary += 'BASELINE (Sequential N+1 Pattern):\n';
    summary += `  P50 Latency: ${baseline.values['p(50)']?.toFixed(2) || 'N/A'}ms\n`;
    summary += `  P95 Latency: ${baseline.values['p(95)']?.toFixed(2) || 'N/A'}ms\n`;
    summary += `  P99 Latency: ${baseline.values['p(99)']?.toFixed(2) || 'N/A'}ms\n`;
    summary += `  Max Latency: ${baseline.values['max']?.toFixed(2) || 'N/A'}ms\n\n`;
  }

  if (optimized && optimized.values) {
    summary += 'OPTIMIZED (Batch Pattern):\n';
    summary += `  P50 Latency: ${optimized.values['p(50)']?.toFixed(2) || 'N/A'}ms\n`;
    summary += `  P95 Latency: ${optimized.values['p(95)']?.toFixed(2) || 'N/A'}ms\n`;
    summary += `  P99 Latency: ${optimized.values['p(99)']?.toFixed(2) || 'N/A'}ms\n`;
    summary += `  Max Latency: ${optimized.values['max']?.toFixed(2) || 'N/A'}ms\n\n`;
  }

  if (baseline && optimized && baseline.values && optimized.values) {
    const baselineP95 = baseline.values['p(95)'] || 1;
    const optimizedP95 = optimized.values['p(95)'] || 1;
    const improvement = ((baselineP95 - optimizedP95) / baselineP95 * 100).toFixed(1);
    const speedup = (baselineP95 / optimizedP95).toFixed(1);

    summary += 'IMPROVEMENT:\n';
    summary += `  P95 Latency Reduction: ${improvement}%\n`;
    summary += `  Speed Improvement: ${speedup}x faster\n`;
  }

  summary += '\n========================================\n';

  console.log(summary);

  return {
    'stdout': summary,
    'results.json': JSON.stringify(data, null, 2),
  };
}
