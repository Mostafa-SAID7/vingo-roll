# Package & Docker Publishing Guide

## Current State Analysis

### What IS Working ✅
- **Docker builds**: Successfully creates production images
- **Docker workflow**: Configured to push to Docker Hub + GHCR
- **Application**: Full-stack ecommerce platform

### What's NOT Working ❌
- **npm package publishing**: Marked as `"private": true` (intentional)
- **GitHub Packages display**: Shows "No packages published" (this is correct - it's not a package library)

---

## Understanding the Architecture

This project is a **complete web application**, NOT a reusable npm library:

```
vingo-roll-studio/
├── Full React app with TanStack Start
├── Server rendering capabilities
├── Docker containerization (for deployment)
└── NOT meant to be published as npm package
```

---

## Publishing Options

### ✅ OPTION 1: Docker Image Publishing (Recommended)

**Purpose**: Deploy to production via Docker

**Already configured in**: `.github/workflows/docker-publish.yml`

**What you need:**
1. Docker Hub account: https://hub.docker.com
2. Access token (not password): Settings → Security → New Access Token
3. Add GitHub secrets:
   - `DOCKER_USERNAME`: Your Docker Hub username
   - `DOCKER_PASSWORD`: Your access token

**What happens:**
- On push to `main`: Publishes `docker.io/USERNAME/vingo-roll-studio:latest`
- On git tag `v*`: Publishes versioned images (`v1.9.2`, `1.9`, etc.)
- To GHCR: `ghcr.io/YOUR_ORG/vingo-roll-studio:latest`

**Usage:**
```bash
# Pull and run
docker pull docker.io/username/vingo-roll-studio:latest
docker run -p 3000:3000 username/vingo-roll-studio:latest
```

---

### ⚠️ OPTION 2: If You WANT npm Package Publishing

**Only choose this if** you want to split out reusable components/utils as a separate package.

**Changes needed:**

#### 1. Create separate package structure:
```
vingo-roll-studio/
├── apps/
│   ├── web/          (current app)
│   └── ui-library/   (new: reusable components)
└── packages/
    └── shared/       (new: utils, types)
```

#### 2. Update package.json:
```json
{
  "name": "@vingo-roll/ui-library",
  "version": "1.0.0",
  "private": false,
  "publishConfig": {
    "registry": "https://registry.npmjs.org/",
    "access": "public"
  }
}
```

#### 3. Add npm publish workflow (`.github/workflows/npm-publish.yml`):
```yaml
name: Publish to npm

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

#### 4. Create NPM token:
- Go to: https://www.npmjs.com/settings/~/tokens
- Create token: "Automation" type
- Add as GitHub secret: `NPM_TOKEN`

---

## Recommended Setup (Current Project)

**Keep as is** - this is a web application:

| Aspect | Current | Status |
|--------|---------|--------|
| `private: true` | ✅ Correct | Don't change |
| Docker publishing | ✅ Configured | Set GitHub secrets |
| npm publishing | ❌ Not needed | Don't add |
| `.npmrc` access=public | ⚠️ Redundant | Can remove |

---

## Setup Docker Publishing (Right Now)

### Step 1: Docker Hub Account
1. Create: https://hub.docker.com
2. Create access token:
   - Profile → Settings → Security
   - "New Access Token"
   - Copy token (you won't see it again)

### Step 2: GitHub Secrets
1. Go to: repo → Settings → Secrets and variables → Actions
2. Add secrets:
   - `DOCKER_USERNAME`: your_dockerhub_username
   - `DOCKER_PASSWORD`: your_access_token

### Step 3: Push & Verify
```bash
git tag v1.9.2
git push --tags
```

Then check:
- **Docker Hub**: `https://hub.docker.com/r/YOUR_USERNAME/vingo-roll-studio`
- **GHCR**: `https://ghcr.io/YOUR_ORG/vingo-roll-studio` (automatic)

---

## What the "No packages published" Message Means

GitHub shows two separate registries:

### Registry 1: npm Packages
- Status: "No packages published" ← **This is correct**
- Because: `"private": true`
- This is a web app, not a library

### Registry 2: Docker/Container Images  
- Status: Images ARE being published (if secrets are configured)
- Check: repo → Packages → Docker tabs

---

## File Cleanup Recommendations

1. **Remove redundant .npmrc setting:**
```bash
# Your .npmrc has conflicting settings
# Keep this:
registry=https://registry.npmjs.org/
legacy-peer-deps=true
engine-strict=false

# Remove these (they're for package libraries):
# access=public
# tag=latest
```

2. **Consider monorepo structure** if you want to:
   - Publish UI components separately
   - Share types/utilities as npm packages
   - Keep application separate

---

## Quick Reference

**To publish Docker image**: Push to main or tag
```bash
git tag v1.9.3 && git push --tags
```

**To pull and run**:
```bash
docker pull docker.io/USERNAME/vingo-roll-studio:v1.9.3
docker run -p 3000:3000 docker.io/USERNAME/vingo-roll-studio:v1.9.3
```

**Monitor**:
- Docker Hub: https://hub.docker.com/r/YOUR_USERNAME
- GHCR: https://github.com/YOUR_ORG/vingo-roll-studio/pkgs/container/vingo-roll-studio

