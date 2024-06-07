// routes/carts.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Define the routes related to cart
router.post('/place', cartController.placeItemInCart);
router.post('/remove', cartController.removeItemInCart);
router.get('/get', cartController.getAllItemsForUser);
router.delete('/delete', cartController.deleteAllItemsForUser);


module.exports = router;
