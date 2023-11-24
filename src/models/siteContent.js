const mongoose = require('mongoose');

const staticPageSchema = new mongoose.Schema({
    pageName: { 
        type: String,
        required: true,
        unique: true
    },
    title: { 
        type: String,
        required: true
    },
    content: { 
        type: String,
        required: true
    },
    lastUpdated: { 
        type: Date,
        default: Date.now
    }
    // You can add more fields as necessary
});

const StaticPage = mongoose.model('StaticPage', staticPageSchema);

module.exports = StaticPage;
