import React from "react";
import { 
  DeleteOutline, 
  ShoppingCartOutlined 
} from "@mui/icons-material";
import { 
  Button, 
  IconButton 
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// --- Types ---
export interface Product {
  _id: string;
  title: string;
  brand: string;
  price: number;
  discountedPrice: number;
  discountPercent: number;
  imageUrl: string;
    images?: string[];
  quantity?: number;
}

export interface WishlistItem {
  _id: string;
  product: Product;
  size?: string;
}

interface WishlistItemCardProps {
  item: WishlistItem;
  onRemove: (id: string) => void;
}

const WishlistItemCard: React.FC<WishlistItemCardProps> = ({ item, onRemove }) => {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    // Logic to add to cart (e.g., local storage or context)
    navigate("/cart");
  };

  return (
    <div className="group border border-gray-200 rounded-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between bg-white relative">
      {/* Product Image */}
      <div 
        onClick={() => navigate(`/product/${item.product._id}`)} 
        className="h-64 overflow-hidden relative cursor-pointer bg-gray-50 flex items-center justify-center"
      >
        <img
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          src={item.product.images ? item.product.images[0] : ""}
          alt={item.product.title}
        />
        
        {/* Floating Remove Button */}
        <div className="absolute top-2 right-2">
            <IconButton 
                size="small" 
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    onRemove(item._id);
                }}
                className="bg-white hover:bg-red-50 hover:text-red-600 shadow-sm"
                sx={{ backgroundColor: 'white' }}
            >
                <DeleteOutline fontSize="small" />
            </IconButton>
        </div>
      </div>

      {/* Content */}
        <div className="p-4 space-y-2 grow">
        <p className="text-xs text-gray-500 uppercase tracking-wide">
            {item.product.brand}
        </p>
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-10">
          {item.product.title}
        </h3>
        
        <div className="flex items-center gap-2 mt-1">
          <p className="font-semibold text-gray-900">
            ₹{item.product.discountedPrice}
          </p>
          <p className="text-xs text-gray-400 line-through">
            ₹{item.product.price}
          </p>
          <p className="text-xs text-[#00927C] font-semibold">
            {item.product.discountPercent}% Off
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 pt-0 mt-auto">
        <Button
          onClick={handleAddToCart}
          variant="outlined"
          fullWidth
          startIcon={<ShoppingCartOutlined />}
          sx={{
            color: "#00927C",
            borderColor: "#00927C",
            "&:hover": {
              borderColor: "#00927C",
              backgroundColor: "rgba(0, 146, 124, 0.04)",
            },
          }}
        >
          Move to Cart
        </Button>
      </div>
    </div>
  );
};

export default WishlistItemCard;
