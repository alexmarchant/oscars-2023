FROM node:16.16.0-alpine as depths_builder

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY pnpm-* package.json ./
COPY packages/server packages/server
COPY packages/shared packages/shared

RUN pnpm install

WORKDIR /usr/src/app/packages/server

RUN npx prisma generate

RUN npm run build

CMD ["node", "dist/index.js"]