import React from "react";
import {
  AccountBalanceWallet,
  ArrowForward,
  Inventory,
  LocalShipping,
  MoreVert,
  ShoppingBag,
  TrendingDown,
  TrendingUp,
} from "@mui/icons-material";
import { IconButton, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router";

// --- Mock Data ---
const recentOrders = [
  {
    id: "#ORD-001",
    product: "Men's Slim Shirt",
    customer: "Mohd Aaftab",
    price: "₹1,299",
    status: "Pending",
  },
  {
    id: "#ORD-002",
    product: "Leather Wallet",
    customer: "Pablo Pandy",
    price: "₹899",
    status: "Shipped",
  },
  {
    id: "#ORD-003",
    product: "Running Shoes",
    customer: "John Doe",
    price: "₹3,499",
    status: "Delivered",
  },
  {
    id: "#ORD-004",
    product: "Smart Watch",
    customer: "Jane Smith",
    price: "₹5,999",
    status: "Processing",
  },
];

const topProducts = [
  {
    name: "Slim Fit Suit",
    sales: 120,
    revenue: "₹2.4L",
    img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=100&q=80",
  },
  {
    name: "Casual Sneakers",
    sales: 98,
    revenue: "₹1.8L",
    img: "https://images.unsplash.com/photo-1560769629-975e13f0c470?auto=format&fit=crop&w=100&q=80",
  },
  {
    name: "Travel Backpack",
    sales: 75,
    revenue: "₹1.2L",
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=100&q=80",
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* --- 1. Welcome Banner --- */}
        <div className="bg-gradient-to-r from-[#00927C] to-[#007563] rounded-2xl p-6 sm:p-10 text-white shadow-lg relative overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-20 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>

          <div className="relative z-10">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Welcome Back, Seller! 👋
            </h1>
            <p className="text-teal-50 max-w-xl text-sm sm:text-base opacity-90">
              Here's what's happening with your store today. You have{" "}
              <span className="font-bold text-white">4 new orders</span> pending
              processing.
            </p>
            <div className="mt-6 flex gap-3">
              <Button
                variant="contained"
                onClick={() => navigate("/seller/add-products")}
                sx={{
                  bgcolor: "white",
                  color: "#00927C",
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": { bgcolor: "#f0fdfa" },
                }}
              >
                Add New Product
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/seller/orders")}
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.4)",
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                View Orders
              </Button>
            </div>
          </div>
        </div>

        {/* --- 2. Stats Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Total Revenue"
            value="₹45,231"
            icon={<AccountBalanceWallet />}
            color="text-[#00927C]"
            bgColor="bg-teal-50"
            trend="+12.5%"
          />
          <StatCard
            title="Total Orders"
            value="1,203"
            icon={<ShoppingBag />}
            color="text-blue-600"
            bgColor="bg-blue-50"
            trend="+4.3%"
          />
          <StatCard
            title="Active Products"
            value="560"
            icon={<Inventory />}
            color="text-purple-600"
            bgColor="bg-purple-50"
            trend="+8 New"
          />
          <StatCard
            title="Pending Returns"
            value="12"
            icon={<LocalShipping />}
            color="text-orange-600"
            bgColor="bg-orange-50"
            trend="-2.1%"
            isNegative
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- 3. Recent Orders (Takes 2/3 width) --- */}
          <Paper
            elevation={0}
            className="lg:col-span-2 rounded-2xl border border-gray-200 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
              <h2 className="font-bold text-lg text-gray-800">Recent Orders</h2>
              <Button
                size="small"
                endIcon={<ArrowForward />}
                sx={{ textTransform: "none", color: "#00927C" }}
              >
                View All
              </Button>
            </div>
            <div className="bg-white">
              {recentOrders.map((order, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs">
                      {order.customer.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        {order.product}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.customer} • {order.id}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-gray-800">
                      {order.price}
                    </p>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Paper>

          {/* --- 4. Top Selling Products (Takes 1/3 width) --- */}
          <Paper
            elevation={0}
            className="rounded-2xl border border-gray-200 overflow-hidden bg-white"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-lg text-gray-800">Top Selling</h2>
              <IconButton size="small">
                <MoreVert fontSize="small" />
              </IconButton>
            </div>
            <div>
              {topProducts.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500">{item.sales} Sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-[#00927C]">
                      {item.revenue}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4">
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  color: "#555",
                  borderColor: "#e5e7eb",
                  textTransform: "none",
                }}
              >
                View Performance
              </Button>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
};

// --- Stat Card Component ---
const StatCard = ({
  title,
  value,
  icon,
  color,
  bgColor,
  trend,
  isNegative,
}: any) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${bgColor} ${color}`}
        >
          {React.cloneElement(icon, { fontSize: "small" })}
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
            isNegative ? "bg-red-50 text-red-500" : "bg-green-50 text-green-600"
          }`}
        >
          {isNegative ? (
            <TrendingDown sx={{ fontSize: 14 }} />
          ) : (
            <TrendingUp sx={{ fontSize: 14 }} />
          )}
          {trend}
        </div>
      </div>
      <div>
        <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
      </div>
    </div>
  );
};

export default HomePage;

