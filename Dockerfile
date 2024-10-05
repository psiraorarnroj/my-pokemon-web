FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json ./
RUN yarn install --frozen-lockfile

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NEXT_SHARP_PATH=/app/node_modules/sharp
ENV NODE_ENV=production
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./_next
EXPOSE 3000
CMD ["yarn", "start"]