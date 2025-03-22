from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from services.generative_ai import generate_learning_material_gemini, generate_learning_material_cohere
from models import User
from schemas import LearningRequestSchema
from services.ai_service import generate_learning_material

router = APIRouter()

@router.post("/learning-material")
def generate_learning_material(request: LearningRequestSchema):
    # Customize the prompt based on the user's learning style
    user_learning_style = "ADHD"  # Fetch from database (dummy value for now)
    
    prompt = f"Generate a learning guide on {request.topic} for a {user_learning_style} learner."
    
    # Use Gemini or Cohere to generate the material
    # Option 1: Use Gemini (Google)
    # response = generate_learning_material_gemini(prompt)
    
    # Option 2: Use Cohere
    response = generate_learning_material_cohere(prompt)
    
    return {"topic": request.topic, "content": response}

