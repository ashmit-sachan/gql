// routes/products.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define the routes related to users
router.get('/all', productController.fetchAllProducts);


module.exports = router;
