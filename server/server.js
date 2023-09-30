
// Import necessary modules
const express = require('express');
const pool = require('./database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookie = require('cookie');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

// Setting up your port
const PORT = process.env.PORT || 8080;


// Assigning the variable app to express
const app = express();

// Middleware for parsing JSON request bodies
app.use(express.json());

// CORS


const allowedOrigins = ['http://localhost:5173']; // Add your frontend's URL(s) here
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Include cookies and other credentials in CORS requests
};

app.use(cors(corsOptions));




// Registration endpoint
app.post('/register', async (req, res) => {
    try {
        const { name, user_email, password } = req.body;
        
      // Check if the email already exists in the database
      const existingUser = await pool.query('SELECT * FROM cosmos.users WHERE user_email = $1', [user_email]);
  
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert the new user into the database
      await pool.query('INSERT INTO cosmos.users (name, user_email, password) VALUES ($1, $2, $3)', [name, user_email, hashedPassword]);
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
// Login end point
app.post('/login', async (req, res) => {
  try {
    const { user_email, password } = req.body;
    const expiresIn = '1h';

    // Retrieve user from the database by email
    const userQueryResult = await pool.query('SELECT * FROM cosmos.users WHERE user_email = $1', [user_email]);
    console.log('User query result:', userQueryResult.rows);

    if (userQueryResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = userQueryResult.rows[0]; // Extract the user object from the query result

    // Compare the hashed password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET);
    console.log("id ", user.user_id);
    console.log('token line(94) = ', token);

    // Set the token as a cookie with HttpOnly flag for security
    res.cookie('authToken', token, {
      httpOnly: true,
      maxAge: 3600 * 1000, // 1 hour (in milliseconds)
      sameSite: 'none',
      secure: false, // Set to true if your app uses HTTPS
      path: '/', // Specify the path where the cookie is accessible
    });

    // Set the token as a cookie with HttpOnly flag for security
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const isAuthenticatedMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
    console.log('Received token:', token);
  
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
  
  app.get('/cart', isAuthenticatedMiddleware, async (req, res) => {
    try {
      // Handle requests to the cart route for authenticated users only
      const userId = req.userId; // You can access the user's ID using req.userId
      console.log('Received token in /cart:', req.headers.authorization);
      console.log('Decoded token in /cart:', req.userId);
  
      res.json({ message: `This is the cart page for authenticated users like ${userId}.` });
    } catch (error) {
      console.error('Error in /cart:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  

  app.post('/logout', (req, res) => {
    try {
      // Instead of clearing a cookie, you should send a response to the client to clear the token on the client-side
      res.json({ message: 'Logout successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
