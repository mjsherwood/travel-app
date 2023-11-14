// frontendRoutes.js

const express = require('express');
const router = express.Router();

// Home Page Route
router.get('/', (req, res) => {
    res.render('home');
});

// Other frontend routes
// Example: 
// router.get('/about', (req, res) => {
//     res.render('about');
// });

module.exports = router;
