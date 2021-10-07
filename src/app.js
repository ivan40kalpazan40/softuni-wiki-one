const express = require('express');
const routes = require('./routes');
const path = require('path');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Article = require('./models/Article');

const templateInit = require('./config/handlebars');
const app = express();

templateInit(app);
app.use(express.urlencoded({ extended: false }));
// STATIC FOLDER SETUP
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(routes);

mongoose
  .connect('mongodb://localhost:27017/articles')
  .then(() => {
    console.log('DB CONNECT');
    app.listen(
      5000,
      console.log.bind(console, 'Server working on port 5000....')
    );
    // Article.create({ title: 'NEW ONE', description: 'VERY GOOOD AND VERY NEW' });
  })
  .catch((err) => {
    console.log(err.reason);
  });
