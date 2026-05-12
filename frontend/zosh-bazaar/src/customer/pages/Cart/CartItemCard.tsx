import { Add, Close, Remove } from "@mui/icons-material";
import { Divider, IconButton } from "@mui/material";
import { useAppDispatch } from "../../../Redux Toolkit/store";
import {
  deleteCartItem,
  updateCartItem,
} from "../../../Redux Toolkit/features/customer/cartSlice";

const CartItemCard = ({ item }: any) => {
  const dispatch = useAppDispatch();

  const handleUpdateCartItem = (quantity: number) => {
    dispatch(
      updateCartItem({
        jwt: localStorage.getItem("jwt"),
        cartItemId: item._id,
        quantity,
      })
    );
  };

  const handleRemove = () => {
    dispatch(
      deleteCartItem({
        jwt: localStorage.getItem("jwt"),
        cartItemId: item._id,
      })
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 relative hover:shadow-md transition-shadow duration-300">
      <div className="p-4 flex gap-4 items-start">
        {/* Product Image */}
        <div className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
          <img
            className="w-full h-full object-cover"
            src={item?.product?.images[0]}
            alt={item?.product?.title}
          />
        </div>

        {/* Details */}
        <div className="grow space-y-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                {item?.product?.brand || "Brand"}
              </p>
              <h1 className="font-medium text-gray-900 text-sm sm:text-base line-clamp-2 pr-6">
                {item?.product?.title}
              </h1>
            </div>
          </div>

          <p className="text-gray-500 text-xs mt-1">
            Sold by:{" "}
            <span className="font-semibold text-gray-700">
              Natural Lifestyle Pvt Ltd
            </span>
          </p>

          <div className="flex gap-2 items-center mt-2">
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded font-medium">
              Size: {item.size || "M"}
            </span>
            <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded font-medium border border-green-100">
              In Stock
            </span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <span className="text-lg font-bold text-gray-900">
              ₹{item?.sellingPrice}
            </span>
            <span className="text-sm text-gray-400 line-through">
              ₹{item?.mrpPrice}
            </span>
            <span className="text-xs text-[#00927C] font-bold">
              {Math.round(
                ((item.mrpPrice - item.sellingPrice) / item.mrpPrice) * 100
              )}
              % Off
            </span>
          </div>
        </div>

        {/* Remove Button (Absolute top-right) */}
        <div className="absolute top-2 right-2">
          <IconButton
            onClick={handleRemove}
            size="small"
            className="text-gray-400 hover:text-red-500"
          >
            <Close fontSize="small" />
          </IconButton>
        </div>
      </div>

      <Divider sx={{ borderColor: "#f0f0f0" }} />

      {/* Footer: Quantity & Actions */}
      <div className="px-4 py-3 flex justify-between items-center bg-gray-50/50 rounded-b-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-300 rounded-full bg-white">
            <IconButton
              disabled={item.quantity === 1}
              onClick={() => handleUpdateCartItem(item.quantity - 1)}
              size="small"
              className="text-gray-600"
            >
              <Remove fontSize="small" />
            </IconButton>

            <span className="w-8 text-center text-sm font-semibold text-gray-800">
              {item.quantity}
            </span>

            <IconButton
              onClick={() => handleUpdateCartItem(item.quantity + 1)}
              size="small"
              className="text-[#00927C]"
            >
              <Add fontSize="small" />
            </IconButton>
          </div>
        </div>

        {/* Can add 'Save for later' here if needed */}
      </div>
    </div>
  );
};

export default CartItemCard;

