const express = require('express');
const path = require('path');

const app = express();

// STATIC FOLDER SETUP
app.use(express.static(path.resolve(__dirname, 'public')));
// EJS VIEW ENGINE SETUP
app.set('views', path.resolve('./src/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(5000, console.log.bind(console, 'Server working on port 5000....'));
