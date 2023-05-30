const express = require('express');
const router = express.Router();
const carRoutes = require('./carRoutes');
const brandRoutes = require('./brandRoutes');

router.use('/cars', carRoutes);
router.use('/brands', brandRoutes);

module.exports = router;