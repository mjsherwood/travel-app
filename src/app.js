const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const apiRoutes = require('./api');
const authRoutes = require('./auth/authRoutes') // Adjust the path as needed
const passport = require('passport');

require('./config/passport'); 
// Environment variables
require('dotenv').config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Initialize session middleware
app.use(session({
  secret: process.env.SESSION_SECRET, // replace with a long random string
  resave: false,
  saveUninitialized: false, // changed to false for better security, set to true if needed
  cookie: { 
      secure: false, // set to true if your website has HTTPS enabled
      maxAge: 1000 * 60 * 60 * 24 // Example: setting cookie to expire in 24 hours
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Use the Sleep routes
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Travel Quiz App!');
});

// Define the port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
