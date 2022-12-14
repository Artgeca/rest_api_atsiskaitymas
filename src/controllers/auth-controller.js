const { sendErrorResponse, createNotFoundError } = require('../helpers/error');
const { isPasswordCorrect, hashPassword } = require('../helpers/password-encryption');
const { createToken } = require('../helpers/token');
const UserModel = require('../models/user-model');

const login = async (req, res) => {
  const { email, password } = req.body;
  const crudentialExists = Boolean(email && password);

  try {
    if (!crudentialExists) throw new Error('Missing crudentials');
    const userDoc = await UserModel.findOne({ email });

    if (userDoc === null) throw createNotFoundError(`User with email '${email}' was not found.`);

    const passwordIsCorrect = await isPasswordCorrect(password, userDoc.password);

    if (!passwordIsCorrect) throw new Error('Password is incorrect');

    res.status(200).json({
      user: userDoc,
      token: createToken({ email: userDoc.email, role: userDoc.role })
    });

  } catch (err) { sendErrorResponse(err, res); }
};

const register = async (req, res) => {
  const requestData = req.body;

  try {
    await UserModel.validateUser(requestData);
    const { email, password, } = requestData;

    const userDoc = await UserModel.create({
      email,
      password: await hashPassword(password),
    });

    res.status(201).json({
      user: userDoc,
      token: createToken({ email: userDoc.email, role: userDoc.role })
    });

  } catch (err) { sendErrorResponse(err, res); }
};

module.exports = {
  login,
  register
};
