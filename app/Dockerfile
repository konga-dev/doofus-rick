# syntax=docker/dockerfile:1

# ---------------------------
# Base image with Bun
# ---------------------------
FROM oven/bun:1 AS base
WORKDIR /app


# ---------------------------
# Dependencies stage
# ---------------------------
FROM base AS deps
WORKDIR /app-root

# Copy root manifest + lockfile
COPY package.json bun.lock ./

# Copy ONLY the workspace manifests (not full source yet!)
COPY app/package.json ./app/
COPY server/package.json ./server/

# Install dependencies for entire monorepo
RUN bun install --frozen-lockfile


# ---------------------------
# Builder stage
# ---------------------------
FROM base AS builder
WORKDIR /app

# Reuse installed deps
COPY --from=deps /app-root/node_modules ./node_modules
COPY --from=deps /app-root/bun.lock ./bun.lock

# Copy entire repo now (for build step)
COPY . .

# Build Next.js workspace (app)
WORKDIR /app/app
RUN bun run build


# ---------------------------
# Runner stage (production)
# ---------------------------
FROM oven/bun:1 AS runner
WORKDIR /app

ENV NODE_ENV=production

# Add unprivileged user
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Copy only needed build output
COPY --from=builder /app/app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Next.js