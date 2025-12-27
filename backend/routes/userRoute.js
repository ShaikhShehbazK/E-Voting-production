//External Module
const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const { jwtAuthMiddleware } = require('../jwt');

userRouter.get('/profile', jwtAuthMiddleware, userController.getProfile);

userRouter.post('/profile/password', jwtAuthMiddleware, userController.postPassword);

module.exports = userRouter;
