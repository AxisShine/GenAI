from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User
from schemas import LearningRequestSchema
from services.ai_service import generate_learning_material

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/learning-mode")
def generate_learning_material_api(request: LearningRequestSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == request.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    learning_style = user.learning_style or "general"
    prompt = f"Explain {request.topic} in a style suitable for a {learning_style} learner."
    content = generate_learning_material(prompt)
    return {"topic": request.topic, "content": content}
