const express = require('express');
const sellerMiddleware = require('../middlewares/sellerAuthMiddleware');
const transactionController = require('../controller/transactionController');

const router = express.Router();

router.get('/seller', sellerMiddleware, transactionController.getTransactionBySeller);


module.exports = router;
