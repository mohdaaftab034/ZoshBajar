import { useEffect } from "react";
import ProductTable from "./ProductTable";
import { useAppDispatch } from "../../Redux Toolkit/store";
import { fetchSellerProduct } from "../../Redux Toolkit/features/seller/sellerProductSlice";
import { Inventory } from "@mui/icons-material";

const Products = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) dispatch(fetchSellerProduct(jwt));
  }, [dispatch]);

  return (
    // Responsive Container:
    // - Mobile: p-0 (Full width)
    // - Tablet/Desktop: p-5/p-10 (Card style)
    <div className="p-0 sm:p-5 lg:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-6 p-4 sm:p-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#00927C] rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-200">
            <Inventory fontSize="small" className="sm:text-2xl" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Product Inventory
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm">
              Manage your product catalog and stock
            </p>
          </div>
        </div>

        {/* Table Card Wrapper */}
        <div className="bg-white shadow-none sm:shadow-sm rounded-none sm:rounded-2xl border-y sm:border border-gray-200 overflow-hidden">
          <ProductTable />
        </div>
      </div>
    </div>
  );
};

export default Products;

