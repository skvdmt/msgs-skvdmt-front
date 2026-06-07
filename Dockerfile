FROM node:22.20-alpine AS builder
WORKDIR /usr/src/msgs-skvdmt-front
EXPOSE 8000
COPY . .
RUN npm install
RUN npm run build

FROM skvdmt/serve:latest
WORKDIR /usr/local/bin
COPY --from=builder /usr/src/msgs-skvdmt-front/dist/. /var/www/html
EXPOSE 8000
ENTRYPOINT [ "serve" ]
