#!/bin/bash
set -e

# Configuration
VPS_USER="user"  # or your VPS username
VPS_IP="35.153.153.217"
APP_NAME="ethical-hacking-platform"

echo "🚀 Building and deploying to VPS..."

# Build the application
echo "Building Docker image..."
docker build -t $APP_NAME .

# Save the image
echo "Saving Docker image..."
docker save $APP_NAME | gzip > app.tar.gz

# Copy to VPS
echo "Copying to VPS..."
scp app.tar.gz $VPS_USER@$VPS_IP:/tmp/

# Deploy on VPS
echo "Deploying on VPS..."
ssh $VPS_USER@$VPS_IP << EOF
    # Load the image
    docker load < /tmp/app.tar.gz

    # Stop existing container
    docker stop $APP_NAME || true
    docker rm $APP_NAME || true

    # Run new container
    docker run -d \
        --name $APP_NAME \
        --restart unless-stopped \
        -p 80:80 \
        -p 443:443 \
        $APP_NAME

    # Cleanup
    rm /tmp/app.tar.gz
    docker image prune -f
EOF

# Cleanup local files
rm app.tar.gz

echo "✅ Deployment complete!" 