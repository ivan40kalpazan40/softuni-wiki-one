const confirmPassword = (password, password2) => {
  return password === password2;
};

const generalServices = {
  confirmPassword,
};

module.exports = generalServices;
