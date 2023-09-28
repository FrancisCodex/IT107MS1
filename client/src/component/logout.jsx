import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Logout() {
  const history = useHistory();
  
  const handleLogout = async () => {
    try {
      // Make a POST request to the logout endpoint on the server.
      const response = await axios.post('/logout');

      if (response.status === 200) {
        // Clear the token from localStorage or your preferred storage.
        localStorage.removeItem('token');
        
        // Redirect to the login or home page, or perform any other desired actions.
        history.push('/login');
      } else {
        // Handle logout failure, show an error message, etc.
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
