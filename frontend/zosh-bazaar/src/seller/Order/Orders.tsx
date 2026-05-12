import OrderTable from "./OrderTable";
import { ShoppingBag } from "@mui/icons-material";

const Orders = () => {
  return (
    // Container: p-0 on mobile (small), p-5 on tablet, p-10 on desktop (large)
    <div className="p-0 sm:p-5 lg:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        {/* Padding added here on mobile so the text isn't stuck to the edge */}
        <div className="flex items-center gap-4 mb-6 p-4 sm:p-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#00927C] rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-200">
            <ShoppingBag fontSize="small" className="sm:text-2xl" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Order Management
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm">
              View and manage all your store orders
            </p>
          </div>
        </div>

        {/* Table Card Container */}
        {/* - bg-white: White background always
            - shadow-none sm:shadow-sm: No shadow on mobile, shadow on larger screens
            - border-y sm:border: Only top/bottom border on mobile, full border on larger
            - rounded-none sm:rounded-2xl: Square edges on mobile (full width), rounded on larger
        */}
        <div className="bg-white shadow-none sm:shadow-sm rounded-none sm:rounded-2xl border-y sm:border border-gray-200 overflow-hidden">
          <OrderTable />
        </div>
      </div>
    </div>
  );
};

export default Orders;
