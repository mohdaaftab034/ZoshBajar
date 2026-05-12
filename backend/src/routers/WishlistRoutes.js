const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getWishlist, addProductToWishlist, removeProductFromWishlist } = require('../controller/wishlistController');

const router = express.Router();

router.get('/', authMiddleware, getWishlist);
router.post('/add', authMiddleware, addProductToWishlist);
router.put('/remove/:productId', authMiddleware, removeProductFromWishlist);

module.exports = router;
