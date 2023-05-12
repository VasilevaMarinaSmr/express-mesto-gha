const router = require('express').Router();
const { createCard, getCards, delCard } = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:userId', delCard);

module.exports = router;