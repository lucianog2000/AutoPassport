const express = require('express');
const router = express.Router();
const BrandController = require('../controllers/BrandController');

router.get('/', BrandController.getAllBrands);

router.get('/:id', BrandController.getBrandById);

router.delete('/:id', BrandController.deleteBrandById);

router.post('/create', BrandController.createBrand);

module.exports = router;