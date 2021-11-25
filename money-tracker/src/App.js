import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home.js";
import Login from "./pages/login/Login.js";
import Signup from "./pages/signup/Signup.js";
import Navber from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navber />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
