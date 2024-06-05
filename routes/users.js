// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define the routes related to users
router.post('/sign-up', userController.signUp);


module.exports = router;
