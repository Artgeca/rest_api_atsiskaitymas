const { Router } = require('express');
const { requireAuth } = require('../../../middleware/auth-middleware');
const { fetchAll, create, fetchById, replace, update, remove } = require('../../controllers/users-controller');

const usersRouter = Router();

usersRouter.use(requireAuth);

usersRouter.get('/', fetchAll);

usersRouter.get('/:id', fetchById);

usersRouter.post('/', create);

usersRouter.put('/:id', replace);

usersRouter.patch('/:id', update);

usersRouter.delete('/:id', remove);

module.exports = usersRouter;
