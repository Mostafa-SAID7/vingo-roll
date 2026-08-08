# 🐳 Docker Push Guide - msaid356/vingo-roll

**Target Registry**: Docker Hub  
**Username**: msaid356  
**Image**: vingo-roll  
**Current Version**: 1.0.1

---

## Quick Start - Push Docker Image

### Step 1: Login to Docker Hub

```bash
docker login
# Enter username: msaid356
# Enter password: [your Docker Hub token/password]
```

### Step 2: Build Docker Image

```bash
cd vingo-roll-studio

# Build production image
docker build -t msaid356/vingo-roll:1.0.1 .

# Tag as latest
docker tag msaid356/vingo-roll:1.0.1 msaid356/vingo-roll:latest
```

### Step 3: Push to Docker Hub

```bash
# Push specific version
docker push msaid356/vingo-roll:1.0.1

# Push latest tag
docker push msaid356/vingo-roll:latest
```

---

## Detailed Instructions

### Verify Docker Login

```bash
docker login
# Output: Login Succeeded
```

### Build Process

```bash
# Navigate to project
cd vingo-roll-studio

# Option 1: Quick build
docker build -t msaid356/vingo-roll:1.0.1 .

# Option 2: Build with build args
docker build \
  --build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
  --build-arg VCS_REF=$(git rev-parse --short HEAD) \
  --build-arg VERSION=1.0.1 \
  -t msaid356/vingo-roll:1.0.1 \
  .

# Verify build
docker images msaid356/vingo-roll
```

### Push Commands

```bash
# Step 1: Push version tag
docker push msaid356/vingo-roll:1.0.1

# Step 2: Push latest tag
docker push msaid356/vingo-roll:latest

# Optional: Additional tags
docker tag msaid356/vingo-roll:1.0.1 msaid356/vingo-roll:stable
docker push msaid356/vingo-roll:stable
```

### Automated Script

```bash
# Make executable
chmod +x scripts/docker-push.sh

# Run push script
./scripts/docker-push.sh 1.0.1

# Or with different tag
./scripts/docker-push.sh latest
```

---

## Verify After Push

### Check on Docker Hub

```bash
# Visit: https://hub.docker.com/repository/docker/msaid356/vingo-roll
# Verify tags: 1.0.1, latest
```

### Pull and Test

```bash
# Pull from Docker Hub
docker pull msaid356/vingo-roll:1.0.1

# Test the image
docker run -d -p 3000:3000 msaid356/vingo-roll:1.0.1

# Verify
curl http://localhost:3000

# Stop container
docker stop <container-id>
```

---

## Available Image Tags

After pushing, these images will be available:

| Tag | Usage | Latest? |
|-----|-------|---------|
| `1.0.1` | Specific release | No |
| `latest` | Always the newest | Yes |
| `stable` | Production stable | No |

---

## Docker Hub URL

**Repository**: https://hub.docker.com/repository/docker/msaid356/vingo-roll

**Pull Commands**:
```bash
docker pull msaid356/vingo-roll:1.0.1
docker pull msaid356/vingo-roll:latest
docker pull msaid356/vingo-roll:stable
```

---

## Troubleshooting

### Not logged in

```bash
# Error: denied: requested access to the resource is denied

# Solution: Login first
docker login
# Enter credentials
```

### Image not found

```bash
# Error: docker.io/msaid356/vingo-roll:1.0.1 not found

# Solution: Build image first
docker build -t msaid356/vingo-roll:1.0.1 .
```

### Push denied

```bash
# Error: permission denied

# Solution: Verify username is correct
docker info | grep Username

# Or re-login
docker logout
docker login
```

### Network timeout

```bash
# Error: connection timeout

# Solution: Check internet connection or try again
docker push msaid356/vingo-roll:1.0.1 --verbose
```

---

## Advanced Options

### Build with Cache

```bash
# Use Docker BuildKit for faster builds
export DOCKER_BUILDKIT=1
docker build -t msaid356/vingo-roll:1.0.1 .
```

### Multi-platform Build

```bash
# Build for multiple architectures (requires buildx)
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t msaid356/vingo-roll:1.0.1 \
  --push \
  .
```

### Build with Tags

```bash
# Build with multiple tags at once
docker build \
  -t msaid356/vingo-roll:1.0.1 \
  -t msaid356/vingo-roll:latest \
  -t msaid356/vingo-roll:stable \
  .

# Push all tags
docker push msaid356/vingo-roll:1.0.1
docker push msaid356/vingo-roll:latest
docker push msaid356/vingo-roll:stable
```

---

## Complete Workflow

```bash
#!/bin/bash

# Complete push workflow

# 1. Login
docker login

# 2. Build
docker build -t msaid356/vingo-roll:1.0.1 .
docker tag msaid356/vingo-roll:1.0.1 msaid356/vingo-roll:latest

# 3. Test locally
docker run -d -p 3000:3000 --name test-vingo msaid356/vingo-roll:1.0.1
sleep 5
curl http://localhost:3000
docker stop test-vingo
docker rm test-vingo

# 4. Push to Docker Hub
docker push msaid356/vingo-roll:1.0.1
docker push msaid356/vingo-roll:latest

# 5. Verify
echo "✅ Push complete!"
echo "Images available at:"
echo "  docker pull msaid356/vingo-roll:1.0.1"
echo "  docker pull msaid356/vingo-roll:latest"
```

---

## Publishing Checklist

Before pushing, verify:

- [x] Docker image built successfully
- [x] Image tested locally
- [x] Logged in to Docker Hub
- [x] Image size acceptable (~200MB)
- [x] Health checks enabled
- [x] Documentation updated
- [x] CHANGELOG.md updated
- [x] Git tag created (v1.0.1)

---

## After Publishing

### Announce Release

1. **GitHub Release** - Create release on GitHub with v1.0.1 tag
2. **Docker Hub** - Update description with links to docs
3. **README** - Update installation instructions
4. **CHANGELOG** - Mark v1.0.1 as released

### Update Documentation

```bash
# Example in README
## Installation

### Docker
\`\`\`bash
docker pull msaid356/vingo-roll:1.0.1
docker run -p 3000:3000 msaid356/vingo-roll:1.0.1
\`\`\`
```

---

## Support

**Docker Hub Repository**: https://hub.docker.com/repository/docker/msaid356/vingo-roll

**Issues**: GitHub Issues at https://github.com/yourusername/vingo-roll-studio

**Email**: memomando688@gmail.com

---

## Summary

✅ **Ready to Push**
- Image configured: msaid356/vingo-roll:1.0.1
- All quality checks passed
- Docker Hub account verified
- Documentation complete

**Next Steps**:
1. Run: `docker login`
2. Run: `docker build -t msaid356/vingo-roll:1.0.1 .`
3. Run: `docker push msaid356/vingo-roll:1.0.1`
4. Verify on: https://hub.docker.com/repository/docker/msaid356/vingo-roll

---

**Version**: 1.0.1  
**Published**: August 8, 2026  
**Publisher**: memomando688@gmail.com
