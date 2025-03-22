import { useEffect, useState } from "react";

export function Dashboard() {
  const [learningStyle, setLearningStyle] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/dashboard/test_user")
      .then(res => res.json())
      .then(data => setLearningStyle(data.learning_style));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <p>Learning Style: {learningStyle ? JSON.stringify(learningStyle) : "Loading..."}</p>
    </div>
  );
}