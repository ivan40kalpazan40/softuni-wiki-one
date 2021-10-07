const express = require('express');
const generalServices = require('../services/generalServices');
const router = express.Router();

const renderLogin = (req, res) => {
  console.log('LOGG');
  res.render('user/login');
};

const renderRegister = (req, res) => {
  res.render('user/register');
};
const registerUser = (req, res) => {
  const { username, password, password2 } = req.body;
  const isConfirmed = generalServices.confirmPassword(password, password2);
  if (isConfirmed) {
    // Todo
  } else {
    // todo
  }
};

router.get('/login', renderLogin);
router.get('/register', renderRegister);
router.post('/register', registerUser);

module.exports = router;
