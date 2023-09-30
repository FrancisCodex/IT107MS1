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
        console.log('Checking authentication...');
        console.log(authToken);
        
        // Check if the user is authenticated using the authToken prop
        if (!authToken) {
          throw new Error('Unauthorized'); // Unauthorized access
        }

        // Perform a request to the server to validate the token
        const response = await axios.get('http://localhost:8080/cart', {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the token in the Authorization header
          },
        });

        // If the server responds with success, the token is valid, and the user is authenticated
        if (response.status === 200) {
          console.log('User is authenticated.');
        } else {
          throw new Error('Unauthorized');
        }
      } catch (error) {
        // Handle unauthorized access here
        console.error('Unauthorized:', error);
        console.log('Current authToken:', authToken);
        
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
