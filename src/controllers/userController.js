const express = require('express');
const generalServices = require('../services/generalServices');
const userServices = require('../services/userServices');
const { isGuest, isAuth } = require('../middleware/guards');
const { SECRET } = require('../config/static');

const router = express.Router();

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
    if (Boolean(userExists) && Boolean(validPassword)) {
      // LOG USER
      console.log('log user');
      const payload = {
        username,
        greeting: 'Special greeting',
        profile_data: {
          bio: 'Lorem ipsum20',
          job: 'accountant',
          hobbies: ['ski', 'hiking', 'reading'],
          articles: [],
        },
      };
      const options = {
        expiresIn: '1h',
      };

      const token = await generalServices.addToken(payload, SECRET, options);
      //console.log(generalServices.stringRandomizer(userExists._id));
      res.cookie(`cookieUser`, token, { maxAge: 3600000, httpOnly: true });
      res.redirect('/');
    } else {
      console.log('cannot log user');
      throw new Error(
        'Invalid user credentials. Username and password must be valid!'
      );
    }
  } catch (error) {
    console.log(`ERROR ::login:: ${error}`);
    const err = new Error(error.message);
    if (err.message.includes('credentials')) {
      return res.status(401).render('404', { message: err.message });
    }
    return res.status(401).render('404');

    // TODO ... handle errors in more elegant way
  }
};

const logoutUser = (req, res) => {
  res.clearCookie('cookieUser').redirect('/user/login');
};

router.get('/login', isGuest, renderLogin);
router.post('/login', isGuest, loginUser);
router.get('/register', isGuest, renderRegister);
router.post('/register', isGuest, registerUser);
router.get('/logout', isAuth, logoutUser);

module.exports = router;
