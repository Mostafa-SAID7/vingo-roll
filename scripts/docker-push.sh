#!/bin/bash

# Docker Push Script for Vingo Roll Studio
# Pushes built images to Docker Hub (msaid356/vingo-roll)

set -e

REGISTRY="docker.io"
DOCKER_USERNAME="msaid356"
IMAGE_NAME="vingo-roll"
TAG="${1:-1.0.1}"

echo "🐳 Docker Push Script - Vingo Roll Studio"
echo "========================================="
echo "Registry: $REGISTRY"
echo "Username: $DOCKER_USERNAME"
echo "Image: $IMAGE_NAME"
echo "Tag: $TAG"
echo ""

# Step 1: Check Docker is logged in
echo "1️⃣  Checking Docker login..."
if ! docker info | grep -q "Username"; then
    echo "❌ Not logged into Docker. Please run: docker login"
    exit 1
fi
echo "✅ Docker login verified"

# Step 2: Check if local image exists
echo ""
echo "2️⃣  Checking for local image..."
if ! docker images | grep -q "$DOCKER_USERNAME/$IMAGE_NAME"; then
    echo "❌ Image not found: $DOCKER_USERNAME/$IMAGE_NAME:$TAG"
    echo "Please build first: docker build -t $DOCKER_USERNAME/$IMAGE_NAME:$TAG ."
    exit 1
fi
echo "✅ Local image found"

# Step 3: Push to Docker Hub
echo ""
echo "3️⃣  Pushing to Docker Hub..."
echo "   Pushing: $DOCKER_USERNAME/$IMAGE_NAME:$TAG"
docker push "$DOCKER_USERNAME/$IMAGE_NAME:$TAG"
echo "✅ Push successful"

# Step 4: Push latest tag
echo ""
echo "4️⃣  Tagging and pushing as latest..."
docker tag "$DOCKER_USERNAME/$IMAGE_NAME:$TAG" "$DOCKER_USERNAME/$IMAGE_NAME:latest"
docker push "$DOCKER_USERNAME/$IMAGE_NAME:latest"
echo "✅ Latest tag pushed"

# Summary
echo ""
echo "========================================="
echo "✅ Docker push completed successfully!"
echo ""
echo "Images available on Docker Hub:"
echo "  🐳 $DOCKER_USERNAME/$IMAGE_NAME:$TAG"
echo "  🐳 $DOCKER_USERNAME/$IMAGE_NAME:latest"
echo ""
echo "Pull commands:"
echo "  docker pull $DOCKER_USERNAME/$IMAGE_NAME:$TAG"
echo "  docker pull $DOCKER_USERNAME/$IMAGE_NAME:latest"
echo ""
