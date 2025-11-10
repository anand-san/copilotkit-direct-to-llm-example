# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a three-component CopilotKit example demonstrating direct-to-LLM integration:

1. **react-frontend-client/** - React + Vite frontend with CopilotKit UI components
2. **copilotkit-direct-to-llm-middleware/** - Express.js middleware bridging CopilotKit and the AI agent
3. **pydantic-ai-agent/** - FastAPI server with Pydantic AI agent using Google Gemini

### Component Flow
- React client connects to middleware via GraphQL endpoint
- Middleware forwards requests to Pydantic AI agent via AG-UI protocol
- Agent processes requests using Google Gemini model with custom tools

## Development Commands

### Docker Compose (Recommended)
```bash
# Copy environment file and set your Google API key
cp .env.example .env
# Edit .env and add your GOOGLE_API_KEY

# Start all services (backends + frontend)
docker-compose up

# Start with rebuild
docker-compose up --build

# Start in background
docker-compose up -d

# Stop services
docker-compose down
```

After running `docker-compose up`, all services will be available:
- **Frontend**: http://localhost:5173
- **Middleware**: http://localhost:4000
- **Agent**: http://localhost:8000

### Individual Services

#### React Frontend (react-frontend-client/)
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production  
npm run build

# Lint code
npm run lint
```

#### CopilotKit Middleware (copilotkit-direct-to-llm-middleware/)
```bash
# Install dependencies
npm install

# Development server with hot reload
npm run dev

# Run directly
npm run start
```

#### Pydantic AI Agent (pydantic-ai-agent/)
```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set Google API key
export GOOGLE_API_KEY=your_api_key_here

# Run server
python main.py
```

## Key Configuration

- **Frontend runs on**: http://localhost:5173 (Vite default)
- **Middleware runs on**: http://localhost:4000
- **Agent runs on**: http://localhost:8000
- **GraphQL endpoint**: http://localhost:4000/graphql
- **Agent AG-UI endpoint**: http://localhost:8000/ag-ui

The React app expects `VITE_COPILOTKIT_AGUI_URL` environment variable pointing to the middleware GraphQL endpoint.

## Important Implementation Details

- Middleware uses `EmptyAdapter` and `HttpAgent` to proxy requests
- Agent includes a `current_time` tool for timezone-aware time queries
- React app uses `CopilotSidebar` component for the chat interface
- All components use CORS configuration for cross-origin requests