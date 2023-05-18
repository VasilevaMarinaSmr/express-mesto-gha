const router = require('express').Router();
const { createCard, getCards, delCard, likesCard, dislikesCard } = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', delCard);
router.put('/:cardId/likes', likesCard);
router.delete('/:cardId/likes', dislikesCard);


module.exports = router;