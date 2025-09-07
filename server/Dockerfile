# server/Dockerfile
# build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* tsconfig.json ./
RUN npm ci --silent
COPY ./src ./src
# compile TypeScript to /app/dist
RUN npm run build

# runtime stage
FROM node:18-alpine
WORKDIR /app
# production deps only
COPY package.json package-lock.json* ./
RUN npm ci --only=production --silent
COPY --from=builder /app/dist ./dist
# expose port used by server
ENV PORT=4000
EXPOSE 4000
CMD ["node", "dist/server.js"]
