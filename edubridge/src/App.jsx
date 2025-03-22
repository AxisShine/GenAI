import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home.jsx";
import Questions from "./Components/Questions.jsx";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/questions" element={<Questions></Questions>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
