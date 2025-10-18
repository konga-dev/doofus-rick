FROM oven/bun:1-alpine AS base
WORKDIR /home/app

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

FROM base AS pre-release
COPY . .

ENV NODE_ENV=production
RUN cd web && bun run build

FROM base AS release
COPY --from=pre-release /home/app/ .

EXPOSE 3000
WORKDIR /home/app/web
CMD [ "bun", "run", "start" ]