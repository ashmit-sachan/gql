// routes/reviews.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/create', reviewController.createReview);
router.delete('/delete/:id', reviewController.deleteReview);
router.patch('/edit/:id', reviewController.editReview);

module.exports = router;