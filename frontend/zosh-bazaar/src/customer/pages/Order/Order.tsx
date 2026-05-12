import { useEffect, useState } from "react";
import OrderItemCard from "./OrderItemCard";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelectore } from "../../../Redux Toolkit/store";
import { fetchUserOrderHistory } from "../../../Redux Toolkit/features/customer/orderSlice";
import {
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { ArrowBack, FilterList, ShoppingBag } from "@mui/icons-material";

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { orders: ordersData, loading } = useAppSelectore((store) => store.order); // Assuming loading state exists
  const [filter, setFilter] = useState("all");

  // Type cast orders to avoid 'never' type
  const orders = ordersData as any[];

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) dispatch(fetchUserOrderHistory(jwt));
  }, [dispatch]);

  // Flatten orders to count total items easily
  const totalItems =
    orders?.reduce((acc, order: any) => acc + (order.orderItems?.length || 0), 0) ||
    0;

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20 px-4 sm:px-6 lg:px-20">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Title & Breadcrumb */}
          <div>
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-1 text-gray-500 hover:text-[#00927C] cursor-pointer text-sm mb-2 transition-colors"
            >
              <ArrowBack fontSize="small" />
              <span>Back to Home</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              My Orders
              <span className="text-sm font-normal text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                {totalItems} Items
              </span>
            </h1>
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center gap-2">
            <FilterList className="text-gray-400" />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                displayEmpty
                sx={{ bgcolor: "white", borderRadius: 2 }}
              >
                <MenuItem value="all">All Orders</MenuItem>
                <MenuItem value="delivered">Delivered</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
                <MenuItem value="returned">Returned</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto space-y-6">
        {loading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <CircularProgress sx={{ color: "#00927C" }} />
          </div>
        ) : orders && orders.length > 0 ? (
          orders.map((order: any) =>
            order?.orderItems?.map((orderItem: any) => (
              <OrderItemCard
                key={orderItem._id}
                order={order}
                orderItem={orderItem}
              />
            ))
          )
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center h-[50vh] bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag sx={{ fontSize: 40, color: "#ccc" }} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              No Orders Yet
            </h2>
            <p className="text-gray-500 mb-6 max-w-sm">
              Looks like you haven't placed any orders yet. Start shopping to
              fill your wardrobe!
            </p>
            <Button
              variant="contained"
              onClick={() => navigate("/")}
              sx={{
                bgcolor: "#00927C",
                textTransform: "none",
                px: 4,
                py: 1.5,
                borderRadius: 2,
              }}
            >
              Start Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;

