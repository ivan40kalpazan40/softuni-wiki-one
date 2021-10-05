const mongoose = require('mongoose');
const Article = require('../models/Article');

const getAll = async () => {
  const articles = await Article.find({}).lean();
  return articles;
};
const getArticle = async (id) => {
  const article = await Article.findById({ _id: id }).lean();
  return article;
};

const getAllLatest = async () => {
  const articles = await Article.find({}).sort({ created: 'desc' }).lean();
  return articles;
};

const create = async (title, description) => {
  const article = await Article.create(title, description);
  return article;
};

const articleServices = {
  getAll,
  getArticle,
  getAllLatest,
  create,
};
module.exports = articleServices;
