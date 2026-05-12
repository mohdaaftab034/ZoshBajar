const express = require('express');
const productController = require('../controller/productController');


const router = express.Router();

// Search for products by query
router.get('/search', productController.searchProduct);

// Get all products with filters
router.get('/', productController.getAllProducts);

//Get product by Id
router.get('/:productId', productController.getProductById);


module.exports = router;
