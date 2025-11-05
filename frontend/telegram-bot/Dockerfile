# syntax=docker/dockerfile:1.4
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --only=production

COPY . .

EXPOSE 3006

CMD ["npm", "start"]
