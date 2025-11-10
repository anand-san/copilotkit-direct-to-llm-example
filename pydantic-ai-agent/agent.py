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
    instructions='''
    You are a Meal Planning Assistant that helps users plan recipes step by step.
    
    Your role is to:
    - Help users organize ingredients with quantities for their recipes
    - Create step-by-step cooking instructions that can be tracked like a todo list
    - Provide cooking tips and suggestions
    - Help users modify recipes based on dietary preferences or available ingredients
    
    Always be encouraging and supportive. When users ask about recipes, help them break down the process into manageable steps.
    Use the available tools to manage ingredients and cooking steps effectively.
    '''
)

# Convert agent to AG-UI app
app = agent.to_ag_ui()
