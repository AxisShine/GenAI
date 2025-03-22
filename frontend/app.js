import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import QuizPage from "./pages/QuizPage";
import Dashboard from "./pages/Dashboard";
import LearningMode from "./pages/LearningMode";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <nav className="flex gap-4 p-4 bg-white shadow rounded-lg">
          <Link to="/" className="text-blue-500">Quiz</Link>
          <Link to="/dashboard" className="text-blue-500">Dashboard</Link>
          <Link to="/learning-mode" className="text-blue-500">Learning Mode</Link>
        </nav>
        <Routes>
          <Route path="/" element={<QuizPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learning-mode" element={<LearningMode />} />
        </Routes>
      </div>
    </Router>
  );
}
