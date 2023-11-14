const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
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
    priceRange: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    specialties: [String], // Array of strings representing specialties or popular dishes
    images: [String], // URLs as strings
    restaurantType: {
        type: String,
        enum: ['adventure', 'eco', 'culture', 'social', 'relaxation', 'luxury'],
        required: true
    }
    // Add other fields as needed
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;