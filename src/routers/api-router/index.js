const { Router } = require('express');
const ticketsRouter = require('./tickets-router');
const typesRouter = require('./types-router');

const apiRouter = Router();

apiRouter.use('/tickets', ticketsRouter);
apiRouter.use('/types', typesRouter);

module.exports = apiRouter;
