FROM node:12.15.0-alpine3.11

COPY package.json migrate.js migrations /app/
RUN yarn
COPY . /app/

ENTRYPOINT [ "node migrate.js" ]