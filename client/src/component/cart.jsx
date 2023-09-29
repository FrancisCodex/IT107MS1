import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart() {

    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);

    // Check for the presence of the JWT token on component mount
    useEffect(() => {
      const checkAuthentication = async () => {
        try {
          console.log(localStorage.getItem('jwt'))
          
          const response = await axios.get('http://localhost:8080/cart', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`, // Get the JWT token from local storage
            },
          });
  
          if (response.status === 200) {
            setAuthenticated(true);
          }
        } catch (error) {
          // Handle unauthorized access here
          console.error('Unauthorized:', error);
          navigate('/login'); // Redirect to the login page
        }
      };
  
      checkAuthentication();
    }, [navigate]);
  
    const handleLogout = async () => {
      try {
        // Make a POST request to the /logout endpoint on the server
        const response = await axios.post('http://localhost:8080/logout');
  
        if (response.status === 200) {
          // Remove the JWT token from local storage
          localStorage.removeItem('jwt');
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
  
    if (!authenticated) {
      return <div>Loading...</div>; // You might want to show a loading indicator while checking authentication
    }

    return <div>
        <NavBar />
        <div>
            ONLY VERIFIED USERS!!
        </div>

        <button className='form__button button submit' onClick={handleLogout}>Logout</button>

  </div>;
};
export default Cart;