# GenAI
For the GenAI Genesis Hackathon!


## How to run

1. Go to google cloud console, make a new project, add an api key under clients and enable gemini, put the api key in a .env file in the backend folder (can copy and fill in .env_example)

2. Start the Backend (FastAPI)

If you haven't set it up yet:

Install FastAPI and Uvicorn:

    'pip install fastapi uvicorn'

To run the backend:

    'uvicorn main:app --reload'

This will start the FastAPI server on http://localhost:8000/.
3. Start the React Frontend
If you haven't set it up yet:

Install Node.js and npm if you haven't already: Download Node.js

Navigate to your project folder and install dependencies:

    'npm install'

To run the frontend:

    'npm start'

This will start the React development server on http://localhost:3000/

4. Open http://localhost:3000/ in your browser.