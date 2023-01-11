FROM node:16-alpine

WORKDIR /app

COPY ./ .

RUN yarn install --frozen-lockfile
RUN yarn run build
ENV NODE_ENV=production

CMD ["yarn", "run" ,"start"]
EXPOSE 3000