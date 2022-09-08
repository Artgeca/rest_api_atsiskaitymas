const { Router } = require('express');
const { fetchAll, fetchById, create } = require('../controllers/tickects-controller');

const ticketsRouter = Router();

ticketsRouter.get('/', fetchAll);

ticketsRouter.get('/:id', fetchById);

ticketsRouter.post('/', create);

module.exports = ticketsRouter;