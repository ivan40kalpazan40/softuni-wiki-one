const express = require('express');
const router = express.Router();

const articleController = require('../src/controllers/articleController');
const homeController = require('../src/controllers/homeController');
const userController = require('../src/controllers/userController');

router.use('/', homeController);
router.use('/articles', articleController);
router.use('/user', userController);
router.use('*', (req, res) => {
  res
    .status(404)
    .render('404', { message: 'The requested page does not exist' });
});

module.exports = router;
