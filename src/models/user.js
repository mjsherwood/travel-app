const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // OAuth provider identifier (e.g., Google ID, Facebook ID, etc.)
    oauthId: {
        type: String,
        unique: true,
        sparse: true // This makes the field optional but enforces uniqueness when used
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
    // Password (for local authentication)
    password: {
        type: String,
        // Required only if oauthId is not provided
        required: function() {
            return !this.oauthId;
        }
    },
    // User role
    role: {
        type: String,
        enum: ['user', 'editor', 'admin'],
        default: 'user'
    },
    // Travel Type (Optional)
    travelType: {
        type: String,
        enum: ['adventure', 'eco', 'culture', 'social', 'relaxation', 'luxury'],
        required: false
    },
    // Additional fields as needed for your application
    // ...
}, { timestamps: true });  // Adds createdAt and updatedAt timestamps

const User = mongoose.model('User', userSchema);

module.exports = User;
