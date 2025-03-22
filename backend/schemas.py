from pydantic import BaseModel
from typing import Dict

class QuizResponseSchema(BaseModel):
    user_id: str
    responses: Dict[str, str]  # Mapping of learning preferences

class LearningRequestSchema(BaseModel):
    user_id: str
    topic: str

class UserSchema(BaseModel):
    user_id: str
    learning_style: Dict[str, str]  # ADHD, Dyslexia, etc.
