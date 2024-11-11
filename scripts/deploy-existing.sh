#!/bin/bash
set -e

# Load environment variables
source .env.production

# Build the application
./scripts/build.sh

# Deploy to existing Lightsail instance
echo "📦 Deploying to Lightsail..."
scp deploy.tar.gz ubuntu@$LIGHTSAIL_IP:/tmp/
ssh ubuntu@$LIGHTSAIL_IP << 'EOF'
    # Create app directory if it doesn't exist
    sudo mkdir -p /var/www/ethical-hacking-platform
    sudo chown ubuntu:ubuntu /var/www/ethical-hacking-platform

    # Extract deployment package
    cd /var/www/ethical-hacking-platform
    tar xzf /tmp/deploy.tar.gz

    # Stop existing containers
    docker-compose -f docker-compose.prod.yml down || true

    # Build and start new containers
    docker-compose -f docker-compose.prod.yml build
    docker-compose -f docker-compose.prod.yml up -d

    # Clean up
    rm /tmp/deploy.tar.gz
    docker image prune -f
EOF

echo "✅ Deployment complete!" 