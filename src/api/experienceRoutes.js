const express = require('express');
const Experience = require('../models/experiences'); // Adjust the path as needed
const router = express.Router();

// GET all experiences
router.get('/', async (req, res) => {
    try {
        const experiences = await Experience.find({});
        res.json(experiences);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single experience by ID
router.get('/:id', async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }
        res.json(experience);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new experience
router.post('/', async (req, res) => {
    const experience = new Experience(req.body);
    try {
        const newExperience = await experience.save();
        res.status(201).json(newExperience);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PATCH to update an existing experience
router.patch('/:id', async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        // Update fields that are available in the request body
        Object.keys(req.body).forEach(key => {
            experience[key] = req.body[key];
        });

        const updatedExperience = await experience.save();
        res.json(updatedExperience);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE an experience by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await Experience.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Experience not found' });
        }
        res.json({ message: 'Experience deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
