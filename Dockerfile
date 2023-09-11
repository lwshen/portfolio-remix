FROM node:16-alpine

WORKDIR /app

COPY ./ .

RUN pnpm install --frozen-lockfile
RUN pnpm run build
ENV NODE_ENV=production

CMD ["yarn", "run" ,"start"]
EXPOSE 3000