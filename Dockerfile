# syntax=docker/dockerfile:1
# Using a minimal Alpine Linux base image
FROM node:alpine

WORKDIR /home/app/
# This assumes that `npm run build` was executed prior
COPY dist .
COPY package.json .
RUN npm i
RUN date > ./docker-build-date
# Application entrypoint here
CMD ["node", "App.js"]