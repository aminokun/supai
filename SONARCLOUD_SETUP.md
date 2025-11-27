# SonarCloud Setup Guide

This guide will help you set up SonarCloud for the Supai project to showcase code quality and coverage.

## Prerequisites

1. A SonarCloud account (sign up at https://sonarcloud.io)
2. Your GitHub repository connected to SonarCloud
3. Access to your GitHub repository settings

## Step 1: Create SonarCloud Project

1. Go to https://sonarcloud.io
2. Click "+" icon > "Analyze new project"
3. Select your GitHub repository
4. Note down your:
   - **Organization Key** (e.g., `your-github-username`)
   - **Project Key** (e.g., `your-github-username_supai`)

## Step 2: Configuration Already Set

Your `sonar-project.properties` is already configured with:

```properties
sonar.organization=aminokun
sonar.projectKey=aminokun_supai
```

✅ No changes needed!

## Step 3: Set Up GitHub Secrets

Go to your GitHub repository settings > Secrets and variables > Actions, and add:

1. **SONAR_TOKEN**
   - Get from SonarCloud: Account > Security > Generate Token
   - Give it a name like "GitHub Actions"
   - Copy the token

2. **SONAR_ORGANIZATION**
   - Value: `aminokun`

3. **SONAR_PROJECT_KEY**
   - Value: `aminokun_supai`

Optional (for additional coverage reporting):

4. **CODECOV_TOKEN** (if using Codecov)
   - Sign up at https://codecov.io
   - Add your repository
   - Copy the upload token

## Step 4: Trigger Analysis

The SonarCloud analysis will run automatically on:
- Push to `main` or `develop` branches
- Pull requests

To manually trigger:
```bash
git push origin your-branch
```

## Step 5: View Results

1. Go to https://sonarcloud.io
2. Find your project
3. View:
   - Code coverage percentage
   - Code smells
   - Bugs
   - Security vulnerabilities
   - Technical debt
   - Maintainability rating

## Running Tests Locally with Coverage

For individual services:
```bash
cd services/notification
npm test -- --coverage
```

For all services:
```bash
# Run tests for each service
for service in services/*/; do
  if [ -f "$service/package.json" ]; then
    echo "Testing $(basename $service)..."
    (cd "$service" && npm test -- --coverage)
  fi
done
```

## Coverage Reports Location

After running tests, coverage reports are generated at:
- `services/*/coverage/lcov.info` - LCOV format for SonarCloud
- `services/*/coverage/index.html` - HTML report for viewing locally

## Badges

Add these badges to your README.md:

```markdown
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=YOUR_PROJECT_KEY&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=YOUR_PROJECT_KEY)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=YOUR_PROJECT_KEY&metric=coverage)](https://sonarcloud.io/summary/new_code?id=YOUR_PROJECT_KEY)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=YOUR_PROJECT_KEY&metric=bugs)](https://sonarcloud.io/summary/new_code?id=YOUR_PROJECT_KEY)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=YOUR_PROJECT_KEY&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=YOUR_PROJECT_KEY)
```

Replace `YOUR_PROJECT_KEY` with your actual project key.

## Troubleshooting

### Analysis not running
- Check GitHub Actions tab for errors
- Verify SONAR_TOKEN is correct
- Ensure SonarCloud project is properly configured

### Coverage not showing
- Verify tests are running in CI
- Check that lcov.info files are being generated
- Ensure paths in sonar-project.properties match coverage file locations

### Low coverage
- Add more unit tests to your services
- Focus on testing core business logic
- Aim for at least 80% coverage for showcasing

## Adding Tests

Each service should have tests. Example structure:

```typescript
// services/notification/src/index.test.ts
import { describe, it, expect } from 'vitest';

describe('Notification Service', () => {
  it('should send notification', () => {
    // Test implementation
    expect(true).toBe(true);
  });
});
```

Run tests:
```bash
npm test
```

Run with coverage:
```bash
npm test -- --coverage
```
