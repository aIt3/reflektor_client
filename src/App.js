import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./config/routes";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/Register" element={<Register />}/>
         <Route path="/" element ={<HomePage />} />
         <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
