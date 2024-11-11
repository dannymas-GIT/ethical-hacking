#!/bin/bash
set -e

# Load environment variables
source .env.production

# Ensure we're on main branch
git checkout main

# Push to GitHub
echo "📦 Pushing to GitHub..."
git push origin main

# Deploy to VPS
echo "🚀 Deploying to VPS..."
ssh ubuntu@$LIGHTSAIL_IP << 'EOF'
    cd /var/www/ethical-hacking-platform
    git pull origin main
    
    # Build and restart containers
    docker-compose -f docker-compose.prod.yml down
    docker-compose -f docker-compose.prod.yml build
    docker-compose -f docker-compose.prod.yml up -d
    
    # Cleanup
    docker image prune -f
EOF

echo "✅ Deployment complete!" 