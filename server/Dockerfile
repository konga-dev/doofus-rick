FROM oven/bun:alpine AS base

WORKDIR /app

COPY web/ ./web/
COPY server/ ./server/

WORKDIR /app/server/

RUN bun install
RUN bun build ./index.ts --target bun

FROM base AS runtime

WORKDIR /app/server

RUN date > ./docker-build-date
CMD ["bun", "run", "index.ts"]
