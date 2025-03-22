from pydantic import BaseModel

class QuizResponseSchema(BaseModel):
    user_id: str
    responses: dict

class LearningRequestSchema(BaseModel):
    user_id: str
    topic: str
