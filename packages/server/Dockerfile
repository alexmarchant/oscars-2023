FROM node:16.16.0-alpine as depths_builder

RUN npm install -g pnpm

COPY pnpm-* package.json ./
COPY packages/server packages/server
COPY packages/shared packages/shared

RUN pnpm install

RUN cd packages/server && npm run build

CMD ["node", "./packages/server/dist/index.js"]