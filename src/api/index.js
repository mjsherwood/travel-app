const express = require('express');
const router = express.Router();

//const dineRoutes = require('./dineRoutes');
//const exploreRoutes = require('./exploreRoutes');
const accommodationRoutes = require('./accommodationRoutes');
const userRoutes = require('./userRoutes');

//router.use('/dine', dineRoutes);
//router.use('/explore', exploreRoutes);
router.use('/accommodations', accommodationRoutes);
router.use('/users', userRoutes);

module.exports = router;