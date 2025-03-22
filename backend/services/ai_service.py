import google.generativeai as genai
import os
import cohere
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

model = genai.GenerativeModel("gemini-pro")

def generate_learning_material(prompt):
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"AI Generation Error: {e}")
        return "Error generating content"
    

# Configure Cohere API key
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
cohere_client = cohere.Client(COHERE_API_KEY)

def generate_learning_material_cohere(prompt: str) -> str:
    response = cohere_client.generate(
        model="xlarge",
        prompt=prompt,
        max_tokens=500
    )
    return response.generations[0].text.strip()

