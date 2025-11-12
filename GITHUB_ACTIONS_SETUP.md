# GitHub Actions Setup Guide for Capawesome Live Update

## Overview
This guide will help you set up GitHub Actions to automatically deploy your app updates to Capawesome Cloud whenever you push code.

## Prerequisites
1. A Capawesome Cloud account
2. A GitHub repository
3. Your Capawesome app ID and API token

## Step 1: Get Your Credentials from Capawesome Cloud

### App ID
1. Go to [Capawesome Console](https://console.capawesome.io)
2. Log in with your account
3. Navigate to your application
4. Copy your **App ID** from the dashboard

### API Token
1. In Capawesome Console, go to your **Account Settings** or **API Keys** section
2. Generate a new API token or copy your existing one
3. Store this token securely (you'll need it in the next step)

## Step 2: Add Secrets to GitHub

GitHub secrets are encrypted environment variables that can be used in your workflows.

### Add CAPAWESOME_APP_ID Secret:
1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. **Name**: `CAPAWESOME_APP_ID`
5. **Value**: Paste your Capawesome App ID
6. Click **Add secret**

### Add CAPAWESOME_API_TOKEN Secret:
1. Click **New repository secret** again
2. **Name**: `CAPAWESOME_API_TOKEN`
3. **Value**: Paste your Capawesome API token
4. Click **Add secret**

## Step 3: Configure the Workflow (Optional)

The workflow file is already set up at `.github/workflows/deploy-live-update.yml`

### Default Configuration:
- **Triggers on**: Push to `main` or `develop` branches
- **Channel**: Uses `dev-1` by default (configurable via GitHub Variables)
- **Path**: Deploys the `dist` folder (your Vite build output)

### Customize the Channel

To use different channels for different branches:

1. Go to **Settings** → **Secrets and variables** → **Variables**
2. Click **New repository variable**
3. **Name**: `LIVE_UPDATE_CHANNEL`
4. **Value**: Your desired channel (e.g., `production`, `staging`, `dev-1`)
5. Click **Add variable**

Or you can hardcode the channel in the workflow file:
```yaml
channel: 'dev-1'  # Change 'dev-1' to your desired channel
```

## Step 4: Test the Workflow

### Method 1: Automatic (Recommended)
1. Make a commit and push to `main` or `develop`
2. Go to your GitHub repository's **Actions** tab
3. Watch the workflow run
4. Check Capawesome Console to see the deployed bundle

### Method 2: Manual Trigger
1. Go to **Actions** tab in your repository
2. Select **Deploy Live Update** workflow
3. Click **Run workflow**
4. Select your branch and click **Run workflow**

## Understanding the Workflow File

```yaml
on:
  push:
    branches:
      - main
      - develop
  workflow_dispatch:  # Allows manual trigger
```
- **push**: Automatically deploys when you push to main or develop
- **workflow_dispatch**: Allows manual triggering from the Actions tab

## Troubleshooting

### Build Fails
- Make sure you have `npm ci` to install dependencies
- Check that your `package.json` has the build script: `"build": "tsc -b && vite build"`

### Deployment Fails
- Verify your `CAPAWESOME_APP_ID` secret is correct
- Verify your `CAPAWESOME_API_TOKEN` secret is correct
- Check that the `dist` folder is created after build
- Ensure your channel name matches one in Capawesome Console

### Workflow Not Triggering
- Workflow file must be in the `.github/workflows/` folder
- Check that you're pushing to `main` or `develop` branch
- Repository might need to be public or you need to enable Actions

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `appId` | Yes | Your Capawesome Cloud app ID |
| `token` | Yes | Your Capawesome Cloud API token |
| `channel` | Yes | The channel to deploy to (e.g., 'dev-1', 'production') |
| `path` | Yes | Path to your build output (usually `dist`) |
| `commitMessage` | No | Commit message for tracking |
| `commitRef` | No | Git reference (branch name) |
| `commitSha` | No | Commit SHA for tracking |

## Next Steps

1. **Set up environment variables** in your app to support the versioning used in `main.tsx`:
   - Add `VITE_LIVE_UPDATE_APP_ID` to your `.env` file

2. **Test locally** by running:
   ```bash
   npm run build
   ```
   This creates the `dist` folder that will be deployed.

3. **Monitor deployments** in Capawesome Console to see your bundles being deployed.

4. **Version your updates** by using different channels (e.g., `dev-1`, `staging`, `production`).

## Security Best Practices

1. ✅ Never commit secrets to your repository
2. ✅ Use GitHub Secrets for sensitive data
3. ✅ Rotate your API tokens periodically
4. ✅ Use branch protection rules before deploying to production
5. ✅ Consider adding approval steps for production deployments

## Additional Resources

- [Capawesome Cloud Documentation](https://capawesome.io)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Secrets Guide](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
