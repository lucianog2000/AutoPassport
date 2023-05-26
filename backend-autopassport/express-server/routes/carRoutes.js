
const express = require('express');
const router = express.Router();
const CarController = require('../controllers/CarController');

router.post('/create', CarController.createCar);

module.exports = router;