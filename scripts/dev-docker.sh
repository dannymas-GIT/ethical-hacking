#!/bin/bash
set -e

echo "🚀 Starting development environment..."

# Build and start containers
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up

# Cleanup on exit
trap 'docker-compose -f docker-compose.dev.yml down' EXIT 