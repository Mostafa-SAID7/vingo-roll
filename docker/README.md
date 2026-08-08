# Docker Configuration

This folder contains Docker-related files for containerization and deployment.

## Files

- **Dockerfile** - Production multi-stage build
- **Dockerfile.dev** - Development build
- **docker-compose.yml** - Production composition
- **docker-compose.dev.yml** - Development composition
- **.dockerignore** - Files to exclude from Docker context
- **nginx.conf** - Nginx reverse proxy configuration

## Quick Start

```bash
# Production build
docker build -f docker/Dockerfile -t vingo-app:latest .

# Development build
docker build -f docker/Dockerfile.dev -t vingo-app:dev .

# Run with compose
docker-compose -f docker/docker-compose.yml up

# Development environment
docker-compose -f docker/docker-compose.dev.yml up
```

## Tags

- v1.9.4: Docker publishing enabled
- latest: Production ready
- main: Latest from main branch

See root README.md for deployment instructions.
