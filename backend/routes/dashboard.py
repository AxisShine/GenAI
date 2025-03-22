from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User
from schemas import UserSchema

router = APIRouter()

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/dashboard/{user_id}")
def get_dashboard(user_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"user_id": user.user_id, "learning_style": user.learning_style}
