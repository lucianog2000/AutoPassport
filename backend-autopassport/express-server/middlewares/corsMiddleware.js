const cors = require('cors');

const corsOptions = {
  // Cors options configuration. Not needed now.
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;