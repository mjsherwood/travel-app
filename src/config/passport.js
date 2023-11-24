const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user already exists in your database
        let user = await User.findOne({ oauthId: profile.id });

        if (user) {
            return done(null, user); // User found, return that user
        } else {
            // If not, create a new user in your database
            user = await User.create({
                oauthId: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value,
                profileImage: profile.photos[0].value
            });

            return done(null, user);
        }
    } catch (error) {
        return done(error, null);
    }
}));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email'] // Fields you want from Facebook
},
async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user already exists in your database
        let user = await User.findOne({ oauthId: profile.id });

        if (user) {
            return done(null, user); // User found, return that user
        } else {
            // If not, create a new user in your database
            user = await User.create({
                oauthId: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value, // Make sure email permission is granted
                profileImage: profile.photos[0].value
            });

            return done(null, user);
        }
    } catch (error) {
        return done(error, null);
    }
}));

// Serialize user to decide which data of the user object should be stored in the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user based on the id (which was stored in the session)
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});