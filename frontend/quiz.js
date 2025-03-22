import { useState } from "react";

export function QuizPage() {
  const [responses, setResponses] = useState({});

  const handleSubmit = async () => {
    await fetch("http://localhost:8000/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: "test_user", responses }),
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Learning Styles Quiz</h1>
      <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white p-2 rounded">Submit</button>
    </div>
  );
}