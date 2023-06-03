const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;

const { urlTemplate } = require('../utils/url-template');
const {
  createCard,
  getCards,
  delCard,
  likesCard,
  dislikesCard,
} = require('../controllers/cards');

const validateId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!ObjectId.isValid(value)) {
          return helpers.error('any.invalid');
        }
        return value;
      }),
  }),
});

router.get('/cards', getCards);
router.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(urlTemplate),
    }),
  }),
  createCard,
);

router.delete('/cards/:cardId', validateId, delCard);
router.put('/cards/:cardId/likes', validateId, likesCard);
router.delete('/cards/:cardId/likes', validateId, dislikesCard);

module.exports = router;
