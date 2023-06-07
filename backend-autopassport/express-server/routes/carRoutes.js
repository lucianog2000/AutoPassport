
const express = require('express');
const router = express.Router();
const CarController = require('../controllers/CarController');

router.post('/create', CarController.createCar);
router.get('/all', CarController.getAllCars);
router.get('/:id', CarController.getCarById);
router.get('/fines/:vin', CarController.getCarFinesByVIN);

module.exports = router;