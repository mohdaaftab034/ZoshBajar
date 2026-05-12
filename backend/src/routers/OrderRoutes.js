const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const orderController = require('../controller/orderController');

const router = express.Router();


// Create A new Order
router.post('/', authMiddleware, orderController.createOrder);

// Get user's order history
router.get('/user', authMiddleware, orderController.getUserOrderHistory);

//Cancel an Order
router.put('/:orderId/cancel', authMiddleware, orderController.cancelOrder);

// Get order by ID
router.get('/:orderId', authMiddleware, orderController.getOrderById);

router.get('/item/:orderItemId', authMiddleware, orderController.getOrderItemById);



module.exports = router;
