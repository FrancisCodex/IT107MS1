import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Cart({ authToken }) {
  const navigate = useNavigate();

  // Check for the presence of the JWT token from the authToken prop on component mount
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Check if the user is authenticated using the authToken prop
        if (!authToken) {
          throw new Error('Unauthorized'); // Unauthorized access
        }

        // Rest of your code to validate the token...
      } catch (error) {
        // Handle unauthorized access here
        console.error('Unauthorized:', error);
        navigate('/login'); // Redirect to the login page
      }
    };

    checkAuthentication();
  }, [navigate, authToken]);
  const handleLogout = async () => {
    try {
      // Make a POST request to the /logout endpoint on the server
      const response = await axios.post('http://localhost:8080/logout');

      if (response.status === 200) {
        // Remove the JWT token from local storage
        sessionStorage.removeItem('jwt');
        // Remove the authentication cookie
        Cookies.remove('authToken');
        // Redirect the user to the login page after logout
        navigate('/login'); // Replace '/login' with the path to your login page
      } else {
        // Handle logout error
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div>
      <NavBar />
      <div>ONLY VERIFIED USERS!!</div>

      <button className='form__button button submit' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Cart;
