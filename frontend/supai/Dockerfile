# syntax=docker/dockerfile:1.4
FROM node:20-alpine AS builder

WORKDIR /app

# Accept build-time arguments for NEXT_PUBLIC_ variables
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_BETTER_AUTH_URL
ARG NEXT_PUBLIC_TELEGRAM_BOT_USERNAME

# Set them as environment variables during build
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_BETTER_AUTH_URL=${NEXT_PUBLIC_BETTER_AUTH_URL}
ENV NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=${NEXT_PUBLIC_TELEGRAM_BOT_USERNAME}

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .

# Clear Next.js build cache to ensure fresh build with correct env vars
RUN rm -rf .next/cache

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --only=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
