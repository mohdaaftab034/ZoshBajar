import { Divider } from "@mui/material";
import { useAppDispatch, useAppSelectore } from "../../../Redux Toolkit/store";
import {
  sumCartItemSellingPrice,
  sumCartItemsMrpPrice,
} from "../../../utils/sumCartsItemsPrice";
import { useEffect } from "react";
import { fetchCart } from "../../../Redux Toolkit/features/customer/cartSlice";

const PricingCard = () => {
  const cart = (useAppSelectore((store) => store.cart)) as any;
  const coupon = (useAppSelectore((store) => store.coupon)) as any;
  const items = cart.cart?.cartItems || [];
  const dispatch = useAppDispatch();

  const subtotal = sumCartItemsMrpPrice(items);
  const sellingTotal = sumCartItemSellingPrice(items);
  const discount = subtotal - sellingTotal;
  const shipping = 79;
  
  // Get coupon discount from coupon state
  const couponDiscount = coupon.cart?.totalDiscountedPrice 
    ? sellingTotal - coupon.cart.totalDiscountedPrice 
    : 0;
  
  const total = sellingTotal - couponDiscount + (sellingTotal > 0 ? 0 : shipping);
  const totalSavings = discount + shipping + couponDiscount;

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) dispatch(fetchCart(jwt));
  }, [dispatch]);

  return (
    <>
      {cart?.cart && (
        <div>
          <div className="p-5 pb-2">
            <h3 className="font-bold text-gray-800 text-lg mb-4">
              Price Details
            </h3>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between items-center">
                <span>Price ({items.length} items)</span>
                <span className="font-medium text-gray-900">₹{subtotal}</span>
              </div>

              <div className="flex justify-between items-center">
                <span>Discount</span>
                <span className="font-medium text-[#00927C]">
                  - ₹{discount}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>Delivery Charges</span>
                <span className="font-medium text-[#00927C]">
                  <span className="line-through text-gray-400 mr-1">
                    ₹{shipping}
                  </span>
                  Free
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>Platform Fee</span>
                <span className="font-medium text-[#00927C]">Free</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-green-600">Coupon Discount</span>
                  <span className="font-medium text-green-600">
                    - ₹{couponDiscount}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="px-5 pb-4">
            <Divider sx={{ borderStyle: "dashed", my: 2 }} />
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-gray-900">
                Total Amount
              </span>
              <span className="font-bold text-xl text-gray-900">
                ₹{total}
              </span>
            </div>
            <p className="text-xs text-[#00927C] font-medium mt-1">
              You will save ₹{totalSavings} on this order
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default PricingCard;

