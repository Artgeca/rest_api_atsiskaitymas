const { Router } = require('express');
const { fetchAll, create, fetchById, replace, update, remove } = require('../../controllers/types-controller');

const typesRouter = Router();

typesRouter.get('/', fetchAll);

typesRouter.get('/:id', fetchById);

typesRouter.post('/', create);

typesRouter.put('/:id', replace);

typesRouter.patch('/:id', update);

typesRouter.delete('/:id', remove);

module.exports = typesRouter;
