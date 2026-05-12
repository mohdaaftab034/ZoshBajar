const express = require('express');
const sellerMiddleware = require('../middlewares/sellerAuthMiddleware');
const sellerReportController = require('../controller/sellerReportController');

const router = express.Router();

router.get('/', sellerMiddleware, sellerReportController.getSellerReport);

module.exports = router;
