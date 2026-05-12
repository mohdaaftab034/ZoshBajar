const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const cartController = require("../controller/cartController");

const router = express.Router();

router.get("/", authMiddleware, cartController.findUserCartHandler);

router.put("/add", authMiddleware, cartController.addItemToCart);

router.delete("/item/:cartItemId", authMiddleware, cartController.deleteCartItemsHandler);

router.put("/item/:cartItemId", authMiddleware, cartController.updateCartItemHandler);


module.exports = router;
