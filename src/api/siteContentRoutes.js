const express = require('express');
const SiteContent = require('../models/siteContent'); // Adjust the path as needed
const router = express.Router();

// GET all site content
router.get('/', async (req, res) => {
    try {
        const siteContents = await SiteContent.find({});
        res.json(siteContents);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single content piece by ID
router.get('/:id', async (req, res) => {
    try {
        const content = await SiteContent.findById(req.params.id);
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.json(content);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new content piece
router.post('/', async (req, res) => {
    const content = new SiteContent(req.body);
    try {
        const newContent = await content.save();
        res.status(201).json(newContent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PATCH to update an existing content piece
router.patch('/:id', async (req, res) => {
    try {
        const content = await SiteContent.findById(req.params.id);
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }

        // Update fields that are available in the request body
        Object.keys(req.body).forEach(key => {
            content[key] = req.body[key];
        });

        const updatedContent = await content.save();
        res.json(updatedContent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a content piece by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await SiteContent.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.json({ message: 'Content deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
