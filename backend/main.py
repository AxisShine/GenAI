# Backend (FastAPI)
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

from database import Base, engine
from routes import quiz, dashboard, learning

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Include routes
app.include_router(quiz.router, prefix="/api", tags=["Quiz"])
app.include_router(dashboard.router, prefix="/api", tags=["Dashboard"])
app.include_router(learning.router, prefix="/api", tags=["Learning"])

# Load environment variables from .env file
load_dotenv()

# Get API key from .env
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise ValueError("Missing GOOGLE_API_KEY in .env file")
# Configure API key
genai.configure(api_key=GOOGLE_API_KEY)

# Initialize the Gemini model
model = genai.GenerativeModel("gemini-pro")

# Example function to generate text
def generate_learning_material(prompt):
    response = model.generate_content(prompt)
    return response.text if response else "Error generating content"

# Initialize FastAPI app
app = FastAPI()

# Data models
class QuizResponse(BaseModel):
    user_id: str
    responses: dict

class LearningRequest(BaseModel):
    user_id: str
    topic: str

# Store user learning styles (temporary dictionary for now)
user_learning_styles = {}

@app.post("/quiz")
def submit_quiz(response: QuizResponse):
    user_learning_styles[response.user_id] = response.responses
    return {"message": "Quiz responses saved", "style": response.responses}

@app.get("/dashboard/{user_id}")
def get_dashboard(user_id: str):
    if user_id not in user_learning_styles:
        raise HTTPException(status_code=404, detail="User not found")
    return {"user_id": user_id, "learning_style": user_learning_styles[user_id]}

@app.post("/learning-mode")
def generate_learning_material(request: LearningRequest):
    prompt = f"Generate a learning guide on {request.topic} for a {user_learning_styles.get(request.user_id, 'general')} learner."
    response = generate_text(prompt)
    return {"topic": request.topic, "content": response.text}
