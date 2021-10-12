const express = require('express');
const router = express.Router();
const articleServices = require('../services/articleServices');
const userServices = require('../services/userServices');
const { isAuth } = require('../middleware/guards');
const User = require('../models/User');

const getArticles = async (req, res) => {
  const articles = await articleServices.getAll();
  res.render('articles/all-articles', { articles, user: req.user });
};

const renderCreate = (req, res) => {
  res.render('articles/create', { user: req.user });
};

const createArticle = async (req, res) => {
  const { title, description } = req.body;
  try {
    const article = await articleServices.create({ title, description });
    console.log('Article created');
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

const renderArticle = async (req, res) => {
  const articleId = req.params.id;
  const article = await articleServices.getArticle(articleId);
  res.render('articles/article', { article, user: req.user });
};
const renderEdit = async (req, res) => {
  const articleId = req.params.id;
  const article = await articleServices.getArticle(articleId);
  try {
    res.render('articles/edit', { article });
  } catch (error) {
    res.send(error.message);
  }
};

const editArticle = async (req, res) => {
  const articleId = req.params.id;
  const description = req.body.description;
  const article = await articleServices.edit(articleId, description);
  res.redirect('/');
};

const deleteArticle = async (req, res) => {
  const articleId = req.params.id;
  const article = await articleServices.remove(articleId);
  console.log('Article Deleted!');
  res.redirect('/');
};

router.get('/', getArticles);
router.get('/create', isAuth, renderCreate);
router.post('/create', isAuth, createArticle);
router.get('/article/:id', renderArticle);
router.get('/article/edit/:id', isAuth, renderEdit);
router.post('/article/edit/:id', isAuth, editArticle);
router.get('/article/delete/:id', isAuth, deleteArticle);

module.exports = router;
