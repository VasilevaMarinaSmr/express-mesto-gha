const User = require("../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const errorRequest  = require("../errors/error-request");
const errorDataNotFound = require("../errors/datat-not-found-err");


//const {
//  ERROR_REQUEST,
//  ERROR_DATA_NOT_FOUND,
//  SERVER_ERROR,
// } = require("../utils/errors");

const { NODE_ENV, JWT_SECRET } = process.env;


module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        if (!user) {
          throw new NotFoundError('Пользователь по указанному _id не найден.');
        }
        res.send(user);
      }})
      .catch(next);
  };






module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;


  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .catch((err) => {
      if (err.name === 'MongoError' || err.code === 11000) {
        throw new ConflictError(
          'Пользователь с таким email уже зарегистрирован'
        );
      } else next(err);



    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ERROR_REQUEST).send({
          message: "Переданы некорректные данные при создании пользователя.",
        });
      } else {
        res.status(SERVER_ERROR).send({ message: "Ошибка по умолчанию." });
      }
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        res
          .status(ERROR_DATA_NOT_FOUND)
          .send({ message: "Пользователь с указанным _id не найден." });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ERROR_REQUEST).send({
          message: "Переданы некорректные данные при обновлении профиля.",
        });
      } else {
        res.status(SERVER_ERROR).send({ message: "Ошибка по умолчанию." });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        res
          .status(ERROR_DATA_NOT_FOUND)
          .send({ message: "Пользователь с указанным _id не найден." });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ERROR_REQUEST).send({
          message: "Переданы некорректные данные при обновлении аватара.",
        });
      } else {
        res.status(SERVER_ERROR).send({ message: "Ошибка по умолчанию." });
      }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((validUser) => {
      const token = jwt.sign(
        { _id: validUser._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' }
      );
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true }).send({ token }).end();
    })
    .catch((err) => {
      // ошибка аутентификации
      res
        .status(401)
        .send({ message: err.message });
    });
};
