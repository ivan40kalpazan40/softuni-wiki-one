const express = require('express');
const routes = require('./routes');
const path = require('path');
const handlebars = require('express-handlebars');

const app = express();

// STATIC FOLDER SETUP
app.use(express.static(path.resolve(__dirname, 'public')));
// Handlebars VIEW ENGINE SETUP
app.set('views', path.resolve(__dirname, 'views'));
app.engine('hbs', handlebars({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.use(routes);

app.listen(5000, console.log.bind(console, 'Server working on port 5000....'));
