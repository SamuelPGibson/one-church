# WebSocket Setup Guide

This guide will help you set up and run the Django backend with WebSocket support for the One Church application.

## Prerequisites

- Python 3.8 or higher
- PostgreSQL database (already configured in settings.py)
- Windows PowerShell or Command Prompt

## Quick Start (Windows)

### Option 1: Using the Batch Script (Recommended)
1. Open Command Prompt (not PowerShell)
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Run the batch script:
   ```
   start_server.bat
   ```

### Option 2: Using PowerShell Script
1. Open PowerShell
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Run the PowerShell script:
   ```
   .\start_server.ps1
   ```

### Option 3: Manual Setup
1. Open Command Prompt or PowerShell
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Create and activate virtual environment:
   ```
   python -m venv venv
   venv\Scripts\activate
   ```
4. Install requirements:
   ```
   pip install -r requirements.txt
   ```
5. Run migrations:
   ```
   python manage.py migrate
   ```
6. Start the server:
   ```
   python run_server.py
   ```

## What the Scripts Do

The startup scripts automatically:
- Create a virtual environment if it doesn't exist
- Activate the virtual environment
- Install/update all required dependencies
- Run database migrations
- Start the Django server with ASGI support using uvicorn

## WebSocket URLs

Once the server is running, WebSocket connections will be available at:
- Comments: `ws://localhost:8000/ws/comments/{post_id}/`
- Replies: `ws://localhost:8000/ws/replies/{parent_id}/`

## Troubleshooting

### "WebSocket is closed before the connection is established"

This error typically occurs when:
1. **Server not running with ASGI support**: Make sure you're using `python run_server.py` instead of `python manage.py runserver`
2. **Virtual environment not activated**: Ensure the virtual environment is activated before running the server
3. **Missing dependencies**: Run `pip install -r requirements.txt` to install all dependencies
4. **Database not migrated**: Run `python manage.py migrate` to set up the database

### "Module not found" errors

If you get import errors:
1. Make sure the virtual environment is activated
2. Reinstall requirements: `pip install -r requirements.txt`
3. Check that all dependencies are installed: `pip list`

### Connection refused errors

If you can't connect to the WebSocket:
1. Make sure the Django server is running on port 8000
2. Check that the server started without errors
3. Verify the WebSocket URL in the frontend matches the backend routing

## Development Tips

- The server uses an in-memory channel layer for development (no Redis required)
- Logs will show WebSocket connection attempts and any errors
- Use the browser's developer tools to monitor WebSocket connections
- The frontend will automatically reconnect if the connection is lost

## Production Notes

For production deployment:
- Use Redis as the channel layer backend
- Set up proper SSL/TLS for secure WebSocket connections (wss://)
- Configure proper logging and monitoring
- Use a production ASGI server like Daphne or uvicorn with gunicorn 