const express = require('express');
const routes = require('./routes');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/User');

const templateInit = require('./config/handlebars');
const app = express();

templateInit(app);
// STATIC FOLDER SETUP
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(routes);

mongoose
  .connect('mongodb://localhost:27017/articles')
  .then((result) => {
    console.log('DB CONNECT');
    console.log(mongoose.connection);
    app.listen(
      5000,
      console.log.bind(console, 'Server working on port 5000....')
    );
    User.create({ username: 'Ivan', password: '123456' });
  })
  .catch((err) => {
    console.log(err);
  });
