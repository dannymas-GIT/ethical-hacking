# Build frontend
FROM node:18-alpine as frontend-build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Build backend
FROM python:3.9-slim
WORKDIR /app

# Install Nginx
RUN apt-get update && apt-get install -y nginx

# Copy frontend build
COPY --from=frontend-build /app/dist /usr/share/nginx/html

# Setup backend
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ .

# Copy Nginx config
COPY infra/nginx/nginx.conf /etc/nginx/nginx.conf

# Start script
COPY scripts/start-prod.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80
CMD ["/start.sh"] 