import React from 'react';
import '../styles/navbar.css'

function NavBar() {
  return (
      
    <div className="header">
      <h1 className="logo">Café Cosmos</h1>
      <ul className="nav">
        <li><a href="/">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="login">Sign In</a></li>
        <li><a href="signup">Free Trial</a></li>
      </ul>
    </div>

  );
}

export default NavBar;