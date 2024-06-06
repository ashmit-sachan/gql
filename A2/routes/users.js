// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define the routes related to users
router.post('/sign-up', userController.signUp);
router.post('/sign-in', userController.signIn);
router.post('/user', userController.fetchUserByEmail);
router.patch('/edit', userController.editUser);
router.get('/orders', userController.fetchUserOrders);


module.exports = router;
