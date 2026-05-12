const express = require('express');
const sellerMiddleware = require('../middlewares/sellerAuthMiddleware');
const productController = require('../controller/productController');

const router = express.Router();

router.get(
    "/",
    sellerMiddleware,
    productController.getProductBySellerId
);

router.post(
    "/",
    sellerMiddleware,
    productController.createProduct
)

router.delete(
    "/:productId",
    sellerMiddleware,
    productController.deleteProduct
)


// Update Product
router.patch(
    "/:productId",
    sellerMiddleware,
    productController.updateProduct
)

module.exports = router;
