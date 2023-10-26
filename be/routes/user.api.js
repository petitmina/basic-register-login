const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

router.post('/', userController.createUser);
router.post('/login', userController.loginWithEmail);

//토큰을 통해 유저 Id빼내고 => 그 아이디로 유저 객체를 찾아서 보내주기
router.get('/me', authController.authenticate, userController.getUser);

module.exports = router;