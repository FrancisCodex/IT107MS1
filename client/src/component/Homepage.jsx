import React from 'react';
import NavBar from './NavBar';
import '../styles/homepage.css';

function HomePage() {
  return (
    <div className="homepage"> {/* Apply the CSS class */}
      <NavBar /> {/* Use the Header component */}
      <main>
        {/* Your homepage content here */}
        <h2>Welcome to Our Website</h2>
        <p>This is the homepage content.</p>
      </main>
    </div>
  );
}

export default HomePage;