const express = require('express');
const router = express.Router();

const restaurantRoutes = require('./restaurantRoutes');
const experienceRoutes = require('./experienceRoutes');
const accommodationRoutes = require('./accommodationRoutes');
const userRoutes = require('./userRoutes');
const quizRoutes = require('./quizRoutes');
const siteContentRoutes = require('./siteContentRoutes');
const siteInfoRoutes = require('./siteInfoRoutes');

router.use('/restaurants', restaurantRoutes);
router.use('/experiences', experienceRoutes);
router.use('/accommodations', accommodationRoutes);
router.use('/users', userRoutes);
router.use('/quiz', quizRoutes);
router.use('/site-content', siteContentRoutes);
router.use('/site-info', siteInfoRoutes);

module.exports = router;