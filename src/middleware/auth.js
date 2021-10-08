const jwt = require('jsonwebtoken');
const SECRET = 'ivan';

const auth = (req, res, next) => {
  const token = req.cookies['myCookie'];

  if (token) {
    jwt.verify(token, SECRET, (err, decodedToken) => {
      if (err) {
        throw err;
      }
      req.user = decodedToken;
    });
  }
  next();
};

module.exports = auth;
