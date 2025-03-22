from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models import User, QuizResponse
from schemas import QuizResponseSchema
from database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/quiz")
def submit_quiz(response: QuizResponseSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == response.user_id).first()
    if not user:
        user = User(id=response.user_id, username=f"user_{response.user_id}")
        db.add(user)

    quiz_response = QuizResponse(user_id=response.user_id, responses=response.responses)
    db.add(quiz_response)
    db.commit()
    return {"message": "Quiz responses saved"}