const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartControllers');
const auth = require('../middleware/auth');

router.post('/', auth, cartController.addToCart);
router.get('/', auth, cartController.getCart);
router.delete('/:datasetId', auth, cartController.removeFromCart);

module.exports = router;