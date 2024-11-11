#!/bin/bash
set -e

# Load configuration
source scripts/config.sh

echo "🚀 Deploying to VPS at ${VPS_IP}..."

# Build the Docker image
docker build -t ${APP_NAME} .

# Save and compress the image
docker save ${APP_NAME} | gzip > app.tar.gz

# Copy to VPS
scp -i ${VPS_SSH_KEY} app.tar.gz ${VPS_USER}@${VPS_IP}:/tmp/

# Deploy on VPS
ssh -i ${VPS_SSH_KEY} ${VPS_USER}@${VPS_IP} << EOF
    # Load the image
    docker load < /tmp/app.tar.gz
    
    # Stop existing container
    docker stop ${APP_NAME} || true
    docker rm ${APP_NAME} || true
    
    # Run new container
    docker run -d \
        --name ${APP_NAME} \
        --restart unless-stopped \
        -p ${APP_PORT}:80 \
        -p ${SSL_PORT}:443 \
        ${APP_NAME}

    # Cleanup
    rm /tmp/app.tar.gz
    docker image prune -f
EOF

echo "✅ Deployment complete!"
