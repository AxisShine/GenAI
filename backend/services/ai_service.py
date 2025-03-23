import google.generativeai as genai
from gtts import gTTS
from fastapi.responses import FileResponse
from config import GOOGLE_API_KEY

# Configure Gemini AI
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel("models/gemini-2.0-flash-lite-001")  # Use a valid model name!

def generate_learning_material_cohere(prompt: str) -> str:
    response = model.generate_content(prompt)
    return response.text if response else "Error generating content"

def generate_learning_material_gemini(prompt: str) -> str:
    response = model.generate_content(prompt)
    return response.text if response else "Error generating content"

def generate_learning_material(prompt: str) -> str:
    response = model.generate_content(prompt)
    return response.text if response else "Error generating content"

def generate_audio_from_text(text: str, filename: str = "learning_material.mp3"):
    tts = gTTS(text=text, lang='en')
    tts.save(filename)
    return FileResponse(filename, media_type="audio/mpeg", filename=filename)