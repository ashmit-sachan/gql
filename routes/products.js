// routes/products.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define the routes related to users
router.get('/all', productController.fetchAllProducts);
router.get('/reviews/:productId', productController.fetchProductReviews);


module.exports = router;

// (req, res) => {
//     const { productId } = req.params;

//     res.send('This route will return all reviews for a product '+ productId);