require('dotenv').config();
const jwt = require('jsonwebtoken');
const process = require('process');

const createToken = ({ email, role }) => jwt.sign({ email, role }, process.env.JWT_SECRET, { expiresIn: '24h' });

const decodeToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
  createToken,
  decodeToken
};
