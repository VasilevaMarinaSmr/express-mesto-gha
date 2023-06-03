const router = require("express").Router();
const { urlTemplate } = require("../utils/url-template");
const { celebrate, Joi } = require("celebrate");
const { ObjectId } = require("mongoose").Types;

const {
  getUser,
  getUsers,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

router.patch(
  "/users/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile
);

router.patch(
  "/users/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().regex(urlTemplate),
    }),
  }),
  updateAvatar
);

router.get("/users", getUsers);
router.get(
  "/users/:userId",
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().length(24).hex(),
    }),
  }),
  getUser
);

module.exports = router;
