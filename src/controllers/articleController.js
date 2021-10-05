const express = require('express');
const router = express.Router();
const articleServices = require('../services/articleServices');

const getArticles = async (req, res) => {
  const articles = await articleServices.getAll();
  console.log(articles);
  res.render('articles/all-articles', { articles });
};

const renderCreate = (req, res) => {
  res.render('articles/create');
};

router.get('/', getArticles);
router.get('/create', renderCreate);

module.exports = router;
