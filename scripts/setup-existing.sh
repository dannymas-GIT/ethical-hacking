#!/bin/bash
set -e

# Load environment variables
source .env.production

# Install dependencies on Lightsail instance
ssh ubuntu@$LIGHTSAIL_IP << 'EOF'
    # Update package list
    sudo apt-get update

    # Install Docker if not already installed
    if ! command -v docker &> /dev/null; then
        echo "Installing Docker..."
        sudo apt-get install -y \
            apt-transport-https \
            ca-certificates \
            curl \
            gnupg \
            lsb-release

        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

        echo \
          "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
          $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

        sudo apt-get update
        sudo apt-get install -y docker-ce docker-ce-cli containerd.io
    fi

    # Install Docker Compose if not already installed
    if ! command -v docker-compose &> /dev/null; then
        echo "Installing Docker Compose..."
        sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
    fi

    # Create application directory
    sudo mkdir -p /var/www/ethical-hacking-platform
    sudo chown ubuntu:ubuntu /var/www/ethical-hacking-platform

    # Setup SSL with Let's Encrypt if not already done
    if [ ! -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem ]; then
        echo "Setting up SSL..."
        sudo apt-get install -y certbot
        sudo certbot certonly --standalone -d $DOMAIN
    fi

    # Create Nginx SSL directory
    sudo mkdir -p /var/www/ethical-hacking-platform/infra/nginx/ssl
    sudo ln -sf /etc/letsencrypt/live/$DOMAIN/fullchain.pem /var/www/ethical-hacking-platform/infra/nginx/ssl/cert.pem
    sudo ln -sf /etc/letsencrypt/live/$DOMAIN/privkey.pem /var/www/ethical-hacking-platform/infra/nginx/ssl/key.pem
EOF

echo "✅ Setup complete!" 