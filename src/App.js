import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { generateQuoteMap } from "./components/mockData";
import Home from "./pages/index";
import SignIn from "./pages/login";
import SignUp from "./pages/signup";

function App() {
  const data = {
    medium: generateQuoteMap(100),
    large: generateQuoteMap(500)
  };

  return (
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

       </Routes>
  );
}

export default App;
