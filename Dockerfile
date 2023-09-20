FROM node:18-alpine

WORKDIR /app

COPY ./ .

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm run build
ENV NODE_ENV=production

CMD ["pnpm", "run" ,"start"]
EXPOSE 3000