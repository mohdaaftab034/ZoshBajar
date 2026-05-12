const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createReview, getAllReviews } = require('../controller/reviewController');

const router = express.Router();

router.post('/product/create', authMiddleware, createReview);

router.get('/product/:productId', getAllReviews);

module.exports = router;
