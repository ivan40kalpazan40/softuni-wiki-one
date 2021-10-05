const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true, minlength: 5 },
  description: { type: String, required: true, minlength: 20 },
  author: { type: mongoose.Types.ObjectId },
  created: { type: Date, default: Date.now() },
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
