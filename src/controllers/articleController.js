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

const createArticle = async (req, res) => {
  const { title, description } = req.body;
  try {
    const article = await articleServices.create({ title, description });
    console.log('Article created');
    console.log(article);
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

router.get('/', getArticles);
router.get('/create', renderCreate);
router.post('/create', createArticle);

module.exports = router;
