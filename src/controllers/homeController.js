const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { message: 'Hello i am dynamic message!' });
});

module.exports = router;
