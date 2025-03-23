from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routes import quiz, dashboard, learning, chat, upload
from pydantic import BaseModel
from fastapi.responses import FileResponse
from services.ai_service import generate_learning_material, generate_audio_from_text

# Initialize DB
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (you can replace "*" with specific origins like ["http://localhost:3000"])
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)


# Include routes
app.include_router(quiz.router, prefix="/api", tags=["Quiz"])
app.include_router(dashboard.router, prefix="/api", tags=["Dashboard"])
app.include_router(learning.router, prefix="/api", tags=["Learning"])
app.include_router(chat.router, prefix="/api", tags=["Chat"])
app.include_router(upload.router, prefix="/api", tags=["Upload"])