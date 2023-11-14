const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [String], // URLs as strings
    experienceType: {
        type: String,
        enum: ['adventure', 'eco', 'culture', 'social', 'relaxation', 'luxury'],
        required: true
    }
    // Add other fields as needed
});

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;
