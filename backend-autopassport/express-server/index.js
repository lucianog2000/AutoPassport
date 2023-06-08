const express = require('express');
const app = express();
const corsMiddleware = require('./middlewares/corsMiddleware');
const bodyParserMiddleware = require('./middlewares/bodyParserMiddleware');
const index = require('./routes/index');

// Middlewares configs
app.use(bodyParserMiddleware);
app.use(corsMiddleware);

// Routes configs
app.use('/', index);

const PORT = 5000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});