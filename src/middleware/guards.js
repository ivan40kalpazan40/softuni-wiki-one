exports.isAuth = function (req, res, next) {
  if (!req.user) {
    return res.status(401).redirect('/user/login');
  }
  next();
};

exports.isGuest = function (req, res, next) {
  if (req.user) {
    return res.redirect('/');
  }
  next();
};
