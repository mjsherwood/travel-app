const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to start OAuth with Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'] // Scopes you want to access
}));

// Google OAuth callback route
router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/',  // Redirect to home or another page on success
    failureRedirect: '/login'  // Redirect to login or another page on failure
}));

// Route to start OAuth with Facebook
router.get('/facebook', passport.authenticate('facebook', {
    scope: ['email'] // Facebook scopes, adjust as necessary
}));

// Facebook OAuth callback route
router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',  // Redirect to home or another page on success
    failureRedirect: '/login'  // Redirect to login or another page on failure
}));

module.exports = router;