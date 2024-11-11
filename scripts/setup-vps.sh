#!/bin/bash
set -e

# Load environment variables
source .env.production

# Setup VPS
ssh ubuntu@$LIGHTSAIL_IP << 'EOF'
    # Update system
    sudo apt-get update
    sudo apt-get upgrade -y

    # Install Git if not present
    if ! command -v git &> /dev/null; then
        sudo apt-get install -y git
    fi

    # Install Docker and Docker Compose if not present
    if ! command -v docker &> /dev/null; then
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        sudo usermod -aG docker ubuntu
    fi

    if ! command -v docker-compose &> /dev/null; then
        sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
    fi

    # Setup application directory
    sudo mkdir -p /var/www/ethical-hacking-platform
    sudo chown ubuntu:ubuntu /var/www/ethical-hacking-platform

    # Clone repository if not exists
    if [ ! -d "/var/www/ethical-hacking-platform/.git" ]; then
        git clone https://github.com/yourusername/ethical-hacking-platform.git /var/www/ethical-hacking-platform
    fi

    # Setup SSL with Let's Encrypt
    if [ ! -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem ]; then
        sudo apt-get install -y certbot
        sudo certbot certonly --standalone -d $DOMAIN
    fi

    # Link SSL certificates
    sudo mkdir -p /var/www/ethical-hacking-platform/infra/nginx/ssl
    sudo ln -sf /etc/letsencrypt/live/$DOMAIN/fullchain.pem /var/www/ethical-hacking-platform/infra/nginx/ssl/cert.pem
    sudo ln -sf /etc/letsencrypt/live/$DOMAIN/privkey.pem /var/www/ethical-hacking-platform/infra/nginx/ssl/key.pem
EOF

echo "✅ VPS Setup complete!" 