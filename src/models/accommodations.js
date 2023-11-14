const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema({
    name: {
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
    rating: {
        type: Number,
        default: 0
    },
    amenities: [String], // Array of strings
    images: [String], // URLs as strings
    available: {
        type: Boolean,
        default: true
    },
    travelType: {
        type: String,
        enum: ['adventure', 'eco', 'culture', 'social', 'relaxation', 'luxury'],
        required: true
    }
    // Add other fields as needed
});

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = Accommodation;