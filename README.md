# CopilotKit Direct-to-LLM Example

A complete example demonstrating how to integrate CopilotKit with a custom AI agent using direct-to-LLM communication.

## Architecture

This example consists of three components:

- **Frontend**: React + Vite app with CopilotKit UI components
- **Middleware**: Express.js server that bridges CopilotKit and the AI agent
- **Agent**: FastAPI server with Pydantic AI agent using Google Gemini

## Quick Start

### Prerequisites

- Docker and Docker Compose
- Google API key for Gemini [Get one for free](https://aistudio.google.com/)

### Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd copilotkit-direct-to-llm-example
   ```

2. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Google API key:

   ```
   GOOGLE_API_KEY=your_google_api_key_here
   ```

3. Start all services:

   ```bash
   docker-compose up
   ```

4. Open your browser to http://localhost:4173

That's it! All three services will be running and connected.

## Services

- **Frontend**: http://localhost:4173
- **Middleware**: http://localhost:4000/graphql
- **Agent**: http://localhost:8000

## Development

### Docker Commands

```bash
# Start all services
docker-compose up

# Start with rebuild
docker-compose up --build

# Start in background
docker-compose up -d

# Stop services
docker-compose down
```

### Individual Service Development

See each component's directory for individual development instructions:

- [React Frontend](./react-frontend-client/)
- [CopilotKit Middleware](./copilotkit-direct-to-llm-middleware/)
- [Pydantic AI Agent](./pydantic-ai-agent/)

## How It Works

1. The React frontend uses CopilotKit UI components to provide a chat interface
2. User messages are sent to the middleware via GraphQL
3. The middleware forwards requests to the Pydantic AI agent using the AG-UI protocol
4. The agent processes requests using Google Gemini
5. Responses flow back through the middleware to the frontend

### 📸 **Screenshots**

<img width="1283" height="731" alt="Screenshot 2025-11-10 at 9 07 31 PM" src="https://github.com/user-attachments/assets/ac8a7da3-6f5e-43d6-91c5-d5b6406f0fe0" />

<img width="1422" height="765" alt="Screenshot 2025-11-10 at 9 07 08 PM" src="https://github.com/user-attachments/assets/b49d27a6-49c8-4937-9446-f8dcb437cef5" />
