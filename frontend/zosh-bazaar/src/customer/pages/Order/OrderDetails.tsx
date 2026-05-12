import { Button, Divider, IconButton } from "@mui/material";
import { useEffect } from "react";
import OrderStepper from "./OrderStepper";
import {
  ArrowBack,
  Cancel,
  LocalShipping,
  LocationOn,
  Payment,
  Receipt,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelectore } from "../../../Redux Toolkit/store";
import {
  fetchOrderById,
  fetchOrderItemById,
} from "../../../Redux Toolkit/features/customer/orderSlice";
import { useParams, useNavigate } from "react-router";

const OrderDetails = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { orderItemId, orderId } = useParams();
  const { orderItem: orderItemData, currentOrder } = useAppSelectore((store) => store.order);

  // Type cast both to 'any' to avoid 'never' type inference
  const order = currentOrder as any;
  const orderItem = orderItemData as any;
  const mrp = Number(orderItem?.mrpPrice) || 0;
  const selling = Number(order?.totalSellingPrice) || 0;
  const saved = mrp - selling > 0 ? mrp - selling : 0;

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(fetchOrderItemById({ jwt, orderItemId }));
      dispatch(fetchOrderById({ jwt, orderId }));
    }
  }, [orderItemId, orderId, dispatch]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with Back Button */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <IconButton onClick={() => navigate(-1)} size="small">
          <ArrowBack />
        </IconButton>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Order Details</h1>
          <p className="text-xs text-gray-500">
            Order ID: #{order?._id?.slice(-8).toUpperCase()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Product & Tracker */}
        <div className="md:col-span-2 space-y-6">
          {/* Product Info Card */}
          <div className="flex flex-col sm:flex-row gap-6 p-4 rounded-xl border border-gray-200 hover:shadow-sm transition-shadow">
            <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
              <img
                className="w-full h-full object-cover"
                src={orderItem?.product?.images[0]}
                alt={orderItem?.product?.title}
              />
            </div>
            <div className="space-y-2 flex-grow">
              <h2 className="font-bold text-lg text-gray-800 leading-tight">
                {orderItem?.product?.title}
              </h2>
              <div className="flex gap-3 text-sm text-gray-500">
                <p>
                  Seller:{" "}
                  <span className="font-medium text-gray-700">Zosh Bazaar</span>
                </p>
                <p>
                  Size: <span className="font-medium text-gray-700">M</span>
                </p>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-lg font-bold text-[#00927C]">
                  ₹{selling}
                </span>
                {saved > 0 && (
                  <span className="text-sm text-gray-400 line-through">
                    ₹{mrp}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Order Tracker */}
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <LocalShipping className="text-[#00927C]" /> Delivery Status
            </h3>
            <OrderStepper orderStatus={order?.orderStatus} />
          </div>

          {/* Cancel Button */}
          {order?.orderStatus !== "DELIVERED" &&
            order?.orderStatus !== "CANCELLED" && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<Cancel />}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Cancel Item
              </Button>
            )}
        </div>

        {/* Right Column: Address & Payment */}
        <div className="space-y-6">
          {/* Address Card */}
          <div className="border border-gray-200 rounded-xl p-5 bg-gray-50/50">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <LocationOn className="text-[#00927C] text-sm" /> Delivery Address
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-bold text-gray-800 text-base">
                {order?.user?.fullName || "User Name"}
              </p>
              <p>{order?.shippingAddress?.address}</p>
              <p>
                {order?.shippingAddress?.locality},{" "}
                {order?.shippingAddress?.city}
              </p>
              <p>
                {order?.shippingAddress?.state} -{" "}
                {order?.shippingAddress?.pincode}
              </p>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-5 bg-white space-y-3">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Receipt className="text-[#00927C] text-sm" /> Payment Summary
              </h3>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Item Price</span>
                <span className="font-medium">₹{selling}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Discount</span>
                <span className="text-green-600 font-medium">- ₹{saved}</span>
              </div>
              <Divider sx={{ borderStyle: "dashed", my: 1 }} />
              <div className="flex justify-between font-bold text-base">
                <span>Total Paid</span>
                <span>₹{selling}</span>
              </div>
            </div>
            <div className="bg-[#00927C]/10 px-5 py-3 flex items-center gap-2 text-[#00927C] text-sm font-bold border-t border-[#00927C]/20">
              <Payment fontSize="small" />
              {order?.paymentDetails?.paymentMethod || "Pay on Delivery"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

