const Cart = require("../model/Cart");
const CartItem = require("../model/CartItem");
const { calculateDiscountPercent } = require("./ProductService");

class CartService {
  async findUserCart(user) {
    let cart = await Cart.findOne({ user: user._id });

    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = cart.cartItems.length;

    cart.cartItems.forEach((cartItem) => {
      totalPrice += cartItem.mrpPrice;
      totalDiscountedPrice += cartItem.sellingPrice;
    });

    cart.totalMrpPrice = totalPrice;
    cart.totalSellingPrice = totalDiscountedPrice;
    cart.totalItem = totalItem;
    cart.discount = calculateDiscountPercent(totalPrice, totalDiscountedPrice);

    let cartItem = await CartItem.find({ cart: cart._id }).populate("product");

    cart.cartItems = cartItem;

    return cart;
  }

  async addCartItems(user, product, size, quantity) {
    const cart = await this.findUserCart(user);

    let isPresent = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      size: size,
    }).populate("product");

    if (!isPresent) {
      const cartItem = new CartItem({
        product,
        quantity,
        userId: user._id,
        sellingPrice: quantity * product.sellingPrice,
        mrpPrice: quantity * product.mrpPrice,
        size,
        cart: cart._id,
      });

      return await cartItem.save();
    }

    return isPresent;
  }
}

module.exports = new CartService();

