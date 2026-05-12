import {
  Add,
  AddShoppingCart,
  FavoriteBorder,
  Favorite,
  LocalShipping,
  Remove,
  Shield,
  Star,
  Wallet,
  WorkspacePremium,
} from "@mui/icons-material";
import { Button, Divider, IconButton, Chip, CircularProgress, Box } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import SimilarProduct from "./SimilarProduct";
import ReviewSection from "./ReviewSection"; // <--- Import the new file
import {
  useAppDispatch,
  useAppSelectore,
} from "../../../../Redux Toolkit/store";
// import { fetchProdcutById } from "../../../../Redux Toolkit/features/customer/productSlice";
import { useParams } from "react-router";
import { addItemToCart } from "../../../../Redux Toolkit/features/customer/cartSlice";
import { addProductToWishlist, removeItemFromWishlist } from "../../../../Redux Toolkit/wishlist/wishlistSlice";
// import { fetchReviewsByProduct } from "../../../../Redux Toolkit/Review/reviewSlice";
import { fetchProductById, getRelatedProducts } from "../../../../Redux Toolkit/features/customer/productSlice";

const ProductDetails = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const product = useAppSelectore((store) => store.product);
  const {reviews} = useAppSelectore(store => store.review);
  const cart = useAppSelectore((store) => store.cart);
  const wishlist = useAppSelectore((store) => store.wishlist);
  const { productId } = useParams();

  const currentProduct = useMemo(() => product.product as any, [product.product]);

  const handleChangeCurrentImage = (index: number) => setCurrentImage(index);

  const handleQuantityChange = (value: number) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

  // Fetch related products when current product category changes
  useEffect(() => {
    if (currentProduct?.category?.categoryId && currentProduct?._id) {
      dispatch(
        getRelatedProducts({
          categoryId: currentProduct.category.categoryId,
          currentProductId: currentProduct._id,
        })
      );
    }
  }, [dispatch, currentProduct?.category?.categoryId, currentProduct?._id]);

  const handleAddItemToCart = () => {
    if (!currentProduct?._id) return;
    const request = {
      quantity: quantity,
      productId: currentProduct._id,
      size: "M",
    };
    dispatch(addItemToCart({ jwt: localStorage.getItem("jwt"), request }));
  };

  const isInWishlist = useMemo(() => {
    if (!wishlist.wishlist?.wishlistItems || !currentProduct?._id) return false;
    return wishlist.wishlist.wishlistItems.some(
      (item: any) => item.product._id === currentProduct._id
    );
  }, [wishlist.wishlist, currentProduct?._id]);

  const handleWishlistClick = () => {
    if (!currentProduct?._id) return;
    
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }

    if (isInWishlist) {
      dispatch(removeItemFromWishlist(currentProduct._id));
    } else {
      dispatch(addProductToWishlist({ 
        productId: currentProduct._id, 
        size: "M",
        jwt 
      }));
    }
  };


  return (
    <div className="min-h-screen bg-white">
      {product.loading && !product.product ? (
        <div className="flex justify-center items-center min-h-[70vh]">
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress size={60} sx={{ color: "#00927C" }} />
            <p className="mt-4 text-gray-600">Loading product details...</p>
          </Box>
        </div>
      ) : (
        <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">{/* --- PRODUCT DETAILS GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
          {/* LEFT COLUMN: Image Gallery */}
          <section className="flex flex-col-reverse lg:flex-row gap-4 h-fit lg:sticky lg:top-24">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto scrollbar-hide lg:h-[500px] lg:w-[15%] pb-2 lg:pb-0">
              {currentProduct?.images?.map((item: string, index: number) => (
                <div
                  key={index}
                  onClick={() => handleChangeCurrentImage(index)}
                  className={`
                    shrink-0 w-20 h-20 lg:w-full lg:h-24 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200
                    ${
                      currentImage === index
                        ? "border-[#00927C]"
                        : "border-transparent hover:border-gray-300"
                    }
                  `}
                >
                  <img
                    src={item}
                    alt={`thumbnail-${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="w-full lg:w-[85%] relative group">
              <div className="aspect-4/5 w-full overflow-hidden rounded-2xl bg-gray-50 border border-gray-100">
                  <img
                    src={currentProduct?.images?.[currentImage]}
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-in-out group-hover:scale-105"
                  alt="Main Product"
                />
              </div>

              {/* Wishlist Icon */}
              <div className="absolute top-4 right-4">
                <IconButton
                  onClick={handleWishlistClick}
                  disabled={wishlist.loading}
                  sx={{
                    bgcolor: "white",
                    boxShadow: 1,
                    "&:hover": { bgcolor: "#f9f9f9" },
                  }}
                >
                  {isInWishlist ? (
                    <Favorite sx={{ color: "#00927C" }} />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN: Product Info */}
          <section className="space-y-6">
            {/* Header */}
            <div>
              <h2 className="text-[#00927C] font-bold text-sm tracking-widest uppercase mb-2">
                {currentProduct?.category?.name || "Premium Collection"}
              </h2>
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                {currentProduct?.title}
              </h1>
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-3">
              <Chip
                label={
                  <div className="flex items-center gap-1">
                    <span className="font-bold">4.2</span>
                    <Star sx={{ fontSize: 16 }} className="mb-0.5" />
                  </div>
                }
                size="small"
                sx={{ bgcolor: "#00927C", color: "white", fontWeight: "bold" }}
              />
              <span className="text-gray-500 text-sm font-medium hover:text-[#00927C] cursor-pointer underline decoration-dotted">
                {reviews.length} Ratings & Reviews
              </span>
            </div>

            {/* Price */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-end gap-3">
              <span className="text-3xl font-bold text-gray-900">
                ₹{currentProduct?.sellingPrice}
              </span>
              <span className="text-lg text-gray-400 line-through mb-1">
                ₹{currentProduct?.mrpPrice}
              </span>
              <span className="text-lg font-bold text-[#00927C] mb-1">
                {currentProduct?.discountPercent}% OFF
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Inclusive of all taxes. Free Shipping on orders above ₹1500.
            </p>

            {/* Quantity Selector */}
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-2">
                Quantity
              </p>
              <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                <IconButton
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Remove fontSize="small" />
                </IconButton>
                <span className="px-4 font-semibold text-gray-900">
                  {quantity}
                </span>
                <IconButton onClick={() => handleQuantityChange(1)}>
                  <Add fontSize="small" />
                </IconButton>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Button
                variant="contained"
                startIcon={cart.loading ? <CircularProgress size={20} sx={{ color: "white" }} /> : <AddShoppingCart />}
                fullWidth
                disabled={cart.loading}
                sx={{
                  py: 1.8,
                  bgcolor: "#00927C",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  boxShadow: "0 4px 14px 0 rgba(0, 146, 124, 0.39)",
                  "&:hover": { bgcolor: "#007a68" },
                }}
                onClick={handleAddItemToCart}
              >
                {cart.loading ? "Adding..." : "Add to Cart"}
              </Button>

              <Button
                variant="outlined"
                startIcon={wishlist.loading ? <CircularProgress size={20} sx={{ color: "#00927C" }} /> : (isInWishlist ? <Favorite /> : <FavoriteBorder />)}
                fullWidth
                disabled={wishlist.loading}
                onClick={handleWishlistClick}
                sx={{
                  py: 1.8,
                  color: isInWishlist ? "white" : "#00927C",
                  bgcolor: isInWishlist ? "#00927C" : "transparent",
                  borderColor: "#00927C",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  "&:hover": { 
                    borderColor: "#00927C", 
                    bgcolor: isInWishlist ? "#007a68" : "#00927C10" 
                  },
                }}
              >
                {wishlist.loading ? "Processing..." : (isInWishlist ? "In Wishlist" : "Add to Wishlist")}
              </Button>
            </div>

            {/* Description */}
            <div className="pt-4">
              <h3 className="font-bold text-gray-900 mb-2">
                Product Description
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {currentProduct?.description}
              </p>
            </div>

            <Divider />

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Shield />, text: "Authentic & Quality Assured" },
                {
                  icon: <WorkspacePremium />,
                  text: "100% Money Back Guarantee",
                },
                { icon: <LocalShipping />, text: "Free Shipping & Returns" },
                { icon: <Wallet />, text: "Pay on Delivery Available" },
              ].map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100"
                >
                  <div className="text-[#00927C]">{badge.icon}</div>
                  <p className="text-xs font-semibold text-gray-700">
                    {badge.text}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* --- REVIEW SECTION --- */}
        <ReviewSection />

        {/* --- SIMILAR PRODUCTS SECTION --- */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-8 bg-[#00927C] rounded-full"></div>
            <h1 className="text-2xl font-bold text-gray-800">
              Similar Products
            </h1>
          </div>
          <SimilarProduct products={product.relatedProducts} loading={product.loading} />
        </section>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
      </>
      )}
    </div>
  );
};

export default ProductDetails;

