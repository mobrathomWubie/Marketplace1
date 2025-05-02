const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.post('/', userController.createUser); //post to register
router.post('/login', userController.login);

module.exports = router;