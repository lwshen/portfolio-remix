FROM node:16-alpine

WORKDIR /app

COPY ./package.json ./
RUN pnpm install

COPY ./ .

RUN npm install -g pnpm
RUN pnpm run build
ENV NODE_ENV=production

CMD ["pnpm", "run" ,"start"]
EXPOSE 3000