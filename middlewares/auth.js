const jwt = require("jsonwebtoken");
const errorAuthorization = require("../errors/error-authorization");

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  let token = req.cookies.jwt;
  if (!token) {
    const { authorization } = req.headers;
      if (!authorization || !authorization.startsWith('Bearer ')) {
        throw new errorAuthorization('Требуется авторизация');
    }
    token = authorization.replace('Bearer ', '');
  }

  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (err) {
    throw new errorAuthorization("Неверный логин или пароль");
  }
  req.user = payload;
  return next();
};
