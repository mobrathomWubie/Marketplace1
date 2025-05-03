import express from 'express';
const router = express.Router();
import * as userController from '../controllers/userControllers.js';

router.post('/', userController.createUser); //post to register
router.post('/login', userController.login);

export default router;