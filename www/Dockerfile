FROM mhart/alpine-node:12 AS builder
WORKDIR /www
COPY package.json .
RUN yarn
COPY . .
RUN yarn build && yarn --production

FROM mhart/alpine-node:12
WORKDIR /www
COPY --from=builder /www .
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]