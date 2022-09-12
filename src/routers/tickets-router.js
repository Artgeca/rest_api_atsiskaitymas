const { Router } = require('express');
const { fetchAll, fetchById, create, replace, update, remove } = require('../controllers/tickects-controller');

const ticketsRouter = Router();

ticketsRouter.get('/', fetchAll);

ticketsRouter.get('/:id', fetchById);

ticketsRouter.post('/', create);

ticketsRouter.put('/:id', replace);

ticketsRouter.patch('/:id', update);

ticketsRouter.delete('/:id', remove);

module.exports = ticketsRouter;