const express = require('express');
const orderController = require('../controller/orderController');
const sellerMiddleware = require('../middlewares/sellerAuthMiddleware');

const router = express.Router();

router.get('/', sellerMiddleware, orderController.getSellerOrders);

// Update Order Status
router.patch('/:orderId/status/:orderStatus', sellerMiddleware, orderController.updateOrderStatus);


module.exports = router;
