const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    imageUrl: String, // Assuming you have images for each option
    nextSet: String // The next set of questions to lead to
});

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    options: [optionSchema], // Array of optionSchema
    setType: {
        type: String,
        enum: ['Initial', 'Adventure Seeker', 'Culture Enthusiast', 'Relaxation Hunter', 'Social Butterfly', 'Luxury Connoisseur', 'Eco-conscious Traveler'],
        required: true
    }
    // You can add additional fields if needed
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
