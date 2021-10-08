const User = require('../models/User');
const bcrypt = require('bcrypt');

const exists = async (username) => {
  const user = await User.findOne({ username }).lean();
  return user;
};

const register = async (username, password) => {
  const newUser = { username, password, articles: [] };
  const user = await User.create(newUser);
  return user;
};

const userServices = { exists, register };
module.exports = userServices;
