import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Login from './component/Login';
import SignUp from './component/Signup';
import Homepage from './component/Homepage';
import Cart from './component/cart';
import Cookies from 'js-cookie'; // Import the Cookies object
import ForgotPassword from './component/ForgetPassword';

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
    <Route path="/login" element={<Login onLogin={handleLogin} />} />
    <Route path="/SignUp" element={<SignUp />} />
    <Route path="/ForgetPassword" element={<ForgotPassword />} />
    <Route
  path="/cart"
  element={
    isAuthenticated ? (
      <Cart authToken={Cookies.get('authToken')} />
    ) : (
      <Navigate to="/cart" />
    )
  }
/>

  </Routes>
</BrowserRouter>

  
  );
}

export default App;