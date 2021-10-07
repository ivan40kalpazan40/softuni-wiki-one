const bcrypt = require('bcrypt');

const confirmPassword = (password, password2) => {
  return password === password2;
};

const cryptPassword = (password) => {
  return bcrypt.hash(password, 10).then((hash) => {
    return hash;
  });
};

const generalServices = {
  confirmPassword,
  cryptPassword,
};

module.exports = generalServices;
