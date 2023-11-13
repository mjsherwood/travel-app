const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // OAuth provider identifier (e.g., Google ID, Facebook ID, etc.)
    oauthId: {
        type: String,
        required: true,
        unique: true
    },
    // User's Display Name
    displayName: {
        type: String,
        required: true
    },
    // Email address (may be provided by the OAuth provider)
    email: {
        type: String,
        required: true,
        unique: true
    },
    // Profile picture URL (optional)
    profileImage: String,
    // User role
    role: {
        type: String,
        enum: ['user', 'editor', 'admin'],
        default: 'user'
    },
    // Additional fields as needed for your application
    // ...
}, { timestamps: true });  // Adds createdAt and updatedAt timestamps

const User = mongoose.model('User', userSchema);

module.exports = User;