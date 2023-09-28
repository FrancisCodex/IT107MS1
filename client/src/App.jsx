import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Login from './component/Login';
import SignUp from './component/Signup';
import Homepage from './component/Homepage';
import Cart from './component/cart';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // You can set isAuthenticated to true upon successful login
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
  
  );
}

export default App;