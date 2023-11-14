const express = require('express');
const router = express.Router();

const restaurantRoutes = require('./restaurantRoutes');
//const experienceRoutes = require('./experienceRoutes');
const accommodationRoutes = require('./accommodationRoutes');
const userRoutes = require('./userRoutes');

router.use('/restaurants', restaurantRoutes);
//router.use('/experiences', experienceRoutes);
router.use('/accommodations', accommodationRoutes);
router.use('/users', userRoutes);

module.exports = router;