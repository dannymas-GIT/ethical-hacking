#!/bin/bash
set -e

# Load environment variables
source .env.production

# Install dependencies on Lightsail
ssh ubuntu@$LIGHTSAIL_IP << 'EOF'
    # Update system
    sudo apt-get update
    sudo apt-get upgrade -y

    # Install Docker
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker ubuntu

    # Install SSL certificates
    sudo apt-get install -y certbot
    sudo certbot certonly --standalone -d $DOMAIN

    # Create SSL directory
    sudo mkdir -p /etc/nginx/ssl
    sudo ln -sf /etc/letsencrypt/live/$DOMAIN/fullchain.pem /etc/nginx/ssl/cert.pem
    sudo ln -sf /etc/letsencrypt/live/$DOMAIN/privkey.pem /etc/nginx/ssl/key.pem
EOF

echo "✅ Lightsail setup complete!" 