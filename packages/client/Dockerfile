FROM node:16.16.0-alpine as depths_builder

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY pnpm-* package.json ./
COPY packages/shared packages/shared
COPY packages/client packages/client
COPY packages/server packages/server
RUN pnpm install

WORKDIR /usr/src/app/packages/shared
RUN npm run build

WORKDIR /usr/src/app/packages/server
RUN npx prisma generate
RUN npm run build

ARG VITE_TRPC_ENDPOINT
WORKDIR /usr/src/app/packages/client
RUN npm run build

CMD ["npm", "run", "start"]