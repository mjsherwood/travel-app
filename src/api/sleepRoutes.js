const express = require('express');
const Sleep = require('../models/sleep'); // Adjust the path as needed
const router = express.Router();

// GET route to retrieve accommodations
router.get('/sleep', async (req, res) => {
    try {
        const accommodations = await Sleep.find({});
        res.send(accommodations);
    } catch (err) {
        res.status(500).send('Error retrieving accommodations');
    }
});

// POST route to create a new accommodation
router.post('/sleep', async (req, res) => {
    try {
        const newAccommodation = new Sleep(req.body);
        await newAccommodation.save();
        res.status(201).send('Accommodation saved');
    } catch (err) {
        res.status(500).send('Error saving accommodation');
    }
});

module.exports = router;