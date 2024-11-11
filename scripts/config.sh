#!/bin/bash

# VPS Configuration
export VPS_IP="your_vps_ip_here"
export VPS_USER="ubuntu"
export VPS_SSH_KEY="~/.ssh/your_key.pem"

# Application Configuration
export APP_NAME="ethical-hacking-platform"
export APP_PORT=80
export SSL_PORT=443

# Database Configuration
export DB_PATH="/app/data/app.db"

# Deployment paths
export DEPLOY_PATH="/var/www/${APP_NAME}"
export BACKUP_PATH="/var/backups/${APP_NAME}" 