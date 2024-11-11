#!/bin/bash
set -e

echo "🏗️ Building for production..."

# Install dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
npm run build
cd ..

echo "Installing backend dependencies..."
cd backend
pip install -r requirements.txt
cd ..

# Create production build package
echo "Creating deployment package..."
tar -czf deploy.tar.gz \
    frontend/dist \
    backend \
    docker-compose.prod.yml \
    .env.production \
    infra/nginx \
    Dockerfile \
    scripts/start.sh

echo "✅ Build complete!" 