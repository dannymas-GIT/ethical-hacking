#!/bin/bash
# Start backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 &

# Start Nginx
nginx -g 'daemon off;' 