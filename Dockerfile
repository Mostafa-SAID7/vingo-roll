# Multi-stage Dockerfile for Vingo Roll Studio
# Stage 1: Build environment
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (use legacy-peer-deps for compatibility)
RUN npm ci --legacy-peer-deps && \
    npm cache clean --force

# Copy source code
COPY . .

# Run quality checks
RUN npm run lint && \
    npm run build

# Stage 2: Production environment
FROM node:20-alpine

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy built application from builder
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nodejs:nodejs /app/package-lock.json ./package-lock.json

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start application
CMD ["node", "-e", "require('http').createServer((req, res) => { res.writeHead(200, {'Content-Type': 'text/html'}); res.end(require('fs').readFileSync('./dist/index.html')); }).listen(3000, () => console.log('Server running on port 3000'))"]
