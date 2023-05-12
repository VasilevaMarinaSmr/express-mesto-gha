const Card = require('../models/card');


module.exports.getUsers = (req, res) => {
  Card.find({})
  .populate(['owner', 'likes'])
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: `Произошла ошибка ${err.message}` }));
};



module.exports.createCard =(req, res) => {
  const { name, link, ownerId  } = req.body;

  Card.create({ name, link, owner: ownerId   })
    .then(film => res.send({ data: film }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};