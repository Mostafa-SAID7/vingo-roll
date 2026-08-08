# Docker Publishing Tracking & Status

## Release Information

| Property | Value |
|----------|-------|
| Release Version | `v1.9.4` |
| Release Type | Automated Docker Publishing |
| Trigger | Git tag push |
| Build Date | 2026-08-09 |
| Repository | github.com/Mostafa-SAID7/vingo-roll-studio |
| GitHub Actions Workflow | `docker-publish.yml` |

---

## Workflow Configuration

### Registries Configured

✅ **Docker Hub**
- Registry: `docker.io`
- Authentication: Via `DOCKER_USERNAME` and `DOCKER_PASSWORD` secrets
- Access: Public
- Tags: version, semver, sha, latest

✅ **GitHub Container Registry (GHCR)**
- Registry: `ghcr.io`
- Authentication: Via `GITHUB_TOKEN`
- Access: Public
- Tags: version, semver, sha, latest

---

## Build Matrix

| Registry | Status | Image Name | Tags |
|----------|--------|-----------|------|
| Docker Hub | ⏳ Pending | `docker.io/USERNAME/vingo-roll-studio` | `v1.9.4`, `1.9`, `1`, `latest` |
| GHCR | ⏳ Pending | `ghcr.io/Mostafa-SAID7/vingo-roll-studio` | `v1.9.4`, `1.9`, `1`, `latest` |

---

## Monitoring URLs

### GitHub Actions
- **Workflow List**: https://github.com/Mostafa-SAID7/vingo-roll-studio/actions
- **Docker Publish Workflow**: https://github.com/Mostafa-SAID7/vingo-roll-studio/actions/workflows/docker-publish.yml
- **Latest Run**: https://github.com/Mostafa-SAID7/vingo-roll-studio/actions/workflows/docker-publish.yml (check Actions tab for v1.9.4 run)

### Docker Hub
- **Repository**: https://hub.docker.com/r/YOUR_DOCKER_USERNAME/vingo-roll-studio
- **Tags**: https://hub.docker.com/r/YOUR_DOCKER_USERNAME/vingo-roll-studio/tags
- **Pull Command**: `docker pull YOUR_DOCKER_USERNAME/vingo-roll-studio:v1.9.4`

### GitHub Container Registry
- **Package**: https://github.com/Mostafa-SAID7/vingo-roll-studio/pkgs/container/vingo-roll-studio
- **Pull Command**: `docker pull ghcr.io/Mostafa-SAID7/vingo-roll-studio:v1.9.4`

---

## Tag Information

```
Tag: v1.9.4
Message: Release v1.9.4 - Docker publishing with GitHub secrets configured
Commit: 2c02627 (docs: add comprehensive publishing and Docker secrets setup guides)
Branch: main
```

---

## Expected Build Artifacts

### Docker Hub Image
```
Name: vingo-roll-studio
Size: ~150-200 MB
Platform: linux/amd64
Base Image: node:20-alpine (builder) → node:20-alpine (runtime)
Tags:
  - v1.9.4 (exact version)
  - 1.9 (minor version)
  - 1 (major version)
  - latest (default branch)
  - main (branch tag)
Pushed: 2026-08-09 ~10 minutes after tag
```

### GHCR Image
```
Name: vingo-roll-studio
Size: ~150-200 MB
Platform: linux/amd64
Base Image: node:20-alpine (builder) → node:20-alpine (runtime)
Tags:
  - v1.9.4 (exact version)
  - 1.9 (minor version)
  - 1 (major version)
  - latest (default branch)
  - sha-2c02627 (git commit sha)
Pushed: 2026-08-09 ~10 minutes after tag
```

---

## Image Contents

### Dockerfile Stages
1. **Builder Stage** (`FROM node:20-alpine AS builder`)
   - Installs build dependencies
   - Runs `npm ci --legacy-peer-deps`
   - Runs `npm run build`
   - Produces: dist/ directory

2. **Runtime Stage** (`FROM node:20-alpine`)
   - Installs `dumb-init` for signal handling
   - Installs `serve` for static file serving
   - Creates non-root user `nodejs`
   - Copies dist/ from builder
   - Exposes port 3000

### Image Specifications
- **OS**: Alpine Linux 3.x
- **Node Version**: 20.x
- **User**: nodejs (UID 1001, non-root)
- **Working Directory**: /app
- **Entry Point**: dumb-init
- **Command**: serve -s dist -l 3000
- **Port**: 3000
- **Health Check**: Enabled (30s interval)
- **Environment**: NODE_ENV=production, PORT=3000

---

## Pull & Run Examples

### From Docker Hub
```bash
# Pull the image
docker pull YOUR_DOCKER_USERNAME/vingo-roll-studio:v1.9.4

# Run the container
docker run -d \
  --name vingo-app \
  -p 3000:3000 \
  YOUR_DOCKER_USERNAME/vingo-roll-studio:v1.9.4

# View logs
docker logs vingo-app

# Access application
# Visit: http://localhost:3000

# Stop and remove
docker stop vingo-app
docker rm vingo-app
```

