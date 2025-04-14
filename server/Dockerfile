FROM oven/bun:1-alpine AS base
WORKDIR /home/app

# Install dependencies into temporary directory.
# This will chache required dependencies and thus speed up future builds.
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Copy node_modules from temporary directory and all other non-ignored project files into the image.
FROM base AS pre-release
COPY . .

# Build
ENV NODE_ENV=production
RUN bun run build
RUN bun run prisma

# Copy production dependencies and source code into the final image.
FROM base AS release
COPY --from=install /temp/dev/node_modules node_modules
COPY --from=pre-release /home/app/src/ .
COPY --from=pre-release /home/app/package.json .

RUN date > ./docker-build-date
CMD [ "bun", "run", "App.ts" ]
