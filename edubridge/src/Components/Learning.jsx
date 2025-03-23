import { useState } from "react";

function Learning() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      console.log("Upload success:", data);
      setText(data.text); // Display extracted text
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Homework</h1>
      <input type="file" onChange={handleFileChange} className="mb-2" />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload
      </button>

      {text && (
        <div className="mt-4 p-4 bg-gray-100 rounded font-dyslexic">
          <h2 className="text-xl font-bold mb-2">Extracted Text:</h2>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
}

export default Learning;