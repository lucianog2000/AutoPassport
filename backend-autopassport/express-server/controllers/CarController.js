const { CARS } = require('../constants');
const admin = require('../services/firebase');
const db = admin.firestore();

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
  },

  getCarFinesByVIN: async (req, res) => {
    try {
      const carVIN = req.params.vin;
      const datosRef = db.collection('carFines');
      const snapshot = await datosRef.where('vin', '==', carVIN).get();

      if (snapshot.empty) {
        return res.status(404).json({});
      }
      const datos = snapshot.docs.map((doc) => doc.data());
      const datosString = datos.map((dato) => JSON.stringify(dato)).join(", ");
      console.log('Datos:', datosString, typeof datosString);
      res.send(datosString);
    } catch (error) {
      console.log('Error al obtener los datos:', error);
      res.status(500).json({ error: 'Error al obtener los datos' });
    }
  },
  addCarFineByVIN: async (req, res) => {

    req.body = 'Aca va lo que envies en el body de postman'
    randomBody = {
      "id": 1,
      "vin": req.params.vin,
      "licensePlate": "ABC123",
      "fineDate": "2021-01-01",
      "fineAmount": 1000,
      "fineDescription": "Speeding",
      "fineStatus": "pending",
      "paid": false
    }
    try {
      const newCarFine = randomBody;
      const res = await db.collection('carFines').add(newCarFine);
      console.log('Added document with ID: ', res.id);
    } catch (error) {
      console.log('Error al obtener los datos:', error);
      res.status(500).json({ error: 'Error al obtener los datos' });
    }
  }
};

module.exports = CarController;