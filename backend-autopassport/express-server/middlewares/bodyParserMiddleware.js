
const bodyParser = require('body-parser');

const bodyParserMiddleware = [
  bodyParser.urlencoded({ extended: false }),
  bodyParser.json()
];

module.exports = bodyParserMiddleware;