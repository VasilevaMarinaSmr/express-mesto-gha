const jwt = require("jsonwebtoken");
const errorAuthorization = require("../errors/error-authorization");

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
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
  next();
};
