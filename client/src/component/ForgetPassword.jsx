import React, { useState } from 'react';
import '../styles/global.css'; // Import your CSS file
import NavBar from './NavBar';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here, you can implement the logic to send a reset password email to the provided email address.
    // This can be done using an API call to your server, which handles the email sending.

    // For the sake of this example, we'll just display a success message.
    setMessage('Password reset instructions sent to your email.');
    setSubmitted(true);
  };

  return (
    <div>
        <NavBar/>
    <div className="form">
      <h2 className="form_title">Forgot Password</h2>
      {submitted ? (
        <p>{message}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="form__input"
              required
            />
          </div>
          <button type="submit" className="form__button">
            Submit
          </button>
        </form>
      )}
    </div>
    </div>
  );
}

export default ForgotPassword;