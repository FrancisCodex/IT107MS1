import React, { useState } from 'react';
import NavBar from './NavBar';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart() {

    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        // Make a POST request to the /logout endpoint on the server
        const response = await axios.post('http://localhost:8080/logout');
  
        if (response.status === 200) {
          // Redirect the user to the login page or homepage after logout
          navigate('/login'); // Replace '/login' with the path to your login page
        } else {
          // Handle logout error
          console.error('Logout failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    return <div>
        <NavBar />
        <div>
            ONLY VERIFIED USERS!!
        </div>

        <button className='form__button button submit' onClick={handleLogout}>Logout</button>

  </div>;
};
export default Cart;