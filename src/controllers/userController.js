const express = require('express');
const authServices = require('../services/authServices');
const generalServices = require('../services/generalServices');
const userServices = require('../services/userServices');
const { use } = require('./articleController');
const router = express.Router();

const renderLogin = (req, res) => {
  res.render('user/login');
};

const renderRegister = (req, res) => {
  res.render('user/register');
};
const registerUser = (req, res) => {
  const { username, password, password2 } = req.body;
  const isConfirmed = generalServices.confirmPassword(password, password2);
  if (isConfirmed) {
    userServices.getUser(username).then((user) => {
      const isExisting = Boolean(user);
      if (isExisting) {
        const error = new Error(`User ${user.username} already exists!`);
        console.error(error.message);
        return res.redirect('/user/register');
      }
      // REGISTER USER HERE
      generalServices
        .cryptPassword(password)
        .then((hashed) => {
          userServices
            .register(username, hashed)
            .then((user) => {
              res.redirect('/');
            })
            .catch((err) => {
              console.log(`ERROR MESSAGE:: ${err.message}`);
              res.redirect('/user/register');
            });
        })
        .catch((err) => {
          console.log(`ERR::`, err.message);
          res.redirect('/user/register');
        });
    });
  } else {
    const error = new Error('Passwords shoud match!');
    console.log(`ERR::: ${error.message}`);
    return res.redirect('/user/register');
  }
};

router.get('/login', renderLogin);
router.get('/register', renderRegister);
router.post('/register', registerUser);

module.exports = router;
