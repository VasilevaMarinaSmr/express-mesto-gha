const router = require('express').Router();
const { createUser, getUser, getUsers, updateProfile, updateAvatar } = require('../controllers/users');

router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);
router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/users', createUser);


module.exports = router;