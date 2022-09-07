const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const { SERVER_DOMAIN, SERVER_PROTOCOL, SERVER_PORT } = process.env;
const constantsConfiguredInEnvFile = SERVER_DOMAIN && SERVER_PROTOCOL && SERVER_PORT;

try {
  if (!constantsConfiguredInEnvFile) {
    throw new Error('Project constants are not defined. \n\t Define constants in ".env"');
  }

  const app = express();

  app.use(express.json());
  app.use(morgan('tiny'));
  app.use(cors());

  app.get('/', (req, res) => {
    res.send('Hello!');
  });

  app.listen(SERVER_PORT, (err) => {
    if (err) {
      console.error('Server failed to start!');
    }

    console.log(`Server is up and running on port: ${SERVER_PORT}`);
  });
} catch (error) {
  console.error(error.message);
}