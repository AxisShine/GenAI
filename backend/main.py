# Backend (FastAPI)
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from google.generativeai import configure, generate_text

# Initialize FastAPI app
app = FastAPI()

# Configure Gemini API (Replace 'YOUR_GEMINI_API_KEY' with actual key)
configure(api_key='YOUR_GEMINI_API_KEY')

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