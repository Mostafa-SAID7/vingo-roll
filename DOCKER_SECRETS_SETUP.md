# Docker Publishing Secrets Setup

## Quick Start

Your Docker publishing workflow is already configured. You just need to add GitHub secrets for it to work.

---

## Step-by-Step Setup

### 1. Create Docker Hub Access Token

1. Go to: **https://hub.docker.com/settings/security**
2. Click **"New Access Token"**
3. Name: `github-actions` (or your preference)
4. Permissions: Select **"Read & Write"**
5. Click **"Generate"**
6. **Copy the token** (you won't see it again)

### 2. Add GitHub Secrets

1. Go to your repo: **https://github.com/YOUR_ORG/vingo-roll-studio**
2. Settings → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**

#### Secret 1: DOCKER_USERNAME
- **Name**: `DOCKER_USERNAME`
- **Value**: Your Docker Hub username (e.g., `mohammedhossam`)
- Click **"Add secret"**

#### Secret 2: DOCKER_PASSWORD
- **Name**: `DOCKER_PASSWORD`
- **Value**: Paste the access token from Step 1
- Click **"Add secret"**

---

## Verify Setup

### Test on Next Push
```bash
# Make a small change
echo "# Updated" >> README.md

# Push to trigger workflow
git add .
git commit -m "test: verify docker publishing"
git push origin main
```

### Check GitHub Actions
1. Go to repo → **Actions** tab
2. Click **"Docker Publish"** workflow
3. Wait for build to complete

### Check Docker Hub
1. Go to: **https://hub.docker.com/r/YOUR_USERNAME**
2. Look for `vingo-roll-studio` repository
3. Check tags under "Tags" tab

### Check GHCR (GitHub Container Registry)
1. Go to repo → **Packages** (right sidebar)
2. Click the `vingo-roll-studio` package
3. Verify image exists

---

## What Happens After Setup

### On Every Push to Main
- Builds Docker image
- Tags as `latest`
- Publishes to:
  - Docker Hub: `docker.io/YOUR_USERNAME/vingo-roll-studio:latest`
  - GHCR: `ghcr.io/YOUR_ORG/vingo-roll-studio:latest`

### On Version Tags
```bash
git tag v1.9.3
git push --tags
```

Creates versioned images:
- `docker.io/YOUR_USERNAME/vingo-roll-studio:v1.9.3`
- `docker.io/YOUR_USERNAME/vingo-roll-studio:1.9`
- `docker.io/YOUR_USERNAME/vingo-roll-studio:1`
- `docker.io/YOUR_USERNAME/vingo-roll-studio:latest`

---

## Troubleshooting

### "No packages published" on GitHub
**This is EXPECTED** for this app.
- Shows npm packages (your app is marked `private`)
- Docker images publish separately
- Check Docker Hub or GHCR instead

### Workflow Shows "Skipped"
**Likely cause**: `DOCKER_USERNAME` or `DOCKER_PASSWORD` secrets not set
- Add them to repo secrets
- Re-run the workflow

### "Invalid credentials"
**Likely cause**: 
- Using Docker Hub password instead of access token
- Token is expired or revoked
- Create new token at https://hub.docker.com/settings/security

### Build Fails with "npm ci"
Already fixed! Lock file was updated.

---

## Pull & Run Published Image

Once images are published:

```bash
# From Docker Hub
docker pull YOUR_USERNAME/vingo-roll-studio:latest
docker run -p 3000:3000 YOUR_USERNAME/vingo-roll-studio:latest

# Or with version
docker pull YOUR_USERNAME/vingo-roll-studio:v1.9.3
docker run -p 3000:3000 YOUR_USERNAME/vingo-roll-studio:v1.9.3

# From GHCR
docker pull ghcr.io/YOUR_ORG/vingo-roll-studio:latest
docker run -p 3000:3000 ghcr.io/YOUR_ORG/vingo-roll-studio:latest
```

Then visit: **http://localhost:3000**

---

## What "No packages published" Really Means

GitHub's packages page shows:
- **npm packages**: Where you publish libraries (your app has `"private": true`)
- **Container images**: Where Docker images go (already working)

Your project **does NOT need to publish npm packages** because:
- It's a complete web application, not a library
- Docker handles deployment instead
- Users run it via `docker run`, not `npm install`

If you wanted to split reusable UI components into an npm package later, that's a separate monorepo structure.

