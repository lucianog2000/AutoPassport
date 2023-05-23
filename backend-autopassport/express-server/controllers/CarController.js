const { CARS } = require('../constants');

const CarController = {
  getAllCars: (req, res) => {
    res.send(CARS);
  },

  getCarById: (req, res) => {
    const carID = req.params.id;
    const carData = CARS.find((car) => car.id == carID);
    if (carData) {
      res.send(carData);
    } else {
      res.status(404).send('Car not found');
    }
  },

  deleteCarById: (req, res) => {
    const carID = req.params.id;
    const carIndex = CARS.findIndex((car) => car.id == carID);
    if (carIndex !== -1) {
      CARS.splice(carIndex, 1);
      res.send('Car deleted');
    } else {
      res.status(404).send('Car not found');
    }
  },

  createCar: (req, res) => {
    const newCar = req.body;
    console.log('Body', newCar);
    res.send('Car created successfully');
  }
};

module.exports = CarController;