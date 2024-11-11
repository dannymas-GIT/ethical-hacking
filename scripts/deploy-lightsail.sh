#!/bin/bash
set -e

# Load environment variables
source .env.production

# Build the Docker image
echo "🏗️ Building Docker image..."
docker build -t ethical-hacking-platform .

# Save the image
echo "💾 Saving Docker image..."
docker save ethical-hacking-platform | gzip > ethical-hacking-platform.tar.gz

# Copy to Lightsail
echo "📤 Copying to Lightsail..."
scp ethical-hacking-platform.tar.gz ubuntu@$LIGHTSAIL_IP:/tmp/

# Deploy on Lightsail
echo "🚀 Deploying on Lightsail..."
ssh ubuntu@$LIGHTSAIL_IP << 'EOF'
    # Load the image
    docker load < /tmp/ethical-hacking-platform.tar.gz

    # Stop existing container
    docker stop ethical-hacking-platform || true
    docker rm ethical-hacking-platform || true

    # Run new container
    docker run -d \
        --name ethical-hacking-platform \
        --restart unless-stopped \
        -p 80:80 \
        -p 443:443 \
        ethical-hacking-platform

    # Cleanup
    rm /tmp/ethical-hacking-platform.tar.gz
    docker image prune -f
EOF

echo "✅ Deployment complete!" 