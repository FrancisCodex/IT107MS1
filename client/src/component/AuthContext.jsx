import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    // Implement your login logic here.
    // For example, set a token in localStorage or make an API request.
    // If login is successful, update isLoggedIn to true.
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Implement your logout logic here.
    // For example, clear the token from localStorage or revoke the session.
    // Update isLoggedIn to false.
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
