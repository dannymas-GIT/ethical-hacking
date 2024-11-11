Write-Host "🚀 Starting development environment..." -ForegroundColor Green

try {
    # Start Docker containers
    docker compose -f docker-compose.dev.yml up --build -d

    # Wait for containers to be ready
    Start-Sleep -Seconds 5

    # Show logs
    docker compose -f docker-compose.dev.yml logs -f
}
finally {
    # Cleanup on exit
    docker compose -f docker-compose.dev.yml down
} 