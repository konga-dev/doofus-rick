FROM node:20 AS build

WORKDIR /app
COPY web/ ./web/
COPY server/ ./server/

WORKDIR /app/server

WORKDIR /app/web
RUN npm install
RUN npm run build

FROM oven/bun:alpine AS release

WORKDIR /app/server
COPY --from=build /app/server ./
RUN bun install

WORKDIR /app/web
COPY --from=build /app/web ./
RUN bunx prisma generate

CMD ["next", "start"]
