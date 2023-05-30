const router = require('express').Router();
const {
  getUser,
  getUsers,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');


router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);
router.get('/users', getUsers);
router.get('/users/:userId', getUser);

module.exports = router;
