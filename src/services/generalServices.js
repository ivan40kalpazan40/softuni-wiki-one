const bcrypt = require('bcrypt');

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

const generalServices = {
  confirmPassword,
  cryptPassword,
  validPassword,
};

module.exports = generalServices;
