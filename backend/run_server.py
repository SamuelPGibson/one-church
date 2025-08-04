#!/usr/bin/env python
"""
Startup script for the Django backend with ASGI support for WebSockets.
This script ensures the server runs with proper ASGI configuration.
"""

import os
import sys
import django
from django.core.management import execute_from_command_line

if __name__ == "__main__":
    # Set up Django environment
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
    django.setup()
    
    # Run the development server with ASGI support
    # Use daphne or uvicorn for ASGI support
    try:
        # Try to use uvicorn if available
        import uvicorn
        from backend.asgi import application
        
        print("Starting Django server with ASGI support (uvicorn)...")
        print("WebSocket connections will be available at ws://localhost:8000/ws/")
        print("Press Ctrl+C to stop the server")
        
        uvicorn.run(
            "backend.asgi:application",
            host="127.0.0.1",
            port=8000,
            reload=True,
            log_level="info",
            ws="websockets"  # Explicitly specify websockets
        )
    except ImportError as e:
        print(f"uvicorn not found: {e}")
        print("Installing uvicorn with WebSocket support...")
        print("Run: pip install 'uvicorn[standard]' or pip install websockets")
        
        # Fallback to Django's development server (limited WebSocket support)
        print("Falling back to Django development server...")
        print("Note: WebSocket support may be limited with the development server")
        
        execute_from_command_line(['manage.py', 'runserver', '127.0.0.1:8000'])
    except Exception as e:
        print(f"Error starting server: {e}")
        print("Trying Django development server as fallback...")
        execute_from_command_line(['manage.py', 'runserver', '127.0.0.1:8000']) 