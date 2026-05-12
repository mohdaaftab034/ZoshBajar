import { useEffect, useState } from "react";
import FilteredSection from "./FilteredSection";
import {
  Box,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ProductCard from "./ProductCard";
import { useSearchParams, useParams } from "react-router-dom"; // Note: react-router-dom
import { useAppDispatch, useAppSelectore } from "../../../Redux Toolkit/store";
import { getAllProducts } from "../../../Redux Toolkit/features/customer/productSlice";
import { FilterList } from "@mui/icons-material";

const Products = () => {
  // --- States ---
  const [sort, setSort] = useState("price_low");
  const [page, setPage] = useState(1); // Pagination State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // --- Hooks ---
  const [searchParams] = useSearchParams();
  const { categoryId: categoryParam } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelectore((store) => store.product);

  // --- Responsive Logic ---
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

  // --- 1. Get Filters from URL ---
  // URL se color, size, price range nikalna zaroori hai
  // Prefer query param, but also support route param (/products/:categoryId)
  const categoryId = searchParams.get("category") || categoryParam || "";
  const color = searchParams.get("color");
  const size = searchParams.get("size");
  const price = searchParams.get("price"); // e.g., "500-1000"
  const discount = searchParams.get("discount");
  const stock = searchParams.get("stock");

  // --- 2. Handlers ---
  const handleSortChange = (e: any) => {
    setSort(e.target.value);
    // Sort change hone par products wapas fetch honge useEffect ke through
  };

  const handlePaginationChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    // Page change hone par products wapas fetch honge useEffect ke through
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMobileFilterToggle = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  // --- 3. Main Effect (Fetch Data) ---
  // Jab bhi Category, URL Params, Sort ya Page change ho, API call karo
  useEffect(() => {
    const [minPrice, maxPrice] =
      price === null ? [0, 100000] : price.split("-").map(Number);

    const data = {
      category: categoryId,
      color: color || [],
      size: size || [],
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 100000,
      minDiscount: discount || 0,
      sort: sort,
      pageNumber: page - 1, // Send current page to backend
      pageSize: 10,
      stock: stock,
    };

    dispatch(getAllProducts(data));
  }, [categoryId, color, size, price, discount, stock, sort, page, dispatch]);

  useEffect(() => {
    setPage(1);
  }, [categoryId, color, size, price, discount, stock]);

  return (
    <div className="-z-10 mt-10 min-h-screen">
      {/* Main Layout */}
      <div className="lg:flex px-4 lg:px-10 relative">
        {/* Desktop Sidebar */}
        <section className="hidden lg:block w-[22%] min-h-screen pr-5 sticky top-20 h-fit">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <FilteredSection />
          </div>
        </section>

        {/* Product Grid Area */}
        <section className="w-full lg:w-[78%] space-y-5">
          {/* Controls Bar */}
          <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100 sticky top-[70px] z-20">
            {/* Mobile Filter Trigger */}
            <div className="lg:hidden">
              <IconButton onClick={handleMobileFilterToggle}>
                <FilterList />
              </IconButton>
              <span className="font-semibold text-gray-600 ml-2">Filters</span>
            </div>

            <div className="hidden lg:block font-medium text-gray-500">
              {product?.products?.length || 0} Products Found
            </div>

            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel id="sort-label">Sort By</InputLabel>
              <Select
                labelId="sort-label"
                id="sort"
                value={sort}
                label="Sort By"
                onChange={handleSortChange}
                sx={{ borderRadius: "8px" }}
              >
                <MenuItem value={"price_low"}>Price: Low - High</MenuItem>
                <MenuItem value={"price_high"}>Price: High - Low</MenuItem>
                <MenuItem value={"newest"}>Newest First</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {product?.products?.length > 0 ? (
              product?.products?.map((item: any, index: number) => (
                <div key={item._id || index} className="w-full">
                  <ProductCard item={item} />
                </div>
              ))
            ) : (
              // Empty State
              <div className="col-span-full text-center py-20 text-gray-500">
                No products found matching these filters.
              </div>
            )}
          </div>

          {/* Pagination (FIXED) */}
          <div className="flex mt-12 mb-10 flex-col items-center justify-center">
            <Pagination
              count={product.totalPages}
              page={page} // Controlled component
              onChange={handlePaginationChange} // Event handler added
              color="primary"
              size={isLarge ? "large" : "medium"}
              shape="rounded"
            />
          </div>
        </section>
      </div>

      {/* Mobile Filter Drawer (Same as before) */}
      <Drawer
        anchor="bottom"
        open={isMobileFilterOpen}
        onClose={handleMobileFilterToggle}
        PaperProps={{
          sx: {
            height: "80vh",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
      >
        <Box className="p-5 h-full overflow-y-auto relative">
          <div className="flex justify-between items-center mb-4 border-b pb-2 sticky top-0 bg-white z-10">
            <h2 className="text-xl font-bold">Filters</h2>
            <button
              onClick={handleMobileFilterToggle}
              className="text-gray-500 font-bold"
            >
              Close
            </button>
          </div>
          <FilteredSection />
          <div className="sticky bottom-0 bg-white pt-4 pb-2 border-t mt-4">
            <button
              onClick={handleMobileFilterToggle}
              className="w-full bg-[#00927C] text-white py-3 rounded-lg font-bold"
            >
              Apply Filters
            </button>
          </div>
        </Box>
      </Drawer>
    </div>
  );
};

export default Products;

