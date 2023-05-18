const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send( card ))
    .catch((err) =>
      res.status(500).send({ message: `Ошибка сервера ${err.message}` })
    );
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({
        message: 'Переданы некорректные данные',
      });
    } else {
      res.status(500).send({ message: `Ошибка сервера ${err.message}` });
    }
  });
};

module.exports.delCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res
          .status(404)
          .send({ message: 'Карточка с указанным _id не найдена.' });
      } else {
        res.status(200).send({ message: 'Карточка удалена' });
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

module.exports.likesCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: 'Переданы некорректные данные .',
        });
      } else {
        res.status(500).send({ message: `Произошла ошибка${err.message}` });
      }
    });
};
module.exports.dislikesCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.user._id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: 'Переданы некорректные данные',
        });
      } else {
        res.status(500).send({ message: `Ошибка сервера ${err.message}` });
      }
    });
};