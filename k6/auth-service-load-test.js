import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Rate, Trend, Counter, Gauge } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const successRate = new Rate('success');
const healthCheckDuration = new Trend('health_check_duration');
const signupDuration = new Trend('signup_duration');
const signinDuration = new Trend('signin_duration');
const requestCount = new Counter('requests_total');

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 50 },
    { duration: '2m', target: 100 },
    { duration: '3m', target: 100 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    'http_req_failed': ['rate<0.01'],
    'http_req_duration': ['p(95)<500'],
    'http_req_duration': ['p(99)<1000'],
    'signup_duration': ['p(95)<1000'],
    'signin_duration': ['p(95)<800'],
    'errors': ['rate<0.01'],
    'success': ['rate>0.99'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080';

function generateUser() {
  const timestamp = Date.now();
  return {
    email: `testuser${timestamp}${Math.random().toString(36).substr(2, 9)}@loadtest.com`,
    password: 'TestPassword123!@#',
    name: `Test User ${timestamp}`,
  };
}

export default function () {
  group('Health Check', function () {
    const healthCheckStart = Date.now();
    const res = http.get(`${BASE_URL}/health`);
    const duration = Date.now() - healthCheckStart;

    healthCheckDuration.add(duration);
    requestCount.add(1);

    const isSuccess = check(res, {
      'health check status is 200': (r) => r.status === 200,
      'health check response has status ok': (r) => r.json('status') === 'ok',
    });

    if (isSuccess) {
      successRate.add(1);
    } else {
      errorRate.add(1);
    }
  });

  sleep(1);

  group('Authentication Flow', function () {
    const user = generateUser();

    group('Signup', function () {
      const signupStart = Date.now();
      const signupRes = http.post(`${BASE_URL}/api/auth/signup`, JSON.stringify({
        email: user.email,
        password: user.password,
        name: user.name,
      }), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const signupDurationMs = Date.now() - signupStart;

      signupDuration.add(signupDurationMs);
      requestCount.add(1);

      const isSignupSuccess = check(signupRes, {
        'signup status is 200 or 201': (r) => r.status === 200 || r.status === 201,
        'signup response has token or success message': (r) => {
          try {
            const json = r.json();
            return json.token || json.success || json.user;
          } catch {
            return false;
          }
        },
      });

      if (isSignupSuccess) {
        successRate.add(1);
      } else {
        errorRate.add(1);
      }
    });

    sleep(0.5);

    group('Signin', function () {
      const signinStart = Date.now();
      const signinRes = http.post(`${BASE_URL}/api/auth/signin`, JSON.stringify({
        email: user.email,
        password: user.password,
      }), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const signinDurationMs = Date.now() - signinStart;

      signinDuration.add(signinDurationMs);
      requestCount.add(1);

      const isSigninSuccess = check(signinRes, {
        'signin status is 200': (r) => r.status === 200,
        'signin response has token': (r) => {
          try {
            return r.json('token') !== undefined || r.json('access_token') !== undefined;
          } catch {
            return false;
          }
        },
      });

      if (isSigninSuccess) {
        successRate.add(1);
      } else {
        errorRate.add(1);
      }
    });

    sleep(1);
  });

  sleep(2);
}
