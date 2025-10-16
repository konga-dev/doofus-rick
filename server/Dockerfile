FROM oven/bun:latest AS base
WORKDIR /app

FROM base AS deps
COPY package.json ./
COPY bun.lock ./
COPY apps ./apps/
COPY packages ./packages/
RUN bun install --frozen-lockfile

FROM node:24-alpine AS pre-release
WORKDIR /app
COPY --from=deps /app/node_modules .
COPY --from=deps /app/bun.lock .
COPY --from=deps /app/package.json .
COPY --from=deps /app/apps/server ./apps/server
COPY --from=deps /app/packages/prisma ./packages/prisma

RUN cd /app/packages/prisma && npx prisma generate

FROM base AS release
COPY --from=pre-release /app/node_modules .
COPY --from=pre-release /app/apps/server ./apps/server
COPY --from=pre-release /app/packages/prisma ./packages/prisma
COPY --from=pre-release /app/package.json .
RUN date > ./docker-build-date
CMD [ "bun", "run", "/app/apps/server/src/App.ts" ]