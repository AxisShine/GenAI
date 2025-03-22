from fastapi import APIRouter
from pydantic import BaseModel
from services.ai_service import generate_learning_material

router = APIRouter()

class ChatRequest(BaseModel):
    user_id: str
    message: str

@router.post("/chat")
def chat(request: ChatRequest):
    prompt = f"User: {request.message}\nAI:"
    response = generate_learning_material(prompt)
    return {"response": response}