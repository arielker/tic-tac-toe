# client/Dockerfile
# --- build stage ---
FROM node:18-alpine AS builder
WORKDIR /app
# install deps (cache package.json separately)
COPY package.json package-lock.json* ./
RUN npm ci --silent
COPY . .
# If you use VITE, change build command accordingly
RUN npm run build

# --- production stage ---
FROM nginx:stable-alpine
# remove default nginx N rm -rf /usr/share/nginx/html/*
# copy built files
COPY --from=builder /app/build /usr/share/nginx/html
# copy custom nginx config (optional - for SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
