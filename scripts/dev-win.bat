@echo off
echo 🚀 Starting development environment...

:: Start Docker containers
docker compose -f docker-compose.dev.yml up --build -d

:: Wait for containers to be ready
timeout /t 5

:: Show logs
docker compose -f docker-compose.dev.yml logs -f

:: Cleanup on exit
:cleanup
docker compose -f docker-compose.dev.yml down 