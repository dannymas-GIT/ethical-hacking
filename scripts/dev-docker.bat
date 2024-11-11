@echo off
echo 🚀 Starting development environment...

:: Stop and remove existing containers
docker-compose -f docker-compose.dev.yml down

:: Build and start containers
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up

:: Note: Ctrl+C to stop the containers
:: The containers will be stopped and removed automatically 