const { Router } = require('express');
const ticketsRouter = require('./tickets-router');
const typesRouter = require('./types-router');
const usersRouter = require('./users-router');

const apiRouter = Router();

apiRouter.use('/tickets', ticketsRouter);
apiRouter.use('/types', typesRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
