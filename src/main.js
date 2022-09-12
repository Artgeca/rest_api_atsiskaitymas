require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const process = require('process');
const ticketsRouter = require('./routers/tickets-router');

const { SERVER_DOMAIN, SERVER_PROTOCOL, SERVER_PORT, DB_CONNECTION } = process.env;
const constantsConfiguredInEnvFile = SERVER_DOMAIN && SERVER_PROTOCOL && SERVER_PORT && DB_CONNECTION;

try {
  if (!constantsConfiguredInEnvFile) {
    throw new Error('Project constants are not defined.\n\t Define constants in ".env"');
  }

  const app = express();

  app.use(express.json());
  app.use(morgan('tiny'));
  app.use(cors());

  app.use('/tickets', ticketsRouter);

  mongoose.connect(DB_CONNECTION, (err) => {
    if (err) {
      throw err.message;
    }

    console.log('Connected to MongoDB Atlass');

    app.listen(SERVER_PORT, (err) => {
      if (err) {
        console.error('Server failed to start!');
      }

      console.log(`Server is up and running on port: ${SERVER_PORT}`);
    });
  });

} catch (err) {
  console.error(err.message);
}