const express = require('express');
const sellerController = require('../controller/sellerController');
const sellerMiddleware = require('../middlewares/sellerAuthMiddleware');


const router = express.Router();


router.get("/profile", sellerMiddleware, sellerController.getSellerProfile);
router.post("/", sellerController.createSeller);
router.get("/", sellerController.getAllSellers);
router.patch("/", sellerMiddleware, sellerController.updateSeller);
router.post("/login", sellerController.signinSeller);



module.exports = router;
