const express = require('express');
const User = require('../models/user'); // Adjust the path as needed
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single user by ID
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

// Create a new user
router.post('/', async (req, res) => {
    // Create a new user instance from User model
    const user = new User({
        // Initialize user properties from request body
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a user by ID
router.patch('/:id', getUser, async (req, res) => {
    const { displayName, email, profileImage, role } = req.body;

    if (displayName != null) {
        res.user.displayName = displayName;
    }

    if (email != null) {
        res.user.email = email;
    }

    if (profileImage != null) {
        res.user.profileImage = profileImage;
    }

    if (role != null) {
        res.user.role = role;
    }

    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a user by ID
router.delete('/users/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: 'Deleted User' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get user by ID
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
}

module.exports = router;
