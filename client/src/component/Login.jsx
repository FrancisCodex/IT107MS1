import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.css';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSuccessfulLogin = async (response) => {
    // Perform any necessary login logic here
    const token = response.data.token;
    console.log('Stored token:', token);
    Cookies.set('authToken', token, { expires: 1 / 24 }); // 1 hour
    // Set isAuthenticated to true upon successful login
    onLogin();

    // Redirect the user to the desired page (e.g., /cart)
    navigate('/cart'); // Replace '/cart' with the path you want to redirect to
  };

  const handleLoginError = () => {
    toast.error('Invalid email or password');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = Cookies.get('authToken'); // Get the token from cookies
      console.log('this is the token2:', token);
      const response = await axios.post('http://localhost:8080/login', {
        user_email: email,
        password,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
  
      if (response.status === 200) {
        handleSuccessfulLogin(response);
        console.log('this is the token:', token);
        console.log('Login successful');
      } else {
        handleLoginError();
        console.error('Login failed');
      }
    } catch (error) {
      handleLoginError();
      console.error('Error:', error);
    }
  };
  

  return (
    <div>
      <NavBar />
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form_title title">Sign in to Website</h2>
        <input
          className="form__input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          className="form__input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <div className='forgot_pass'>
          <p><a href="/ForgetPassword">Forgot Password</a> </p>
        </div>
        <div className='sign_up'>
          <p>Don't have an account? <a href="/Signup">Sign up</a> </p>
        </div>
        <button className="form__button button submit" type="submit">
          SIGN IN
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default Login;
