const express = require('express');
const Sleep = require('../models/accommodations'); // Adjust the path as needed
const Accommodation = require('../models/accommodations');
const router = express.Router();

// GET all accommodations
router.get('/', async (req, res) => {
    try {
        const accommodations = await Accommodation.find({});
        res.json(accommodations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single accommodation by ID
router.get('/:id', async (req, res) => {
    try {
        const accommodation = await Accommodation.findById(req.params.id);
        if (!accommodation) {
            return res.status(404).json({ message: 'Accommodation not found' });
        }
        res.json(accommodation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new accommodation
router.post('/', async (req, res) => {
    const accommodation = new Accommodation(req.body);
    try {
        const newAccommodation = await accommodation.save();
        res.status(201).json(newAccommodation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PATCH to update an existing accommodation
router.patch('/:id', async (req, res) => {
    try {
        const accommodation = await Sleep.findById(req.params.id);
        if (!accommodation) {
            return res.status(404).json({ message: 'Accommodation not found' });
        }

        // Update fields that are available in the request body
        Object.keys(req.body).forEach(key => {
            accommodation[key] = req.body[key];
        });

        const updatedAccommodation = await accommodation.save();
        res.json(updatedAccommodation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE an accommodation by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await Accommodation.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Accommodation not found' });
        }
        res.json({ message: 'Accommodation deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
