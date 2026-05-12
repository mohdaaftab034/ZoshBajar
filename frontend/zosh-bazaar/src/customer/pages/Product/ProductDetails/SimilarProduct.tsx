import ProductCard from "../ProductCard";
import { CircularProgress, Box } from "@mui/material";

interface SimilarProductProps {
  products: any[];
  loading?: boolean;
}

const SimilarProduct = ({ products = [], loading = false }: SimilarProductProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={50} sx={{ color: "#00927C" }} />
          <p className="mt-4 text-gray-600">Loading related products...</p>
        </Box>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] bg-gray-50 rounded-lg p-10 text-center">
        <p className="text-gray-500 text-lg">No related products found</p>
        <p className="text-gray-400 text-sm mt-2">Check back later for similar items</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {products.slice(0, 10).map((item, index) => (
        <div
          key={`${item._id}-${index}`}
          className="transform transition duration-300 hover:-translate-y-1"
        >
          <ProductCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default SimilarProduct;

