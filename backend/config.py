import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("Missing GOOGLE_API_KEY in .env file")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("Missing OPENAI_API_KEY in .env file")

# Configure API key
genai.configure(api_key=GOOGLE_API_KEY)

# Initialize the Gemini model with a valid model name
MODEL_NAME = "models/gemini-2.0-flash-lite-001"  # Replace with a valid model name
model = genai.GenerativeModel(MODEL_NAME)

# Function to list available models (for debugging purposes)
def list_available_models():
    try:
        models = genai.list_models()
        if not models:
            print("No models found.")
        else:
            for model in models:
                print(model)
    except Exception as e:
        print(f"An error occurred: {e}")

# Uncomment the following line to list available models
# list_available_models()