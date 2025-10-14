"""FastAPI server with Pydantic AI AG-UI integration."""
from agent import app as ag_ui_app

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn




# Create FastAPI app
app = FastAPI(
    title="Pydantic AI AG-UI Server",
    description="A basic FastAPI server with Pydantic AI AG-UI integration",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/ag-ui", ag_ui_app)


@app.get("/")
async def root():
    """Root endpoint with server information."""
    return {
        "message": "Pydantic AI AG-UI Server",
        "ag_ui_endpoint": "/ag-ui",
        "documentation": "/docs"
    }


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "healthy"}


if __name__ == "__main__":
    # Check if GOOGLE_API_KEY is set
    if not os.getenv("GOOGLE_API_KEY"):
        print("Warning: GOOGLE_API_KEY environment variable is not set!")
        print("Please set it with: export GOOGLE_API_KEY=your_api_key_here")
        print("Get your API key from: https://aistudio.google.com/app/api-keys")
    
    print("\n🚀 Starting Pydantic AI AG-UI Server...")
    print("📍 Server: http://localhost:8000")
    print("🤖 AG-UI endpoint: http://localhost:8000/ag-ui")
    print("📚 API docs: http://localhost:8000/docs\n")
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
