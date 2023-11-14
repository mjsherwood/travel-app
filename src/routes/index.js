const express = require('express');
const router = express.Router();

// Home Page Route
router.get('/', (req, res) => {
    res.render('home');
});

// About Us Page Route
router.get('/about', (req, res) => {
    res.render('about');
});

// Contact Us Page Route
router.get('/contact', (req, res) => {
    res.render('contact');
});

// Privacy Policy Page Route
router.get('/privacy-policy', (req, res) => {
    res.render('privacy-policy');
});

// Terms and Conditions Page Route
router.get('/terms-and-conditions', (req, res) => {
    res.render('terms-and-conditions');
});

// Login Page Route
router.get('/login', (req, res) => {
    res.render('login');
});

// Accommodations Page Route
router.get('/sleep', (req, res) => {
    res.render('sleep');
});

// Restaurants Page Route
router.get('/dine', (req, res) => {
    res.render('dine');
});

// Experiences Page Route
router.get('/explore', (req, res) => {
    res.render('explore');
});

// Quiz Page 1 Route
router.get('/quiz1', (req, res) => {
    res.render('quiz/quiz1');
});

module.exports = router;