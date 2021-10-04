const express = require('express');
const router = express.Router();

const getArticles = (req, res) => {
  res.render('articles/all-articles');
};

const renderCreate = (req, res) => {
  res.render('articles/create');
};

router.get('/', getArticles);
router.get('/create', renderCreate);

module.exports = router;
