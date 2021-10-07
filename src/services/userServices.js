const User = require('../models/User');
const bcrypt = require('bcrypt');

const getUser = async (username) => {
  const user = await User.findOne({ username }).lean();
  return user;
};

const register = async (username, password) => {
  const newUser = { username, password, articles: [] };
  const user = await User.create(newUser);
  return user;
};
const logUser = async (username, password) => {
  const user = await getUser(username);
  if (user !== null) {
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) return user;
      return undefined;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
  return undefined;
};

const userServices = { getUser, register, logUser };
module.exports = userServices;
