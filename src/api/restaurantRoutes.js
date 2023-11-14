const express = require('express');
const Restaurant = require('../models/restaurants'); // Adjust the path as needed
const router = express.Router();

// GET all restaurants
router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({});
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single restaurant by ID
router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json(restaurant);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new restaurant
router.post('/', async (req, res) => {
    const restaurant = new Restaurant(req.body);
    try {
        const newRestaurant = await restaurant.save();
        res.status(201).json(newRestaurant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PATCH to update an existing restaurant
router.patch('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        // Update fields that are available in the request body
        Object.keys(req.body).forEach(key => {
            restaurant[key] = req.body[key];
        });

        const updatedRestaurant = await restaurant.save();
        res.json(updatedRestaurant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a restaurant by ID
router.delete('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json({ message: 'Restaurant deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
