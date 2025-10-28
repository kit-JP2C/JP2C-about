# --- Build Stage ---
FROM node:24-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Runtime Stage ---
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

ENV PORT=4000
EXPOSE 4000

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

CMD ["node", "server.js"]