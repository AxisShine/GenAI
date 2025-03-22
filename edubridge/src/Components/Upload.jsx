import { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setText(response.data.text);
      setAudioUrl(`http://localhost:8000/api/read/${response.data.filename}`);

    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="p-4">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-2" />
      <button onClick={handleUpload} className="p-2 bg-blue-500 text-white rounded">
        Upload & Process
      </button>
      
      {text && (
        <div className="mt-4 p-4 border border-gray-300 rounded">
          <h2 className="text-lg font-bold">Extracted Text</h2>
          <p className="font-dyslexic">{text}</p>
          <audio controls src={audioUrl} className="mt-2"></audio>
        </div>
      )}
    </div>
  );
}