const Coupon = require("../model/Coupon");
const Cart = require("../model/Cart");

class CouponController {
    // Create Coupon (Admin)
    async createCoupon(req, res) {
        try {
            const { code, discountPercentage, validityStartDate, validityEndDate, minimumOrderValue } = req.body;

            // Check if coupon code already exists
            const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
            if (existingCoupon) {
                return res.status(400).json({ error: "Coupon code already exists" });
            }

            const coupon = new Coupon({
                code: code.toUpperCase(),
                discountPercentage,
                validityStartDate,
                validityEndDate,
                minimumOrderValue: minimumOrderValue || 0
            });

            await coupon.save();
            return res.status(201).json(coupon);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Get All Coupons (Admin)
    async getAllCoupons(req, res) {
        try {
            const coupons = await Coupon.find().sort({ createdAt: -1 });
            return res.status(200).json(coupons);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Delete Coupon (Admin)
    async deleteCoupon(req, res) {
        try {
            const { id } = req.params;
            const coupon = await Coupon.findByIdAndDelete(id);
            
            if (!coupon) {
                return res.status(404).json({ error: "Coupon not found" });
            }

            return res.status(200).json({ message: "Coupon deleted successfully" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Apply Coupon (Customer)
    async applyCoupon(req, res) {
        try {
            const { apply, code, orderValue } = req.body;
            const user = req.user;

            if (!code || !orderValue) {
                return res.status(400).json({ error: "Coupon code and order value are required" });
            }

            // Find coupon
            const coupon = await Coupon.findOne({ code: code.toUpperCase(), active: true });
            
            if (!coupon) {
                return res.status(404).json({ error: "Invalid coupon code" });
            }

            // Check validity dates
            const currentDate = new Date();
            if (currentDate < coupon.validityStartDate || currentDate > coupon.validityEndDate) {
                return res.status(400).json({ error: "Coupon has expired or not yet valid" });
            }

            // Check minimum order value
            if (parseFloat(orderValue) < coupon.minimumOrderValue) {
                return res.status(400).json({ 
                    error: `Minimum order value of ₹${coupon.minimumOrderValue} required` 
                });
            }

            // Calculate discount
            const discountAmount = (parseFloat(orderValue) * coupon.discountPercentage) / 100;
            const totalDiscountedPrice = parseFloat(orderValue) - discountAmount;

            // Get user's cart
            const cart = await Cart.findOne({ user: user._id }).populate({
                path: "cartItems",
                populate: { path: "product" },
            });

            if (!cart) {
                return res.status(404).json({ error: "Cart not found" });
            }

            return res.status(200).json({
                ...cart.toObject(),
                couponCode: coupon.code,
                couponDiscount: discountAmount,
                totalDiscountedPrice: totalDiscountedPrice,
                message: `Coupon applied! You saved ₹${discountAmount.toFixed(2)}`
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CouponController();

