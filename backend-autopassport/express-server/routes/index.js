const express = require('express');
const router = express.Router();
const carRoutes = require('./carRoutes');

router.use('/cars', carRoutes);

module.exports = router;