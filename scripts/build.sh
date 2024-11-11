#!/bin/bash
set -e

echo "🏗️ Building application..."

# Build frontend
echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Create deployment package
echo "Creating deployment package..."
tar -czf deploy.tar.gz \
    frontend/dist \
    backend \
    docker-compose.prod.yml \
    .env.production \
    infra/nginx \
    scripts/deploy.sh 