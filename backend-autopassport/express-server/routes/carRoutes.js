
const express = require('express');
const router = express.Router();
const CarController = require('../controllers/CarController');

router.get('/', CarController.getAllCars);

router.get('/:id', CarController.getCarById);

router.delete('/:id', CarController.deleteCarById);

router.post('/create', CarController.createCar);

module.exports = router;