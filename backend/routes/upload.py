from fastapi import APIRouter, UploadFile, File, HTTPException
import pdfplumber
import pytesseract
from PIL import Image
from gtts import gTTS
from config import GOOGLE_API_KEY
from fastapi.responses import FileResponse, JSONResponse
import os
import google.generativeai as genai

# Initialize the AI model (e.g., Gemini)
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel("models/gemini-2.0-flash-lite-001")

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text if text else "No text found."

def extract_text_from_image(image_path):
    image = Image.open(image_path)
    return pytesseract.image_to_string(image)

# Function to generate a simple summary for ADHD users
def generate_summary(text: str) -> str:
    response = model.generate_content(
        f"Summarize this text in a simple and concise way for ADHD users: {text}"
    )
    return response.text.strip() if response and response.text else "Error generating summary."

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_ext = file.filename.split(".")[-1].lower()
    file_path = f"{UPLOAD_DIR}/{file.filename}"

    # Save the uploaded file
    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Extract text based on file type
    if file_ext in ["pdf"]:
        extracted_text = extract_text_from_pdf(file_path)
    elif file_ext in ["png", "jpg", "jpeg"]:
        extracted_text = extract_text_from_image(file_path)
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    # Generate ADHD-friendly summary
    summary = generate_summary(extracted_text)

    # Save the extracted text and summary to files
    text_file = f"{UPLOAD_DIR}/{file.filename}.txt"
    with open(text_file, "w") as f:
        f.write(extracted_text)

    summary_file = f"{UPLOAD_DIR}/{file.filename}_summary.txt"
    with open(summary_file, "w") as f:
        f.write(summary)

    return JSONResponse(content={
        "filename": file.filename,
        "extracted_text": extracted_text,
        "summary": summary,
        "summary_file": summary_file
    })

@router.get("/read/{filename}")
async def read_text(filename: str):
    summary_file_path = f"{UPLOAD_DIR}/{filename}_summary.txt"
    
    # Check if the summary file exists
    if not os.path.exists(summary_file_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    # Use gTTS (Google Text-to-Speech) to generate an audio file
    audio_path = f"{UPLOAD_DIR}/{filename}_summary.mp3"
    if not os.path.exists(audio_path):  # Generate the audio file if it doesn't exist
        with open(summary_file_path, "r") as file:
            text_to_read = file.read()
        tts = gTTS(text=text_to_read, lang="en")
        tts.save(audio_path)

    # Return the audio file for playback
    return FileResponse(audio_path, media_type="audio/mpeg")