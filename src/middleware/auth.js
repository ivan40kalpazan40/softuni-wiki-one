const jwt = require('jsonwebtoken');
const SECRET = 'ivan';

const auth = (req, res, next) => {
  const token = req.cookies['myCookie'];

  if (token) {
    jwt.verify(token, SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err);
        throw err;
      }
      req.user = decodedToken;
    });
  }
  console.log('HERE');
  next();
};

module.exports = auth;
