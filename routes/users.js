const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { urlTemplate } = require('../utils/url-template');

const {
  getUser,
  getUsers,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile,
);

router.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().regex(urlTemplate),
    }),
  }),
  updateAvatar,
);

router.get('/users/me', getCurrentUser);

router.get(
  '/users/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().length(24).hex(),
    }),
  }),
  getUser,
);

router.get('/users', getUsers);

module.exports = router;
