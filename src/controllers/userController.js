const express = require('express');
const authServices = require('../services/authServices');
const generalServices = require('../services/generalServices');
const userServices = require('../services/userServices');
const router = express.Router();
const jwt = require('jsonwebtoken');

const renderLogin = (req, res) => {
  res.render('user/login');
};

const renderRegister = (req, res) => {
  res.render('user/register');
};
const registerUser = async (req, res) => {
  const { username, password, password2 } = req.body;
  const isConfirmed = await generalServices.confirmPassword(
    password,
    password2
  );
  const userExists = await userServices.exists(username);
  const credentialsOK = userExists === null && isConfirmed;
  if (credentialsOK) {
    console.log('register user');
    try {
      const hash = await generalServices.cryptPassword(password);
      const user = await userServices.register(username, hash);
      console.log(user);
      res.redirect('/user/login');
    } catch (error) {
      console.log(`ERR ::register:: ${error.message}`);
      res.redirect('/user/register');
    }
  } else {
    console.log('cannot register with these credentials');
    res.redirect('/user/register');
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExists = await userServices.exists(username);
    const validPassword = await generalServices.validPassword(
      password,
      userExists.password
    );
    const userFound = Boolean(userExists);
    if (userFound && Boolean(validPassword)) {
      console.log('log user');
    } else {
      console.log('cannot log user');
      throw new Error(
        'Invalid user credentials. Username and password must be valid!'
      );
    }
  } catch (error) {
    console.log(`ERROR ::login:: ${error}`);
    const err = new Error(error.message);
    return res.status(401).send(err.message);
  }
};

router.get('/login', renderLogin);
router.post('/login', loginUser);
router.get('/register', renderRegister);
router.post('/register', registerUser);

module.exports = router;
