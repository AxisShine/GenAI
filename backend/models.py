#user
#age, disability, learning preference, email?

from sqlalchemy import Column, String, JSON, Integer, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    learning_style = Column(JSON, nullable=True)
    quiz_responses = relationship("QuizResponse", back_populates="user")

class QuizResponse(Base):
    __tablename__ = "quiz_responses"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"))
    responses = Column(JSON)
    user = relationship("User", back_populates="quiz_responses")