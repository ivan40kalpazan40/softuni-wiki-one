const express = require('express');
const router = express.Router();
const articleServices = require('../services/articleServices');

router.get('/', async (req, res) => {
  const articles = await articleServices.getAllLatest();
  res.render('index', { articles, user: req.user });
});

module.exports = router;
