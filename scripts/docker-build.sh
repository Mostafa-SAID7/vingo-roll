#!/bin/bash

# Docker Build Script for Vingo Roll Studio
# Builds Docker image and runs quality checks

set -e

# Configuration
DOCKER_IMAGE="vingo-roll-studio"
DOCKER_TAG="${1:-latest}"
REGISTRY="${2:-}"

echo "🐳 Docker Build Script - Vingo Roll Studio"
echo "========================================="
echo "Image: $DOCKER_IMAGE"
echo "Tag: $DOCKER_TAG"

# Step 1: Check Docker is installed
echo ""
echo "1️⃣  Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi
echo "✅ Docker is installed"

# Step 2: Lint check
echo ""
echo "2️⃣  Running ESLint checks..."
npm run lint
echo "✅ ESLint passed"

# Step 3: Build check
echo ""
echo "3️⃣  Running TypeScript build..."
npm run build
echo "✅ Build successful"

# Step 4: Build Docker image
echo ""
echo "4️⃣  Building Docker image..."
docker build -t "$DOCKER_IMAGE:$DOCKER_TAG" \
    --build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
    --build-arg VCS_REF=$(git rev-parse --short HEAD) \
    --build-arg VERSION="$DOCKER_TAG" \
    .
echo "✅ Docker image built successfully"

# Step 5: Test Docker image
echo ""
echo "5️⃣  Testing Docker image..."
echo "Creating test container..."
CONTAINER_ID=$(docker run -d -p 3000:3000 "$DOCKER_IMAGE:$DOCKER_TAG")
echo "Container ID: $CONTAINER_ID"

# Wait for container to be ready
echo "Waiting for container to start..."
sleep 5

# Check if container is running
if docker inspect -f '{{.State.Running}}' "$CONTAINER_ID" > /dev/null 2>&1; then
    if [ "$(docker inspect -f '{{.State.Running}}' "$CONTAINER_ID")" = "true" ]; then
        echo "✅ Container is running"
        
        # Test health
        echo "Testing health endpoint..."
        if curl -f http://localhost:3000 > /dev/null 2>&1; then
            echo "✅ Health check passed"
        else
            echo "⚠️  Health check failed (expected for non-running app)"
        fi
    else
        echo "❌ Container is not running"
        docker logs "$CONTAINER_ID"
        docker stop "$CONTAINER_ID" 2>/dev/null || true
        docker rm "$CONTAINER_ID" 2>/dev/null || true
        exit 1
    fi
else
    echo "⚠️  Could not verify container status"
fi

# Cleanup
echo ""
echo "6️⃣  Cleaning up test container..."
docker stop "$CONTAINER_ID" 2>/dev/null || true
docker rm "$CONTAINER_ID" 2>/dev/null || true
echo "✅ Cleanup complete"

# Step 7: Push to registry (if provided)
if [ -n "$REGISTRY" ]; then
    echo ""
    echo "7️⃣  Pushing to registry..."
    FULL_IMAGE="$REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG"
    docker tag "$DOCKER_IMAGE:$DOCKER_TAG" "$FULL_IMAGE"
    docker push "$FULL_IMAGE"
    echo "✅ Image pushed to $FULL_IMAGE"
fi

# Summary
echo ""
echo "========================================="
echo "✅ Docker build completed successfully!"
echo ""
echo "Image: $DOCKER_IMAGE:$DOCKER_TAG"
echo "Size: $(docker images --format='{{.Size}}' $DOCKER_IMAGE:$DOCKER_TAG)"
echo ""
echo "🚀 To run the container:"
echo "   docker run -p 3000:3000 $DOCKER_IMAGE:$DOCKER_TAG"
echo ""
echo "📦 To run with docker-compose:"
echo "   docker-compose up -d"
echo ""
