# Ethical Hacking Learning Path Project

## Project Overview
A comprehensive web application designed to guide users through structured learning paths in ethical hacking, with progress tracking and interactive content delivery.

## Core Features

### 1. Learning Path Management
- Structured curriculum organization
- Progress tracking for each learning module
- Dynamic content delivery
- Interactive exercises and labs

### 2. Progress Tracking
- Visual progress indicators
- Completion status for each topic
- Learning path analytics
- Time spent tracking

### 3. Interactive Labs
- Containerized practice environments
- Real-time feedback
- Guided exercises
- Safety controls and monitoring

## Technical Architecture

### Frontend (React + TypeScript + Vite)
- Component-based UI architecture
- Real-time progress updates
- Interactive lab interface
- Progress visualization
- TypeScript for type safety
- Tailwind CSS for styling

### Backend (FastAPI + SQLite)
- RESTful API endpoints
- WebSocket support for real-time updates
- Lab environment management
- Progress data persistence
- User authentication/authorization
- Rate limiting and security controls

### Infrastructure
- Docker containers for isolation
- Docker Compose for orchestration
- Amazon Lightsail deployment
- Redis for caching
- Nginx reverse proxy

## Development Setup

### Prerequisites
- Docker and Docker Compose
- Node.js 18+
- Python 3.9+
- Make

### Getting Started
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
make setup

# Start development environment
make dev
```

### Makefile Commands
```makefile
setup           # Install all dependencies
run-backend    # Start FastAPI server
run-frontend   # Start Vite dev server
test-backend   # Run backend tests
test-frontend  # Run frontend tests
docker-up      # Start all containers
docker-down    # Stop all containers
```

## Database Schema

### Users
- id: UUID primary key
- username: string
- email: string
- password_hash: string
- created_at: timestamp
- updated_at: timestamp

### Progress
- id: UUID primary key
- user_id: UUID foreign key
- topic_id: UUID foreign key
- status: enum (not_started, in_progress, completed)
- completed_at: timestamp
- time_spent: integer

### Topics
- id: UUID primary key
- section_id: UUID foreign key
- title: string
- description: text
- order: integer
- prerequisites: array

### Sections
- id: UUID primary key
- title: string
- description: text
- order: integer

## API Endpoints

### Progress Tracking
```
GET /api/v1/progress
POST /api/v1/progress/{topic_id}
PUT /api/v1/progress/{topic_id}
```

### Content Management
```
GET /api/v1/sections
GET /api/v1/sections/{section_id}/topics
GET /api/v1/topics/{topic_id}
```

### Lab Environment
```
POST /api/v1/labs/start
POST /api/v1/labs/stop
GET /api/v1/labs/status
```

## Security Considerations

### Application Security
- Input validation
- CSRF protection
- Rate limiting
- SQL injection prevention
- XSS protection

### Lab Environment Security
- Isolated containers
- Resource limitations
- Network segmentation
- Activity monitoring
- Automated cleanup

## Deployment

### Docker Setup
```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
    
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
    environment:
      - DATABASE_URL=sqlite:///./app.db
      
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
```

### Production Deployment
1. Set up Amazon Lightsail instance
2. Configure DNS and SSL
3. Set up CI/CD pipeline
4. Configure monitoring and logging
5. Implement backup strategy

## Testing Strategy

### Frontend Testing
- Component tests
- Integration tests
- End-to-end tests
- Performance testing

### Backend Testing
- Unit tests
- API tests
- Integration tests
- Load testing

## Monitoring and Logging

### Application Monitoring
- Error tracking
- Performance metrics
- User activity
- Resource usage

### Lab Environment Monitoring
- Container health
- Resource utilization
- Security events
- User activity

## Development Workflow

1. Feature branches from main
2. PR review process
3. Automated testing
4. Staging deployment
5. Production deployment

## Contributing Guidelines

1. Fork the repository
2. Create feature branch
3. Follow code style guidelines
4. Write tests
5. Submit PR

## License
MIT License