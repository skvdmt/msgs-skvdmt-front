FROM node:22-alpine AS builder
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
EXPOSE 8000
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8000
COPY --from=builder /src/.output ./.output
CMD ["node", ".output/server/index.mjs"]
