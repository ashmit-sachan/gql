// routes/users.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define the routes related to users
router.post('/sign-up', productController.signUp);


module.exports = router;
