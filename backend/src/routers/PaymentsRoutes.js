const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const paymentController = require("../controller/paymentController.js");

const router = express.Router();

// Define route for payment success
router.get('/:paymentId', authMiddleware, paymentController.paymentSuccessHandler);

module.exports = router;
