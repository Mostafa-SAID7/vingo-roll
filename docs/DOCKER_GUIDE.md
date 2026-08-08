# Docker Setup Guide - Vingo Roll Studio

## Overview

This guide covers how to containerize and run the Vingo Roll Studio ecommerce application using Docker.

## Files Included

- **Dockerfile** - Production-optimized multi-stage build
- **Dockerfile.dev** - Development image with hot-reload
- **.dockerignore** - Files excluded from Docker context
- **docker-compose.yml** - Production orchestration
- **docker-compose.dev.yml** - Development orchestration

## Prerequisites

- Docker 20.10+ installed
- Docker Compose 2.0+ installed
- At least 2GB free disk space

## Quick Start - Production

### Build and Run

```bash
# Build the Docker image
docker build -t vingo-roll-studio:latest .

# Run with docker-compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

### Access the Application

- **Application**: http://localhost:3000
- **Health Check**: Container automatically health checks every 30s

## Quick Start - Development

### With Hot-Reload

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop development
docker-compose -f docker-compose.dev.yml down
```

### Access Development Environment

- **Vite Dev Server**: http://localhost:5173
- **API Server**: http://localhost:3000

## Docker Compose Commands

### Production

```bash
# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Restart service
docker-compose restart

# Stop without removing
docker-compose stop

# Remove containers and volumes
docker-compose down

# View status
docker-compose ps
```

### Development

```bash
# Start with logs visible
docker-compose -f docker-compose.dev.yml up

# Start in background
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f service-name

# Stop
docker-compose -f docker-compose.dev.yml down
```

## Manual Docker Commands

### Build

```bash
# Production build
docker build -t vingo-roll-studio:latest .

# Development build
docker build -t vingo-roll-studio:dev -f Dockerfile.dev .

# Build with specific tag
docker build -t vingo-roll-studio:v1.3.0 .
```

### Run

```bash
# Production run
docker run -d \
  -p 3000:3000 \
  --name vingo-roll \
  --restart unless-stopped \
  vingo-roll-studio:latest

# Development run with volume mount
docker run -it \
  -p 5173:5173 \
  -p 3000:3000 \
  -v $(pwd):/app \
  -v /app/node_modules \
  --name vingo-roll-dev \
  vingo-roll-studio:dev

# Run with environment variables
docker run -d \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e HOST=0.0.0.0 \
  vingo-roll-studio:latest
```

### Inspect Container

```bash
# View logs
docker logs vingo-roll-studio

# Follow logs
docker logs -f vingo-roll-studio

# View container info
docker inspect vingo-roll-studio

# View resource usage
docker stats vingo-roll-studio

# Execute command in container
docker exec -it vingo-roll-studio sh

# View processes
docker top vingo-roll-studio
```

### Stop/Remove

```bash
# Stop container
docker stop vingo-roll-studio

# Remove container
docker rm vingo-roll-studio

# Remove image
docker rmi vingo-roll-studio:latest

# Prune unused resources
docker system prune -a
```

## Image Details

### Production Image (Dockerfile)

**Base Image**: `node:22-alpine`
**Size**: ~150MB (optimized)
**Features**:

- Multi-stage build (reduces final size)
- Non-root user (security)
- Health checks enabled
- Proper signal handling (dumb-init)
- Production-optimized

**Build Process**:

1. Stage 1: Build application in Node 22
2. Stage 2: Copy only built assets and run in production

### Development Image (Dockerfile.dev)

**Base Image**: `node:22-alpine`
**Size**: ~300MB (includes dev dependencies)
**Features**:

- Full node_modules
- Volume mounting for hot-reload
- Both Vite (5173) and API (3000) ports
- Development environment setup

## Health Checks

Both images include health checks:

```bash
# Check health status
docker inspect --format="{{.State.Health.Status}}" vingo-roll-studio

# View health details
docker inspect vingo-roll-studio | grep -A 10 "Health"
```

### Health Check Configuration

- **Interval**: 30 seconds
- **Timeout**: 3 seconds
- **Retries**: 3 consecutive failures before unhealthy
- **Start Period**: 5-10 seconds grace period

