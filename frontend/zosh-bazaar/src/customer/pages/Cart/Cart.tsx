import { useEffect, useState } from "react";
import CartItemCard from "./CartItemCard";
import { Favorite, LocalOffer, ShoppingBag } from "@mui/icons-material";
import { Button, TextField, CircularProgress } from "@mui/material";
import PricingCard from "./PricingCard";
import { useAppDispatch, useAppSelectore } from "../../../Redux Toolkit/store";
import { fetchCart } from "../../../Redux Toolkit/features/customer/cartSlice";
import { applyCoupon } from "../../../Redux Toolkit/features/customer/couponSlice";
import { useNavigate } from "react-router";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartData = useAppSelectore((store) => store.cart);
  const cart = cartData as any;
  const coupon = useAppSelectore((store) => store.coupon);
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) dispatch(fetchCart(jwt));
  }, [dispatch]);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      alert("Please enter a coupon code");
      return;
    }
    
    const jwt = localStorage.getItem("jwt");
    const orderValue = cart.cart?.cartItems.reduce((sum: number, item: any) => 
      sum + item.sellingPrice * item.quantity, 0) || 0;
    
    dispatch(applyCoupon({
      apply: "true",
      code: couponCode,
      orderValue,
      jwt
    }));
  };

  return (
    <div className="pt-6 sm:pt-10 px-3 sm:px-6 md:px-10 lg:px-20 xl:px-28 min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="mb-6 sm:mb-8 border-b border-gray-200 pb-3 sm:pb-4 flex items-end gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Shopping Cart</h1>
        <span className="text-gray-500 font-medium mb-1 text-sm sm:text-base">
          ({cart.cart?.cartItems?.length || 0} Items)
        </span>
      </div>

      {/* Loading State */}
      {cart.loading && !cart.cart ? (
        <div className="flex justify-center items-center h-[50vh]">
          <CircularProgress size={60} sx={{ color: "#00927C" }} />
        </div>
      ) : cart.cart?.cartItems?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 relative">
          {/* LEFT: Cart Items List */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-5">
            {cart?.cart?.cartItems?.map((item: any) => (
              <CartItemCard key={item._id} item={item} />
            ))}
          </div>

          {/* RIGHT: Pricing Sidebar (Sticky) */}
          <div className="lg:col-span-1 space-y-3 sm:space-y-5 h-fit sticky top-20">
            {/* Coupon Section */}
            <div className="bg-white rounded-xl shadow-sm p-3 sm:p-5 border border-gray-100">
              <div className="flex gap-2 text-xs sm:text-sm items-center font-semibold text-gray-700 mb-2 sm:mb-3">
                <LocalOffer
                  className="text-[#00927C]"
                  sx={{ fontSize: { xs: "16px", sm: "20px" } }}
                />
                <span>Apply Coupons</span>
              </div>
              <div className="flex gap-1 sm:gap-2">
                <TextField
                  placeholder="Enter code"
                  size="small"
                  fullWidth
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      backgroundColor: "#f9f9f9",
                      fontSize: "0.85rem",
                    },
                  }}
                />
                <Button
                  onClick={handleApplyCoupon}
                  disabled={coupon.loading}
                  variant="outlined"
                  size="small"
                  startIcon={coupon.loading ? <CircularProgress size={16} sx={{ color: "#00927C" }} /> : null}
                  sx={{
                    color: "#00927C",
                    borderColor: "#00927C",
                    borderRadius: "8px",
                    textTransform: "none",
                    fontSize: "0.75rem",
                    padding: "4px 8px",
                    fontWeight: "bold",
                    "&:hover": {
                      borderColor: "#007a68",
                      bgcolor: "#00927C",
                      color: "white",
                    },
                  }}
                >
                  {coupon.loading ? "Applying..." : "Apply"}
                </Button>
              </div>
              {coupon.couponApplied && (
                <p className="text-xs text-green-600 font-medium mt-2">
                  ✓ Coupon applied successfully!
                </p>
              )}
              {coupon.error && (
                <p className="text-xs text-red-600 font-medium mt-2">
                  {coupon.error}
                </p>
              )}
            </div>

            {/* Pricing Details */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <PricingCard />
              <div className="p-5 pt-0">
                <Button
                  onClick={() => navigate("/checkout/address")}
                  sx={{
                    py: 1.5,
                    bgcolor: "#00927C",
                    "&:hover": { bgcolor: "#007a68" },
                    fontSize: "1rem",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 146, 124, 0.2)",
                  }}
                  fullWidth
                  variant="contained"
                >
                  PROCEED TO BUY
                </Button>
              </div>
            </section>

            {/* Wishlist Link */}
            <div
              className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex justify-between items-center cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate("/wishlist")}
            >
              <span className="font-medium text-gray-700">
                Add More from Wishlist
              </span>
              <Favorite className="text-[#ff3e6c]" />
            </div>
          </div>
        </div>
      ) : (
        // Empty State
        <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
          <div className="p-6 bg-white rounded-full shadow-sm">
            <ShoppingBag sx={{ fontSize: 60, color: "#ccc" }} />
          </div>
          <h2 className="text-xl font-semibold text-gray-600">
            Your cart is empty!
          </h2>
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{ bgcolor: "#00927C" }}
          >
            Shop Now
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;

