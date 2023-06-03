const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const ErrorAuthorization = require('../errors/error-authorization');

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new ErrorAuthorization('Требуется авторизация');
  }
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    throw new ErrorAuthorization('Неверный логин или пароль');
  }
  req.user = payload;
  return next();
};
