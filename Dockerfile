FROM node:22-alpine

WORKDIR /app

COPY ./ .

RUN npm install -g corepack \
  && corepack enable \
  && pnpm install --frozen-lockfile \
  && pnpm run build
ENV NODE_ENV=production

CMD ["pnpm", "run" ,"start"]
EXPOSE 3000
