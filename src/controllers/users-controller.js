const { validMongoObjectId } = require('../helpers');
const { sendErrorResponse, createNotFoundError } = require('../helpers/error');
const { hashPassword } = require('../helpers/password-encryption');
const UserModel = require('../models/user-model');
const createUserViewModel = require('../view-models/create-user-view-model');

const createUserNotFoundError = (userId) => createNotFoundError(`User with id: '${userId}' not found`);


const fetchAll = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users.map(user => createUserViewModel(user)));
  } catch (err) { sendErrorResponse(err, res); }
};

const fetchById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findById(userId);

    if (user === null) throw createUserNotFoundError(userId);
    res.status(200).json(createUserViewModel(user));
  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const requestData = req.body;

  try {
    await UserModel.validateUser(requestData);
    const { email, password, role } = requestData;
    const newUserDoc = await UserModel.create({
      email,
      password: await hashPassword(password),
      role
    });

    res.status(200).json(createUserViewModel(newUserDoc));
  } catch (err) { sendErrorResponse(err, res); }
};

const replace = async (req, res) => {
  const userId = req.params.id;
  const requestData = req.body;

  try {
    if (!validMongoObjectId(userId)) throw createUserNotFoundError(userId);

    await UserModel.validateUser(requestData);
    const { email, password, role, tickets } = requestData;

    const userDoc = await UserModel.findById(userId);
    if (userDoc === null) throw createUserNotFoundError(userId);

    const replacedUserDoc = await UserModel.findOneAndReplace(
      { _id: userId },
      {
        email,
        password: await hashPassword(password),
        role,
        tickets,
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: userDoc.__v,
      },
      {
        new: true,
      }
    );

    res.status(200).json(createUserViewModel(replacedUserDoc));

  } catch (err) { sendErrorResponse(err, res); }
};

const update = async (req, res) => {
  const userId = req.params.id;
  const requestData = req.body;

  try {
    if (!validMongoObjectId(userId)) throw createUserNotFoundError(userId);

    await UserModel.validateUserUpdate(requestData);
    const { email, password, role, tickets } = requestData;

    const updatedUserDoc = await UserModel.findByIdAndUpdate(
      userId,
      {
        email,
        password: password && await hashPassword(password),
        role,
        tickets,
      },
      {
        new: true,
      }
    );

    if (updatedUserDoc === null) throw createUserNotFoundError(userId);

    res.status(200).json(createUserViewModel(updatedUserDoc));

  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const userId = req.params.id;

  try {
    if (!validMongoObjectId(userId)) throw createUserNotFoundError(userId);

    const deletedUserDoc = await UserModel.findByIdAndDelete(userId);
    if (deletedUserDoc === null) throw createUserNotFoundError(userId);

    res.status(200).json(createUserViewModel(deletedUserDoc));
  } catch (err) { sendErrorResponse(err, res); }
};

module.exports = {
  fetchAll,
  fetchById,
  create,
  replace,
  update,
  remove
};
