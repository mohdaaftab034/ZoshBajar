const Product = require("../model/Product");
const Wishlist = require("../model/Wishlist");

// backend/src/controller/wishlistController.js

const addProductToWishlist = async (req, res) => {
    try {
        const user = await req.user; // Removed 'await', req.user is usually an object
        const { productId, size } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let wishlist = await Wishlist.findOne({ user: user._id });

        if (!wishlist) {
            wishlist = new Wishlist({ user: user._id, wishlistItems: [] });
        }

        const exists = wishlist.wishlistItems.find(
            (item) => item.product.toString() === productId
        );

        if (exists) {
            //  FIX: Instead of 400 Error, just return the existing wishlist with a message
            // OR you can implement Toggle logic here (remove if exists)
            return res.status(200).json(wishlist);
        }

        wishlist.wishlistItems.push({
            product: productId,
            size: size || null, // Default size if not provided
        });

        await wishlist.save();

        const updatedWishlist = await Wishlist.findOne({ user: user._id })
            .populate("wishlistItems.product");

        return res.status(200).json(updatedWishlist);
    } catch (error) {
        return res.status(500).json({
            message: "Adding to wishlist failed",
            error: error.message,
        });
    }
};

const getWishlist = async (req, res) => {
    try {
        const user = await req.user;

        const wishlist = await Wishlist.findOne({ user: user._id })
            .populate("wishlistItems.product");

        if (!wishlist) {
            return res.status(200).json({ wishlistItems: [] });
        }

        return res.status(200).json(wishlist);
    } catch (error) {
        return res.status(500).json({
            message: "Fetching wishlist failed",
            error: error.message,
        });
    }
};

const removeProductFromWishlist = async (req, res) => {
    try {
        const user = await req.user;
        const { productId } = req.params;

        const wishlist = await Wishlist.findOne({ user: user._id });
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        wishlist.wishlistItems = wishlist.wishlistItems.filter(
            (item) => item.product.toString() !== productId
        );

        await wishlist.save();

        const updatedWishlist = await Wishlist.findOne({ user: user._id })
            .populate("wishlistItems.product");

        return res.status(200).json(updatedWishlist);
    } catch (error) {
        return res.status(500).json({
            message: "Removing from wishlist failed",
            error: error.message,
        });
    }
};

module.exports = {
    addProductToWishlist,
    getWishlist,
    removeProductFromWishlist,
};

