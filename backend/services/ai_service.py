import google.generativeai as genai
from gtts import gTTS
from fastapi.responses import FileResponse
from config import GOOGLE_API_KEY
from moviepy import VideoFileClip, AudioFileClip
import os

from io import BytesIO

# Configure Gemini AI
genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel("models/gemini-2.0-flash-lite-001")  # Use a valid model name

def generate_learning_material_gemini(prompt: str) -> dict:
    response = model.generate_content(
        f"Explain {prompt} in a fun, engaging way for an ADHD audience. Keep it short and exciting, "
        f"with clear, simple language."
    )

    if response and response.text:
        summary = response.text.strip()
        return {"summary": summary}
    
    return {"summary": "Error generating content"}

def generate_tts(text: str) -> BytesIO:
    tts = gTTS(text=text, lang='en')
    audio_fp = BytesIO()
    tts.save(audio_fp)
    audio_fp.seek(0)  # Reset pointer to the beginning
    return audio_fp

def generate_audio_from_text(text: str, filename: str = "learning_audio.mp3"):
    """
    Converts text to speech using gTTS.
    """
    tts = gTTS(text=text, lang='en')
    tts.save(filename)
    return os.path.abspath(filename)  # Return the absolute path of the file

def generate_learning_material(prompt: str) -> str:
    response = model.generate_content(prompt)
    return response.text if response else "Error generating content"

async def generate_video(topic: str):
    print(f"Generating video for topic: {topic}")  # Add debug log
    learning_data = generate_learning_material_gemini(topic)
    summary = learning_data["summary"]
    
    print(f"Summary: {summary}")  # Debugging summary data

    # Generate audio explanation for the topic
    audio_file = generate_audio_from_text(summary)
    
    # Use the pre-existing driving.mp4 video file
    video_path = '/home/axis/HAckathon/GenAI/edubridge/public/driving.mp4'
  # Path to your video file
    
    try:
        # Add the audio file to the video
        final_video = VideoFileClip(video_path)
        audio_clip = AudioFileClip(audio_file)
        
        # Set the audio of the video
        final_video.audio = audio_clip
        
        # Save the final video with the new audio
        output_filename = "../edubridge/public/final_learning_video.mp4"
        final_video.write_videofile(output_filename, codec="libx264", fps=24)
    except Exception as e:
        print(f"Error generating video: {str(e)}")
        return {"error : {str(e)}"}
    
    print(f"Video generated: {output_filename}")  # Debug log

    return FileResponse(output_filename, media_type="video/mp4", filename="learning_video.mp4")