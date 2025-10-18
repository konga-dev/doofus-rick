FROM oven/bun:1-alpine AS base
WORKDIR /home/app

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

FROM base AS pre-release
COPY . .

ENV NODE_ENV=production
COPY --from=install /temp/dev/node_modules ./node_modules
RUN bun run prisma
RUN bun run build

FROM base AS release
COPY --from=pre-release /home/app/node_modules /home/app/node_modules
COPY --from=pre-release /home/app/src /home/app/src
COPY --from=pre-release /home/app/prisma /home/app/prisma
COPY --from=pre-release /home/app/package.json .

RUN date > ./docker-build-date
CMD [ "bun", "run", "src/App.ts" ]