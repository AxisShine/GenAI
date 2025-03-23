from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.ai_service import generate_learning_material

router = APIRouter()

# Define the request model
class ActiveRecRequest(BaseModel):
    user_id: str
    topic: str
    learning_style: str

# Define the route
@router.post("/activerec")
def chat(request: ActiveRecRequest):
    try:
        # Create the prompt
        prompt = f"Use active recall to quiz the user on the topic '{request.topic}' in a style suitable for a {request.learning_style} learner."
        
        # Generate the learning material
        response = generate_learning_material(prompt)
        
        return {"response": response}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
