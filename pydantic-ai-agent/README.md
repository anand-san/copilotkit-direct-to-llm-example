# Pydantic AI AG-UI Server

A basic FastAPI server with Pydantic AI AG-UI integration demonstrating agent-user interaction.

## Features

- ✨ Pydantic AI agent with Google Gemini integration
- 🔧 Server-side tools (current time lookup)
- 🌐 AG-UI protocol support for client-side tools
- 🚀 FastAPI server with CORS enabled
- 📊 Automatic API documentation

## Prerequisites

- Python 3.10+
- Google AI API key (for Gemini)

## Setup

1. Create and activate a virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Set your Google AI API key:

```bash
export GOOGLE_API_KEY=your_api_key_here
```

Get your API key from: https://makersuite.google.com/app/apikey

Alternatively, copy `.env.example` to `.env` and add your API key there:

```bash
cp .env.example .env
# Edit .env and add your GOOGLE_API_KEY
```

## Running the Server

```bash
python main.py
```

The server will start on `http://localhost:8000`

## Endpoints

- `/` - Server information
- `/health` - Health check endpoint
- `/ag-ui` - AG-UI endpoint for agent interaction
- `/docs` - Interactive API documentation

## Testing the Agent

### Using the AG-UI Dojo Frontend

1. Clone the AG-UI repository:

```bash
git clone https://github.com/ag-ui-protocol/ag-ui.git
cd ag-ui/typescript-sdk
```

2. Follow the [Dojo setup instructions](https://github.com/ag-ui-protocol/ag-ui/tree/main/typescript-sdk/apps/dojo#development-setup)

3. Configure the Dojo app to point to your Pydantic AI server at `http://localhost:8000/ag-ui`

4. Visit `http://localhost:3000/pydantic-ai`

### Example Prompts

Try these prompts with the agent:

- `"What is the time in New York?"`
- `"What time is it in Tokyo?"`
- `"Get the current time in Europe/London"`

The agent will use its `current_time` tool to fetch the time for the specified timezone.

## Project Structure

```
llm-ai-agent-pydantic/
├── requirements.txt    # Python dependencies
├── agent.py           # Pydantic AI agent with tools
├── main.py            # FastAPI server
└── README.md          # This file
```

## Agent Tools

### current_time

Returns the current time in ISO format for a specified timezone.

**Parameters:**

- `timezone` (str, optional): Timezone name (default: 'UTC')
  - Examples: 'UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo'

**Returns:**

- ISO format timestamp string

## Extending the Agent

To add more tools, edit `agent.py` and add new functions decorated with `@agent.tool_plain`:

```python
@agent.tool_plain
async def your_tool(param: str) -> str:
    """Tool description.

    Args:
        param: Parameter description.

    Returns:
        Return value description.
    """
    # Your tool logic here
    return result
```

## Documentation

- [Pydantic AI Docs](https://ai.pydantic.dev/)
- [AG-UI Documentation](https://ai.pydantic.dev/ag-ui/)
- [AG-UI Examples](https://ai.pydantic.dev/examples/ag-ui/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)

## Troubleshooting

### Missing GOOGLE_API_KEY

If you see a warning about missing `GOOGLE_API_KEY`, make sure to set it:

```bash
export GOOGLE_API_KEY=your_api_key_here
```

Get your API key from: https://makersuite.google.com/app/apikey

### Import Errors

If you see import errors, ensure all dependencies are installed:

```bash
pip install -r requirements.txt
```

### Port Already in Use

If port 8000 is already in use, modify the port in `main.py`:

```python
uvicorn.run(
    "main:app",
    host="0.0.0.0",
    port=8001,  # Change to a different port
    reload=True
)
```
