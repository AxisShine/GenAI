import { useState } from "react";

export function LearningMode() {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");

  const generateMaterial = async () => {
    const response = await fetch("http://localhost:8000/learning-mode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: "test_user", topic }),
    });
    const data = await response.json();
    setContent(data.content);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Learning Mode</h1>
      <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Enter topic" className="border p-2 rounded" />
      <button onClick={generateMaterial} className="ml-2 bg-blue-500 text-white p-2 rounded">Generate</button>
      <p className="mt-4">{content}</p>
    </div>
  );
}