const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const confirmPassword = async (password, password2) => {
  return await (() => {
    return password === password2;
  })();
};

const cryptPassword = (password) => {
  return bcrypt.hash(password, 10).then((hash) => {
    return hash;
  });
};

const validPassword = async (inputPass, dbPass) => {
  const isValid = await bcrypt.compare(inputPass, dbPass);
  return isValid;
};

const addToken = async (payload, secret, options) => {
  const token = await jwt.sign(payload, secret, options);
  return token;
};
const stringRandomizer = (string) => {
  return string
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');
};

const generalServices = {
  confirmPassword,
  cryptPassword,
  validPassword,
  addToken,
  stringRandomizer
};

module.exports = generalServices;
