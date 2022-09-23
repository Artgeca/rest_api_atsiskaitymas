const { Router } = require('express');
const { fetchAll, create, fetchById, replace, update, remove } = require('../../controllers/types-controller');

const usersRouter = Router();

usersRouter.get('/', fetchAll);

usersRouter.get('/:id', fetchById);

usersRouter.post('/', create);

usersRouter.put('/:id', replace);

usersRouter.patch('/:id', update);

usersRouter.delete('/:id', remove);

module.exports = usersRouter;
