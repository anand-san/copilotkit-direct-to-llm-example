# CopilotKit Direct-to-LLM Example

A complete example demonstrating how to integrate CopilotKit with a custom AI agent using direct-to-LLM communication.

## Architecture

This example consists of three components:

- **Frontend**: React + Vite app with CopilotKit UI components
- **Middleware**: Express.js server that bridges CopilotKit and the AI agent
- **Agent**: FastAPI server with Pydantic AI agent using Google Gemini

## How It Works

1. The React frontend uses CopilotKit UI components to provide a chat interface
2. User messages are sent to the middleware via GraphQL
3. The middleware forwards requests to the Pydantic AI agent using the AG-UI protocol
4. The agent processes requests using Google Gemini
5. Responses flow back through the middleware to the frontend

## Quick Start

### Prerequisites

- Google API key for Gemini [Get one for free](https://aistudio.google.com/)

### Setup

- Clone the repository:

  ```bash
  git clone https://github.com/anand-san/copilotkit-direct-to-llm-example
  cd copilotkit-direct-to-llm-example
  ```

### Setup Using Docker

1. Set up environment variables (in root folder where docker-compose file is):

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Google API key:

   ```
   GOOGLE_API_KEY=your_google_api_key_here
   ```

2. Start all services:

   ```bash
   docker-compose up
   ```

3. Open your browser to http://localhost:4173

That's it! All three services will be running and connected.

### Manual Setup

Dependencies

- Python and pip
- Node and npm

1. Pydantic AI AGUI backend

   1. Add GEMINI API key into env
      ```bash
      cp .env.example .env
      ```
   2. Replace the key with your GEMINI key
   3. Start Agent
      ```bash
      cd pydantic-ai-agent
      pip install -r requirements.txt
      python main.py
      ```

   - This will start the pydantic backend with agui server at port http://localhost:8000/ag-ui

1. Copilotkit diret to llm middleware

   1. Add AGENT URL into env (where the agui server is running)

      ```bash
      touch .env
      AGENT_URL=http://localhost:8000/ag-ui
      ```

   2. Start copilot middleware
      ```bash
      cd copilotkit-direct-to-llm-middleware
      npm install
      npm run dev
      ```

   - This will start copilotkit agui middleware at http://localhost:4000/graphql which will talk to your backend/frontend

1. Frontend react app
   1. Add GEMINI API key into env
      ```bash
      cp .env.example .env
      set VITE_COPILOTKIT_AGUI_URL=http://localhost:4000/graphql
      ```
   2. Start frontend server
      ```bash
      cd react-frontend-client
      npm install
      npm start
      ```
   - This will start the react server at http://localhost:5173

Thats it

## Services

- **Frontend**: http://localhost:5173 (4173 in case of docker compose setup)
- **Middleware**: http://localhost:4000/graphql
- **Agent**: http://localhost:8000

## How It Works

1. The React frontend uses CopilotKit UI components to provide a chat interface
2. User messages are sent to the middleware via GraphQL
3. The middleware forwards requests to the Pydantic AI agent using the AG-UI protocol
4. The agent processes requests using Google Gemini
5. Responses flow back through the middleware to the frontend

### Individual Service Development

See each component's directory for individual development instructions:

- [React Frontend](./react-frontend-client/)
- [CopilotKit Middleware](./copilotkit-direct-to-llm-middleware/)
- [Pydantic AI Agent](./pydantic-ai-agent/)

### 📸 **Screenshots**

<img width="1283" height="731" alt="Screenshot 2025-11-10 at 9 07 31 PM" src="https://github.com/user-attachments/assets/ac8a7da3-6f5e-43d6-91c5-d5b6406f0fe0" />

<img width="1422" height="765" alt="Screenshot 2025-11-10 at 9 07 08 PM" src="https://github.com/user-attachments/assets/b49d27a6-49c8-4937-9446-f8dcb437cef5" />