### From GHCR
```bash
# Pull the image
docker pull ghcr.io/Mostafa-SAID7/vingo-roll-studio:v1.9.4

# Run the container
docker run -d \
  --name vingo-app \
  -p 3000:3000 \
  ghcr.io/Mostafa-SAID7/vingo-roll-studio:v1.9.4

# View logs
docker logs vingo-app

# Access application
# Visit: http://localhost:3000
```

### With Docker Compose
```yaml
version: '3.8'
services:
  vingo-app:
    image: YOUR_DOCKER_USERNAME/vingo-roll-studio:v1.9.4
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 5s
    restart: unless-stopped
```

---

## Build Timeline

```
08:00 UTC - v1.9.4 tag pushed
08:00 UTC - GitHub Actions webhook triggered
08:01 UTC - Docker Publish workflow starts
08:01 UTC - Job 1: docker-hub build matrix starts
08:02 UTC - Job 2: ghcr build matrix starts
08:05 UTC - Docker images built (all layers)
08:06 UTC - Push to Docker Hub starts
08:07 UTC - Push to GHCR starts
08:08 UTC - Docker Hub push completes
08:09 UTC - GHCR push completes
08:10 UTC - Tags visible on Docker Hub
08:12 UTC - Tags visible on GHCR (caching)
```

---

## Verification Checklist

### Immediate (Tag Creation) ✅
- [x] Tag v1.9.4 created locally
- [x] Tag pushed to GitHub
- [x] GitHub confirms tag received

### Short Term (5-10 minutes)
- [ ] GitHub Actions workflow runs (green checkmark)
- [ ] Docker Hub repository created/updated
- [ ] Docker Hub shows tags: v1.9.4, latest, 1.9, 1
- [ ] GHCR package created/updated
- [ ] GHCR shows tags: v1.9.4, latest, 1.9, 1

### Medium Term (Optional)
- [ ] Local Docker pull succeeds
- [ ] Container starts successfully
- [ ] Application accessible at http://localhost:3000
- [ ] Health check passes
- [ ] No errors in logs

### Release (Final)
- [ ] GitHub Release created
- [ ] Release notes include Docker pull commands
- [ ] Release notes include run examples
- [ ] Documentation updated

---

## Success Indicators

### ✅ Workflow Success
```bash
# Run succeeded
Status: Completed successfully
Duration: ~8-12 minutes
Jobs: 2 (docker-hub ✅, ghcr ✅)
Steps: All passed
Artifacts: Docker images pushed
```

### ✅ Docker Hub Success
```
Repository URL: https://hub.docker.com/r/YOUR_USERNAME/vingo-roll-studio
Visibility: Public
Tags: v1.9.4, latest, 1.9, 1, main
Image Count: 4-5
Size: ~150-200 MB each
```

### ✅ GHCR Success
```
Package URL: https://github.com/Mostafa-SAID7/vingo-roll-studio/pkgs/container/vingo-roll-studio
Visibility: Public
Tags: v1.9.4, latest, 1.9, 1, sha-2c02627
Image Count: 4-5
Size: ~150-200 MB each
```

---

## Troubleshooting Commands

### Check GitHub Actions Status
```bash
# View workflow runs
gh run list -R Mostafa-SAID7/vingo-roll-studio --workflow docker-publish.yml

# View specific run details
gh run view RUN_ID -R Mostafa-SAID7/vingo-roll-studio --verbose

# View run logs
gh run view RUN_ID -R Mostafa-SAID7/vingo-roll-studio --log
```

### Check Docker Hub via CLI
```bash
# Login to Docker
docker login

# Inspect image
docker inspect YOUR_USERNAME/vingo-roll-studio:v1.9.4

# List available tags
curl -s https://hub.docker.com/v2/repositories/YOUR_USERNAME/vingo-roll-studio/tags | jq '.results[].name'
```

### Test Image Locally
```bash
# Pull latest
docker pull YOUR_USERNAME/vingo-roll-studio:latest

# Run with verbose output
docker run --rm -it YOUR_USERNAME/vingo-roll-studio:latest

# Run in background with logs
docker run -d --name test-vingo -p 3000:3000 YOUR_USERNAME/vingo-roll-studio:latest
docker logs -f test-vingo
docker stop test-vingo
```

---

## Release History

| Version | Date | Status | Docker Hub | GHCR | Release |
|---------|------|--------|-----------|------|---------|
| v1.9.4 | 2026-08-09 | ⏳ Building | Pending | Pending | Pending |
| v1.9.3 | Previously | Exists | ✅ | ✅ | ✅ |
| v1.9.2 | Previously | Exists | ✅ | ✅ | ✅ |

---

## Notes

- First Docker Hub secret deployment with v1.9.4
- GitHub secrets configured successfully
- Multi-registry push enabled (Docker Hub + GHCR)
- Production build with alpine base
- Non-root user for security
- Health check configured
- Automatic tag generation for semver

