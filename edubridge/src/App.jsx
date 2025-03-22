import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home.jsx";
import Questions from "./Components/Questions.jsx";
import "./App.css";
import DashBoard from "./Components/DashBoard.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/questions" element={<Questions></Questions>}></Route>
          <Route path="/dashboard" element={<DashBoard></DashBoard>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
