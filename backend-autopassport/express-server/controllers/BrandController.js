const { BRANDS } = require('../constants');

const BrandController = {
  getAllBrands: (req, res) => {
    res.json({ results: BRANDS });
  },

  getBrandById: (req, res) => {
    const brandID = req.params.id;
    const brandData = BRANDS.find((brand) => brand.id === brandID);
    if (brandData) {
      res.send(brandData);
    } else {
      res.status(404).json({ error: 'Brand not found', code: 404 });
    }
  },

  deleteBrandById: (req, res) => {
    const brandID = req.params.id;
    const brandIndex = BRANDS.findIndex((brand) => brand.id === brandID);
    if (carIndex !== -1) {
      BRANDS.splice(brandIndex, 1);
      res.send('Brand deleted');
    } else {
      res.status(404).json({ error: 'Brand not found', code: 404 });
    }
  },

  createBrand: (req, res) => {
    const newBrand = req.body;
    console.log('Body', newBrand);
    res.send('Brand created successfully');
  }
};

module.exports = BrandController;