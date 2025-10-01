# config.py
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Now you can access the variables
DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
DEBUG = os.getenv("DEBUG")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Set huggingface token
os.environ["HF_TOKEN"] = os.getenv("HF_TOKEN")
# Set Langsmith traceses
os.environ["LANGCHAIN_PROJECT"] = os.getenv("LANGCHAIN_PROJECT")
# Enable tracing
os.environ["LANGCHAIN_TRACING_V2"] = "false"
