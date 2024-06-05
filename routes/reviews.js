// routes/users.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Define the routes related to users
router.post('/sign-up', reviewController.signUp);


module.exports = router;
