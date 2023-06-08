
const express = require('express');
const router = express.Router();
const CarController = require('../controllers/CarController');

router.get('/fines/:vin', CarController.getCarFinesByVIN);
router.post('/fines/:vin', CarController.addCarFineByVIN);

module.exports = router;