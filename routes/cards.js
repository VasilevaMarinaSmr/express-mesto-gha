const router = require('express').Router();
const {
  createCard,
  getCards,
  delCard,
  likesCard,
  dislikesCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', delCard);
router.put('/cards/:cardId/likes', likesCard);
router.delete('/cards/:cardId/likes', dislikesCard);

module.exports = router;
