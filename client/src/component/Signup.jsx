// SignUp.js
import React, { useState } from 'react';
import '../styles/global.css';
import NavBar from './NavBar';
import axios from 'axios';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/register', {
        name,
        user_email: email, // Correct field name for email
        password,
      });

      if (response.status === 201) {
        // Registration was successful, you can handle the success here
        console.log('Registration successful');
      } else {
        // Handle registration failure, show an error message, etc.
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <NavBar/>
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form_title title">Create Account</h2>
      <input
        className="form__input"
        type="text"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
      />
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
     
      <div className='sign_up'>
      <p>Already have an account? <a href="/Login">Sign in</a> </p>
      </div>
      
      <button className="form__button button submit" type="submit">
        SIGN UP
      </button>
    </form>
    </div>
  );
}

export default SignUp;
