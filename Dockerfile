FROM node:22-alpine

WORKDIR /app

COPY ./ .

RUN npm install -g corepack
RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm run build
ENV NODE_ENV=production

CMD ["pnpm", "run" ,"start"]
EXPOSE 3000
