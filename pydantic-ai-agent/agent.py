"""Pydantic AI Agent with AG-UI support."""

import os
from datetime import datetime
from zoneinfo import ZoneInfo
from pathlib import Path
from dotenv import load_dotenv

from pydantic_ai import Agent
from pydantic_ai.models.google import GoogleModel
from pydantic_ai.providers.google import GoogleProvider

# Load environment variables from .env file
env_path = Path(__file__).parent / '.env'
load_dotenv(dotenv_path=env_path)

# Configure Google provider with API key
api_key = os.getenv('GOOGLE_API_KEY')
if not api_key:
    raise ValueError("GOOGLE_API_KEY environment variable is not set")
provider = GoogleProvider(api_key=api_key)
model = GoogleModel('gemini-flash-latest', provider=provider)

# Create an agent with Google's Gemini model
agent = Agent(
    model,
    instructions='You are a helpful assistant. Use available tools when needed.'
)

# Convert agent to AG-UI app
app = agent.to_ag_ui()


@agent.tool_plain
async def current_time(timezone: str = 'UTC') -> str:
    """Get the current time in ISO format.
    
    Args:
        timezone: The timezone to use (e.g., 'UTC', 'America/New_York', 'Europe/London').
    
    Returns:
        The current time in ISO format string.
    """
    try:
        tz = ZoneInfo(timezone)
        return datetime.now(tz=tz).isoformat()
    except Exception as e:
        return f"Error getting time for timezone '{timezone}': {str(e)}"
