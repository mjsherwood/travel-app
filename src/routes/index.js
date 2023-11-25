const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const checkAccountLevel = require('../utils/checkAccountLevel');
const User = require('../models/user');
const SiteContent = require('../models/siteContent');
const SiteInfo = require('../models/siteInfo');
const ContactSubmission = require('../models/contactSubmission');

// Home Page Route
router.get('/', (req, res) => {
    const message = req.query.message;
    res.render('home', { message: message });
});

// About Us Page Route
router.get('/about-us', async (req, res) => {
    try {
        const aboutUs = await SiteContent.findOne({ pageName: 'about-us' });
        if (!aboutUs) {
            return res.status(404).send('About Us page not found');
        }
        res.render('about-us', { aboutUs });
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send('Error retrieving About Us page');
    }
});

// Contact Us Page Route
router.get('/contact', async (req, res) => {
    try {
        const contactInfo = await SiteInfo.findOne({ infoType: 'contact' });
        if (!contactInfo) {
            // Fallback if no contact info is found
            return res.render('contact', { contactInfo: { content: 'Contact information not available.' } });
        }
        res.render('contact', { contactInfo });
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send('Error retrieving contact information');
    }
});

// Contact Us Form Submission Route
router.post('/contact/submit', async (req, res) => {
    console.log(req.body); 
    try {
        const newSubmission = new ContactSubmission(req.body);
        await newSubmission.save();
        res.redirect('/?message=thankyou'); // Redirect with a query parameter
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send('Error processing your message');
    }
});

// Privacy Policy Page Route
router.get('/privacy-policy', async (req, res) => {
    try {
        const privacyPolicy = await SiteContent.findOne({ pageName: 'privacy-policy' });
        if (!privacyPolicy) {
            return res.status(404).send('Privacy policy not found');
        }
        res.render('privacy-policy', { privacyPolicy });
    } catch (err) {
        console.error("Error: ", err); 
        res.status(500).send('Error retrieving privacy policy');
    }
});


// Terms and Conditions Page Route
router.get('/terms-and-conditions', async (req, res) => {
    try {
        const termsConditions = await SiteContent.findOne({ pageName: 'terms-and-conditions' });
        if (!termsConditions) {
            return res.status(404).send('Terms and Conditions not found');
        }
        res.render('terms-and-conditions', { termsConditions });
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send('Error retrieving Terms and Conditions');
    }
});

// Login Page Route
router.get('/login', (req, res) => {
    res.render('login', { messages: req.flash() });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/account', // Redirect to the account page
    failureRedirect: '/login',  // Redirect back to login page
    failureFlash: true          // Optional: Enable flash messages for errors
}));

// Registration Page Route
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { displayName, email, password } = req.body;
    try {
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            displayName,
            email,
            password: hashedPassword
            // Add other user fields as necessary
        });

        await newUser.save();
        res.redirect('/login'); // Redirect to login page after successful registration
    } catch (err) {
        console.error(err);
        res.status(500).send('Error registering new user');
    }
});

// Account Page Route
router.get('/account', (req, res) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    res.render('account', { user: req.user });
});

// Logout Route
router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { 
            console.error("Logout error:", err);
            return next(err);
        }
        res.redirect('/');
    });
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

// Manage Page Route
router.get('/manage', checkAccountLevel(['editor', 'admin']), (req, res) => {
    res.render('admin/manage', { user: req.user });
});

module.exports = router;