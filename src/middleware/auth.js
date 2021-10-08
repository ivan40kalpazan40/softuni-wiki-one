const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/static');

function auth(req, res, next) {
  let token = req.cookies['cookieUser'];

  if (token) {
    jwt.verify(token, SECRET, (err, decodedToken) => {
      if (err) {
        throw err;
      }
      req.user = decodedToken;
      next();
    });
  } else {
    next();
  }
}

module.exports = auth;
