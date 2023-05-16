const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(200).send( user ))
    .catch(() =>
      res.status(500).send({ message: `Произошла ошибка ${err.message}` })
    );
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
  .then((user) => {
    if (!user) {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    } else {
      res.status(200).send(user);
    }
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: 'Переданы некорректные данные',
        });
    } else {
      res.status(500).send({ message: `Произошла ошибка ${err.message}` });
    }
    });
  };



module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send( user ))
    .catch((err) =>
      res.status(500).send({ message: `Произошла ошибка ${err.message}` })
    );
};
