const CARS = require('./constants');

const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser'); // Para poder leer el body de las peticiones
const app = express();

// Configurar body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

<<<<<<< HEAD
// Configurar CORS
app.use(cors())

app.listen(5000, () => {
  console.log('Servidor escuchando en el puerto 5000 - http://localhost:5000');
=======
app.listen(3001, () => {
  console.log('Servidor escuchando en el puerto 3001 - http://localhost:3001');
>>>>>>> 4f3a76ebe2b4aebfec4db24928948c4c8bfb4fc1
});

app.get('/', (req, res) => {
  res.send('<h4>Hola 👋</h4>');
});

// Obtener todos los autos de mi colección
app.get('/data/all', (req, res) => {
  res.send(CARS)
});

// Obtener datos de un auto por id
app.get('/data/:id', (req, res) => {

  // Tomo el parametro id de la url
  const carID = req.params.id;

  // Busco el auto con ese id del array CARS y lo envio como respuesta
  // si no se encuentra el auto, se envia un mensaje de error
  const carData = CARS.find((car) => car.id == carID);
  if (carData) {
    res.send(carData);
  } else {
    res.status(404).send('No se encontró el auto');
  }
});

// Eliminar un auto por id 
app.delete('/data/:id', (req, res) => {

  // Tomo el parametro id de la url
  const carID = req.params.id;

  // Busco el índice del auto con ese ID en el array CARS
  const carIndex = CARS.findIndex((car) => car.id == carID);

  console.log(carIndex, carID)
  if (carIndex !== -1) {
    // Si se encontró el auto, se elimina del array
    CARS.splice(carIndex, 1);
    console.log('Eliminado');
    res.send('Auto eliminado correctamente');
  } else {
    console.log('No se encontró el auto');
    res.status(404).send('No se encontró el auto');
  }
});

// Eliminar un auto por id 
app.post('/api/create/', (req, res) => {

  console.log('Nuevos datos recibidos para insertar.')
  // Tomo el parametro id de la url
  const newCar = req.body;

  console.log('Body', newCar)
  res.send('Auto creado correctamente')
});
