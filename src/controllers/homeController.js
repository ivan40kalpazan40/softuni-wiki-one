const express = require('express');
const router = express.Router();
const articleServices = require('../services/articleServices');

router.get('/', async (req, res) => {
  const articles = await articleServices.getAllLatest();
  console.log(req.user);
  res.render('index', { articles });
});

module.exports = router;
