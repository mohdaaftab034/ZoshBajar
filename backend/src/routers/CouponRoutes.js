const express = require('express');
const couponController = require('../controller/couponController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Admin routes
router.post('/admin/create', authMiddleware, couponController.createCoupon);
router.get('/admin/all', authMiddleware, couponController.getAllCoupons);
router.delete('/admin/delete/:id', authMiddleware, couponController.deleteCoupon);

// Customer routes
router.post('/apply', authMiddleware, couponController.applyCoupon);

module.exports = router;

