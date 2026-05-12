const express = require('express');
const sellerController = require('../controller/sellerController');

const router = express.Router();

router.patch("/seller/:id/status/:status", sellerController.updateSellerAccountStatus);



module.exports = router;