## Networking

### Docker Compose Network

- **Network Name**: `vingo-network`
- **Type**: Bridge
- **Scope**: Local

### Port Mapping

**Production**:

- Container Port 3000 → Host Port 3000

**Development**:

- Container Port 5173 → Host Port 5173 (Vite)
- Container Port 3000 → Host Port 3000 (API)

## Environment Variables

### Available Variables

```env
NODE_ENV=production|development
HOST=0.0.0.0
PORT=3000
```

### Setting Environment Variables

In `docker-compose.yml`:

```yaml
environment:
  - NODE_ENV=production
  - HOST=0.0.0.0
  - PORT=3000
```

Or via command line:

```bash
docker run -e NODE_ENV=production vingo-roll-studio:latest
```

## Volume Mounting

### Development Volumes

```yaml
volumes:
  - .:/app # Mount source code
  - /app/node_modules # Anonymous volume (prevents override)
```

### Benefits

- **Hot-reload**: Changes reflected instantly
- **Persistent modules**: Separate volume prevents reinstall on each change
- **Live debugging**: Can inspect running code

## Best Practices

### Security

1. ✅ Use non-root user (nodejs)
2. ✅ Minimal base image (Alpine Linux)
3. ✅ Multi-stage builds (reduce attack surface)
4. ✅ No secrets in image
5. ✅ Use `.dockerignore`

### Performance

1. ✅ Multi-stage builds
2. ✅ Alpine Linux base (small footprint)
3. ✅ Proper layer caching
4. ✅ dumb-init for proper signal handling
5. ✅ Health checks for orchestration

### Maintainability

1. ✅ Clear comments in Dockerfiles
2. ✅ Separate dev and production images
3. ✅ Docker Compose for easy orchestration
4. ✅ .dockerignore for clean context
5. ✅ Semantic versioning tags

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker logs vingo-roll-studio

# Check if port is in use
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Rebuild image
docker build --no-cache -t vingo-roll-studio:latest .
```

### Out of Memory

```bash
# Limit memory usage
docker run -m 512m vingo-roll-studio:latest

# In docker-compose.yml
services:
  vingo-roll:
    mem_limit: 512m
```

### Permission Issues

```bash
# Check user in container
docker exec vingo-roll-studio whoami

# Run as specific user
docker run -u nodejs vingo-roll-studio:latest
```

### Slow Performance

```bash
# Check CPU/memory usage
docker stats

# View running processes
docker top vingo-roll-studio

# Check disk space
docker system df
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Push Docker Image

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: docker/setup-buildx-action@v2
      - uses: docker/build-push-action@v4
        with:
          context: .
          push: false
          tags: vingo-roll-studio:${{ github.sha }}
```

## Registry Deployment

### Push to Docker Hub

```bash
# Tag image
docker tag vingo-roll-studio:latest your-username/vingo-roll-studio:latest

# Login
docker login

# Push
docker push your-username/vingo-roll-studio:latest

# Pull on another machine
docker pull your-username/vingo-roll-studio:latest
```

### Push to GitHub Container Registry

```bash
# Login
docker login ghcr.io

# Tag
docker tag vingo-roll-studio:latest ghcr.io/your-username/vingo-roll-studio:latest

# Push
docker push ghcr.io/your-username/vingo-roll-studio:latest
```

## Cleanup

### Remove Unused Resources

```bash
# Remove dangling images
docker image prune -a

# Remove unused volumes
docker volume prune

# Remove unused networks
docker network prune

# Full cleanup
docker system prune -a --volumes
```

## Support

For issues or questions:

1. Check Docker logs: `docker logs -f vingo-roll-studio`
2. Review this guide
3. Check Docker documentation: https://docs.docker.com
4. Check project repository issues

## Additional Resources

- [Docker Official Docs](https://docs.docker.com)
- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Best Practices for Node.js](https://github.com/nodejs/docker-node/blob/main/docs/best-practices.md)
- [Alpine Linux](https://alpinelinux.org/)
