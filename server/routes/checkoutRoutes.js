const express = require('express');
const router = express.Router();
const { completePurchase } = require('../controllers/checkoutControllers');
const { authenticateToken } = require('../middleware/auth');

router.post('/', authenticateToken, completePurchase);

module.exports = router;