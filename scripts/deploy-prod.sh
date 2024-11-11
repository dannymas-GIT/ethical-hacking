#!/bin/bash
set -e

# Load environment variables
source .env.production

# Build the application
./scripts/build-prod.sh

# Deploy to Lightsail
echo "🚀 Deploying to Lightsail..."
scp deploy.tar.gz ubuntu@$LIGHTSAIL_IP:/tmp/
ssh ubuntu@$LIGHTSAIL_IP << 'EOF'
    # Stop existing containers
    cd /var/www/ethical-hacking-platform
    docker-compose -f docker-compose.prod.yml down || true

    # Extract new build
    tar xzf /tmp/deploy.tar.gz -C /var/www/ethical-hacking-platform

    # Build and start containers
    docker-compose -f docker-compose.prod.yml build
    docker-compose -f docker-compose.prod.yml up -d

    # Cleanup
    rm /tmp/deploy.tar.gz
    docker image prune -f
EOF

echo "✅ Deployment complete!" 