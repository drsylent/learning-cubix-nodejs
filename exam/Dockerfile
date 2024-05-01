FROM node:20-alpine

ENV NODE_ENV=production

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY node_modules node_modules
COPY assets assets
COPY views views
COPY src src

ENTRYPOINT exec node src/index.js
