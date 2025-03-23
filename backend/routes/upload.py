from fastapi import APIRouter, UploadFile, File, HTTPException
import pdfplumber
import pytesseract
from PIL import Image
from gtts import gTTS
from fastapi.responses import FileResponse
import os

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

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_ext = file.filename.split(".")[-1].lower()
    file_path = f"{UPLOAD_DIR}/{file.filename}"

    with open(file_path, "wb") as f:
        f.write(await file.read())

    if file_ext in ["pdf"]:
        extracted_text = extract_text_from_pdf(file_path)
    elif file_ext in ["png", "jpg", "jpeg"]:
        extracted_text = extract_text_from_image(file_path)
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    # Save text to file
    text_file = f"{UPLOAD_DIR}/{file.filename}.txt"
    with open(text_file, "w") as f:
        f.write(extracted_text)

    return {"filename": file.filename, "text": extracted_text}

@router.get("/read/{filename}")
async def read_text(filename: str):
    text_file = f"{UPLOAD_DIR}/{filename}.txt"
    
    if not os.path.exists(text_file):
        raise HTTPException(status_code=404, detail="Text not found")

    with open(text_file, "r") as f:
        text = f.read()

    tts = gTTS(text=text, lang="en")
    audio_path = f"{UPLOAD_DIR}/{filename}.mp3"
    tts.save(audio_path)

    return FileResponse(audio_path, media_type="audio/mpeg", filename="speech.mp3")