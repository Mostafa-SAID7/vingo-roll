# Docker Deployment Guide

**Project**: Vingo Roll Studio  
**Version**: 1.0.1  
**Date**: August 8, 2026

---

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Development with Docker](#development-with-docker)
4. [Production Deployment](#production-deployment)
5. [Docker Compose](#docker-compose)
6. [Building and Testing](#building-and-testing)
7. [Troubleshooting](#troubleshooting)
8. [Security Considerations](#security-considerations)

---

## Overview

This guide covers Docker deployment for Vingo Roll Studio. We provide multiple deployment options:

- **Development**: Hot reload with docker-compose
- **Production**: Multi-stage build, optimized image
- **Nginx Proxy**: Reverse proxy with SSL/TLS support

### Architecture

```
┌─────────────────────────────────────┐
│     Client (Browser)                │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│   Nginx (SSL/TLS, Rate Limiting)    │
│   Port: 80, 443                     │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│   Node.js App (Vingo Roll Studio)   │
│   Port: 3000                        │
└─────────────────────────────────────┘
```

---

## Quick Start

### Prerequisites

- Docker >= 20.10
- Docker Compose >= 1.29
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vingo-roll-studio.git
   cd vingo-roll-studio
   ```

2. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Development: `http://localhost:5173`
   - Production: `http://localhost:3000`
   - Through Nginx: `http://localhost:80`

4. **Stop the application**
   ```bash
   docker-compose down
   ```

---

## Development with Docker

### Development Setup

Development containers include hot module reload (HMR) for instant feedback.

#### Using Docker Compose

```bash
# Start development environment
docker-compose up -d --profile dev

# View logs
docker-compose logs -f app-dev

# Stop development environment
docker-compose down
```

#### Using Docker directly

```bash
# Build development image
docker build -f Dockerfile.dev -t vingo-roll-dev .

# Run development container
docker run -it \
  -p 5173:5173 \
  -v $(pwd):/app \
  -v /app/node_modules \
  vingo-roll-dev

# Access at http://localhost:5173
```

### Features

- ✅ Hot Module Reload (HMR)
- ✅ Live code updates
- ✅ Full source maps
- ✅ ESLint warnings
- ✅ Console output
- ✅ Volume mounting for code changes

---

## Production Deployment

### Building for Production

```bash
# Build production image
docker build -t vingo-roll-studio:1.0.1 .

# Verify image
docker images vingo-roll-studio
```

### Running Production Container

```bash
# Run production container
docker run -d \
  --name vingo-roll \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  --restart unless-stopped \
  --health-cmd="wget --quiet --tries=1 --spider http://localhost:3000" \
  --health-interval=30s \
  --health-timeout=10s \
  --health-retries=3 \
  vingo-roll-studio:1.0.1

# Check container status
docker ps
docker logs vingo-roll

# Stop container
docker stop vingo-roll
docker rm vingo-roll
```

### Environment Variables

| Variable | Value | Notes |
|----------|-------|-------|
| NODE_ENV | production | Required for optimization |
| PORT | 3000 | Application port |
| VITE_* | * | Vite environment variables |

---

## Docker Compose

### Services

#### app-dev (Development)
```yaml
# Development Vite server
# Port: 5173
# Auto-reload on code changes
# Hot Module Replacement enabled
```

#### app (Production)
```yaml
# Production Node.js app
# Port: 3000
# Health checks enabled
# Auto-restart on failure
```

#### nginx (Reverse Proxy)
```yaml
# Nginx reverse proxy
# Ports: 80 (HTTP), 443 (HTTPS)
# SSL/TLS termination
# Rate limiting
# Compression
```

### Useful Commands

```bash
# Start all services
docker-compose up -d

# Start only production app
docker-compose up -d app

# Start with development profile
docker-compose up -d --profile dev

# View logs
docker-compose logs -f [service]

# Execute command in container
docker-compose exec app npm run lint

# Rebuild images
docker-compose up -d --build

# Stop all services
docker-compose down

# Remove volumes
docker-compose down -v

# View service status
docker-compose ps
```

---

## Building and Testing

### Automated Build Script

```bash
# Make script executable
chmod +x scripts/docker-build.sh

# Run build script
./scripts/docker-build.sh latest

# Push to registry
./scripts/docker-build.sh latest myregistry.azurecr.io

# View image
docker images vingo-roll-studio
```

### Build Process

1. ✅ ESLint checks
2. ✅ TypeScript build
3. ✅ Docker image creation
4. ✅ Container test
5. ✅ Health checks
6. ✅ (Optional) Push to registry

### Testing Docker Image

```bash
# Build image
docker build -t vingo-roll-studio:test .

# Run container
docker run -d -p 3000:3000 vingo-roll-studio:test

# Wait for startup
sleep 5

# Test health
curl http://localhost:3000

# View logs
docker logs [container-id]

# Stop container
docker stop [container-id]
```

### Image Inspection

```bash
# View image layers
docker history vingo-roll-studio:latest

# Inspect image details
docker inspect vingo-roll-studio:latest

# View image size
docker images vingo-roll-studio

# Scan for vulnerabilities (if using Docker Scout)
docker scout cves vingo-roll-studio:latest
```

---

## Registry & Publishing

### Docker Hub

```bash
# Login to Docker Hub
docker login

# Tag image
docker tag vingo-roll-studio:latest yourusername/vingo-roll-studio:1.0.1

# Push to Docker Hub
docker push yourusername/vingo-roll-studio:1.0.1

# Pull image
docker pull yourusername/vingo-roll-studio:1.0.1
```

### GitHub Container Registry (GHCR)

```bash
# Login to GHCR
echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin

# Tag image
docker tag vingo-roll-studio:latest ghcr.io/username/vingo-roll-studio:1.0.1

# Push to GHCR
docker push ghcr.io/username/vingo-roll-studio:1.0.1
```

### Azure Container Registry

```bash
# Login to ACR
az acr login --name myregistry

# Tag image
docker tag vingo-roll-studio:latest myregistry.azurecr.io/vingo-roll-studio:1.0.1

# Push to ACR
docker push myregistry.azurecr.io/vingo-roll-studio:1.0.1
```

---

## Troubleshooting

### Container won't start

```bash
# View detailed logs
docker logs [container-id]

# Check image
docker images vingo-roll-studio

# Rebuild image
docker build -t vingo-roll-studio:latest .
```

### Port already in use

```bash
# Find process using port
lsof -i :3000

# Use different port
docker run -p 8000:3000 vingo-roll-studio:latest
```

### Out of disk space

```bash
# Clean up Docker
docker system prune -a

# Remove specific image
docker rmi vingo-roll-studio:old-version

# Remove all unused volumes
docker volume prune
```

### Health check failing

```bash
# View health status
docker ps --filter "health=unhealthy"

# Check logs
docker logs [container-id]

# Test endpoint manually
curl http://localhost:3000
```

### Permission denied

```bash
# Check file permissions
ls -la .dockerignore Dockerfile

# Fix permissions
chmod 644 .dockerignore Dockerfile

# Add user to docker group (Linux)
sudo usermod -aG docker $USER
```

---

## Security Considerations

### Best Practices

1. **Use non-root user** ✅
   - Container runs as `nodejs` user
   - Prevents privilege escalation

2. **Minimal base image** ✅
   - Uses `node:20-alpine`
   - Only ~170MB vs 900MB+ for full image

3. **Multi-stage build** ✅
   - Production image contains only runtime dependencies
   - Excludes build tools and source code

4. **Security headers** ✅
   - X-Frame-Options: SAMEORIGIN
   - X-Content-Type-Options: nosniff
   - Strict-Transport-Security
   - CSP ready

5. **Secrets management**
   - Use environment variables
   - Never commit secrets
   - Use Docker secrets in Swarm

6. **Rate limiting** ✅
   - Nginx configured with rate limits
   - General: 10 req/s
   - API: 30 req/s

7. **SSL/TLS** ✅
   - Nginx configured for HTTPS
   - HTTP redirects to HTTPS
   - TLS 1.2+ enforced

### Security Checklist

- [ ] No secrets in image
- [ ] Non-root user running app
- [ ] Health checks enabled
- [ ] Restart policy set
- [ ] Resource limits configured
- [ ] Logs monitored
- [ ] Vulnerability scanning enabled
- [ ] Network segmentation
- [ ] SSL/TLS certificates valid
- [ ] Rate limiting enabled

---

## Performance Tuning

### Optimize build time

```bash
# Use BuildKit (faster builds)
export DOCKER_BUILDKIT=1
docker build -t vingo-roll-studio:latest .
```

### Optimize image size

```bash
# Check layer sizes
docker history vingo-roll-studio:latest

# Remove unused dependencies
npm prune --production
```

### Optimize runtime performance

```yaml
# In docker-compose.yml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
```

---

## Monitoring & Logging

### View Logs

```bash
# Real-time logs
docker-compose logs -f app

# Last 100 lines
docker-compose logs --tail 100 app

# With timestamps
docker-compose logs --timestamps app
```

### Health Monitoring

```bash
# Check health status
docker ps --format "table {{.Names}}\t{{.Status}}"

# Detailed health info
docker inspect --format='{{.State.Health.Status}}' [container-id]

# Health event logs
docker events --filter status=health_status
```

### Metrics

```bash
# Container stats
docker stats vingo-roll

# Memory usage
docker stats --no-stream vingo-roll

# Network usage
docker inspect [container-id] | grep -i net
```

---

## Production Checklist

Before deploying to production:

- [ ] Build tested locally
- [ ] ESLint passed
- [ ] Build verification passed
- [ ] Health checks working
- [ ] Logs monitored
- [ ] Secrets configured
- [ ] SSL/TLS certificates ready
- [ ] Backup strategy defined
- [ ] Monitoring configured
- [ ] Rollback plan ready

---

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Best Practices for Node.js](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [Node.js Docker Official Images](https://hub.docker.com/_/node)

---

## Support

For issues or questions:
- GitHub Issues: [Report a bug](https://github.com/yourusername/vingo-roll-studio/issues)
- Documentation: See [docs/](../docs/)
- Code Quality: See [docs/CODE_QUALITY.md](./CODE_QUALITY.md)

---

**Last Updated**: August 8, 2026  
**Maintainer**: Vingo AI (aminone070@gmail.com)
