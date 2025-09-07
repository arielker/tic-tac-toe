# --- Builder stage ---
FROM node:18-alpine AS builder
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci

# Copy TS config + source
COPY tsconfig.json ./
COPY src ./src

# Build TS → JS
RUN npm run build

# --- Runner stage ---
FROM node:18-alpine AS runner
WORKDIR /app

# Only production deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built code
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/server.js"]
