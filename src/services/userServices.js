const User = require('../models/User');

const getUser = async (username) => {
  const user = await User.findOne({ username }).lean();
  return user;
};

const register = async (username, password) => {
  const newUser = { username, password, articles: [] };
  const user = await User.create(newUser);
  return user;
};

const userServices = { getUser, register };
module.exports = userServices;
