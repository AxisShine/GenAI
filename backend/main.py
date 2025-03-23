from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routes import quiz, dashboard, learning, chat, upload
from pydantic import BaseModel
from fastapi.responses import FileResponse, HTMLResponse
from services.ai_service import generate_video
import mimetypes

from gtts import gTTS

tts = gTTS("Hello world!", lang="en")
tts.save("test_audio.mp3")

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

# This route handles favicon requests
@app.get("/favicon.ico")
async def favicon():
    return FileResponse("static/favicon.ico")

class VideoRequest(BaseModel):
    topic: str

@app.post("/api/generate_video")
async def generate_video_api(request: VideoRequest):
    # Get the topic from the request
    topic = request.topic.strip()
    
    if not topic:
        raise HTTPException(status_code=400, detail="No topic provided")
    
    try:
        # Start video generation
        video_file = await generate_video(topic)
        return {"videoUrl": video_file}
    except Exception as e:
        # Handle any exceptions and return a server error
        raise HTTPException(status_code=500, detail=f"Error generating video: {str(e)}")