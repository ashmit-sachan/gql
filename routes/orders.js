// routes/orders.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Define the routes related to users
router.post('/place', orderController.placeOrder);


module.exports = router;
