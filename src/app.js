const express = require('express');
const routes = require('./routes');
const path = require('path');
const templateInit = require('../config/handlebars');
const app = express();

templateInit(app);
// STATIC FOLDER SETUP
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(routes);

app.listen(5000, console.log.bind(console, 'Server working on port 5000....'));
