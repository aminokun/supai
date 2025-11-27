# SonarCloud Quick Start for Supai

Your project is **ready for SonarCloud**! Here's what to do:

## ✅ Already Configured

- Organization: `aminokun`
- Project Key: `aminokun_supai`
- All service vitest configs updated with coverage
- GitHub Actions workflow ready

## 🚀 3 Steps to Enable

### 1. Get SonarCloud Token

1. Go to https://sonarcloud.io/account/security
2. Generate new token: "GitHub Actions"
3. Copy the token

### 2. Add GitHub Secrets

Go to: https://github.com/aminokun/supai/settings/secrets/actions

Add these 3 secrets:

| Secret Name | Value |
|------------|-------|
| `SONAR_TOKEN` | *your token from step 1* |
| `SONAR_ORGANIZATION` | `aminokun` |
| `SONAR_PROJECT_KEY` | `aminokun_supai` |

### 3. Push Code

```bash
git add .
git commit -m "Add SonarCloud integration"
git push
```

## 📊 View Results

After pushing, check:
- GitHub Actions tab for the workflow run
- https://sonarcloud.io/summary/new_code?id=aminokun_supai for results

## 🏷️ Add Badges

Copy from `BADGES.md` and paste into your README.md:

```markdown
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=aminokun_supai&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=aminokun_supai)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=aminokun_supai&metric=coverage)](https://sonarcloud.io/summary/new_code?id=aminokun_supai)
```

## 🧪 Test Locally (Optional)

```bash
./scripts/test-coverage.sh
```

That's it! Your code quality metrics will be visible on SonarCloud after the first push.
