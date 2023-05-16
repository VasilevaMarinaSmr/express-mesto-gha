const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send( card ))
    .catch((err) =>
      res.status(500).send({ message: `Произошла ошибка ${err.message}` })
    );
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) =>
      res.status(500).send({ message: `Произошла ошибка ${err.message}` })
    );
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

