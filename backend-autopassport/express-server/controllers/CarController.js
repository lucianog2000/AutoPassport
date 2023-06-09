const admin = require('../services/firebase');
const db = admin.firestore();
const { getRandomDateOfLastTwentyDays, getRandomFinAmount, getRandonFine } = require('../services/carService');

const CarController = {

  getCarFinesByVIN: async (req, res) => {
    try {
      const carVIN = req.params.vin;
      const dataRef = db.collection('carFines');
      // Search for the car with the given VIN
      const snapshot = await dataRef.where('vin', '==', carVIN).get();
      if (snapshot.empty) {
        return res.status(404).json({ error: 'Car not found' });
      }
      // Code comment to show how to get data from snapshot and parse it to JSON string
      // const carData = snapshot.docs.map((doc) => doc.data());
      // const dataParsed = carData.map((fact) => JSON.stringify(fact)).join(", ");

      const dataParsed = [];
      snapshot.forEach((doc) => {
        dataParsed.push(doc.data());
      });

      res.status(200).json({ results: dataParsed });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error fetching data' });
    }
  },

  addCarFineByVIN: async (req, res) => {

    const carVIN = req.params.vin;
    if (!carVIN) {
      return res.status(400).json({ error: 'VIN is required' });
    }
    // Comprove if VIN has 17 characters
    if (carVIN.length < 15) {
      return res.status(400).json({ error: 'VIN must have +15 characters' });
    }
    // TODO: Uppercase VIN and remove spaces and special characters

    const dataRef = db.collection('carFines');
    const snapshot = await dataRef.where('vin', '==', carVIN).get();
    // Check if car not exists in the database
    if (!snapshot.empty) {
      return res.status(404).json({ error: 'VIN already exists' });
    }
    // Try to add the car fine to the database
    try {
      const randomBody = {
        vin: carVIN.toString(),
        fineDate: getRandomDateOfLastTwentyDays(),
        fineAmount: getRandomFinAmount(),
        fineDescription: getRandonFine(),
        paid: 'false'
      };
      const newCarFine = randomBody;
      const response = await db.collection('carFines').add(newCarFine);
      console.log('Added document with ID: ', response.id, response.ok);
      res.status(200).json({ message: 'Car fine added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error insert carFine' });
    }
  }
};

module.exports = CarController;
