const express = require('express');
const SiteInfo = require('../models/siteInfo'); // Adjust the path as needed
const router = express.Router();

// GET all site information
router.get('/', async (req, res) => {
    try {
        const siteInfos = await SiteInfo.find({});
        res.json(siteInfos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single site information by infoType
router.get('/:infoType', async (req, res) => {
    try {
        const siteInfo = await SiteInfo.findOne({ infoType: req.params.infoType });
        if (!siteInfo) {
            return res.status(404).json({ message: 'Site information not found' });
        }
        res.json(siteInfo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new site information
router.post('/', async (req, res) => {
    const siteInfo = new SiteInfo(req.body);
    try {
        const newSiteInfo = await siteInfo.save();
        res.status(201).json(newSiteInfo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PATCH to update existing site information
router.patch('/:infoType', async (req, res) => {
    try {
        const siteInfo = await SiteInfo.findOne({ infoType: req.params.infoType });
        if (!siteInfo) {
            return res.status(404).json({ message: 'Site information not found' });
        }

        // Update fields that are available in the request body
        Object.keys(req.body).forEach(key => {
            siteInfo[key] = req.body[key];
        });

        const updatedSiteInfo = await siteInfo.save();
        res.json(updatedSiteInfo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE site information by infoType
router.delete('/:infoType', async (req, res) => {
    try {
        const result = await SiteInfo.findOneAndDelete({ infoType: req.params.infoType });
        if (!result) {
            return res.status(404).json({ message: 'Site information not found' });
        }
        res.json({ message: 'Site information deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
