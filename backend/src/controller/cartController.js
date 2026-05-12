const CartItemService = require("../service/CartItemService");
const CartService = require("../service/CartService");
const { ProductService } = require("../service/ProductService");

class CartController {
  async findUserCartHandler(req, res) {
    try {
      const user = await req.user;

      const cart = await CartService.findUserCart(user);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Add Item to Cart
  async addItemToCart(req, res) {
    try {
      const user = await req.user;
      const product = await ProductService.findProductById(req.body.productId);

      const cartItem = await CartService.addCartItems(
        user,
        product,
        req.body.size,
        req.body.quantity
      );

      res.status(202).json(cartItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteCartItemsHandler(req, res) {
    try {
        const user = await req.user;
        await CartItemService.removeCartItem(
            user._id, 
            req.params.cartItemId
        );

        res.status(202).json({message: "Item removed from cart"});

    } catch (error) {
        res.status(500).json({error: error.message});
    }
  }

  // Update Cart items
  async updateCartItemHandler(req, res){
    try {
        const cartItemId = req.params.cartItemId;
        const {quantity} = req.body;

        const user = await req.user;

        let updatedCartItem;

        if(quantity > 0){
            updatedCartItem = await CartItemService.updateCartItem(
                user._id,
                cartItemId,
                {quantity}
            );
        }
        res.status(202).json(updatedCartItem);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
  }
}


module.exports = new CartController();
