import React, { useEffect } from "react";
import { Favorite, ShoppingBag } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WishlistItemCard from "./WishlistItemCard";
import Navbar from "../../../Navbar/Navbar";
import Footer from "../../../Footer/Footer";

// import { fetchWishlistItems, removeItemFromWishlist } from "../../../../Redux Toolkit/wishlist/wishlistSlice";
import {
  useAppDispatch,
  useAppSelectore,
} from "../../../../Redux Toolkit/store";
import {
  fetchWishlistItems,
  removeItemFromWishlist,
} from "../../../../Redux Toolkit/wishlist/wishlistSlice";

const Wishlist: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get data from Redux Store
  const wishlistData = useAppSelectore((store) => store.wishlist);
  const { loading, wishlist } = wishlistData;

  // Fetch wishlist on mount
  useEffect(() => {
    dispatch(fetchWishlistItems());
  }, [dispatch]);

  const handleRemoveItem = (productId: string) => {
    dispatch(removeItemFromWishlist(productId));
  };

  // Safely access items array
  const items = wishlist?.wishlistItems || [];

  return (
    <>
      <Navbar />

      <div className="pt-10 px-5 sm:px-10 md:px-20 lg:px-32 min-h-screen bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            My Wishlist
            <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {items.length} Items
            </span>
          </h1>
        </div>

        {/* Loading State */}
        {loading && items.length === 0 ? (
          <div className="flex justify-center items-center h-[50vh]">
            <CircularProgress sx={{ color: "#00927C" }} />
          </div>
        ) : items.length > 0 ? (
          // Grid Layout for Wishlist Items
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
            {items.map((item: any) => (
              <WishlistItemCard
                // Use item._id if it's the specific item ID,
                // but for removing we usually need the PRODUCT ID.
                // Adjust based on your backend response structure.
                key={item._id}
                item={item}
                // Important: Pass the PRODUCT ID to remove, not the Wishlist Item ID
                onRemove={() => handleRemoveItem(item.product._id)}
              />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-4 text-center">
            <div className="p-6 bg-gray-50 rounded-full">
              <Favorite sx={{ fontSize: 60, color: "#e0e0e0" }} />
            </div>
            <h2 className="text-xl font-semibold text-gray-700">
              Your Wishlist is Empty
            </h2>
            <p className="text-gray-500 max-w-sm">
              Save items that you like in your wishlist. Review them anytime and
              easily move them to the bag.
            </p>
            <Button
              onClick={() => navigate("/")}
              variant="contained"
              size="large"
              startIcon={<ShoppingBag />}
              sx={{
                mt: 2,
                bgcolor: "#00927C",
                "&:hover": { bgcolor: "#007a68" },
              }}
            >
              Start Shopping
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Wishlist;

