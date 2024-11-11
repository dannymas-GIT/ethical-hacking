#!/bin/sh
# Start backend
cd /app/backend
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000 &

# Start nginx
nginx -g 'daemon off;' 