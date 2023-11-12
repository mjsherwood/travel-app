const express = require('express');
const mongoose = require('mongoose');
const sleepRoutes = require('./api/sleepRoutes'); // Adjust the path as needed

// Environment variables
require('dotenv').config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Use the Sleep routes
app.use('/api', sleepRoutes);

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
