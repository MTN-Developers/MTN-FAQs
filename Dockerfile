# Stage 1: Build
FROM oven/bun:1 as builder
WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies with no verification
RUN bun install --no-verify

# Copy source files
COPY . .

# Build the application
RUN bun run build

# Stage 2: Production
FROM oven/bun:1-slim
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV NODE_ENV=production \
    PORT=3000

CMD ["bun", "server.js"]
