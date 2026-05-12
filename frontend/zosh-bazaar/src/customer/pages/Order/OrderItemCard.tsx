import {
  ElectricBolt,
  NavigateNext,
} from "@mui/icons-material";
import { useNavigate } from "react-router";

const OrderItemCard = ({ orderItem, order }: any) => {
  const navigate = useNavigate();

  // Helper to determine status styles
  const getStatusStyles = (status: string) => {
    switch (status?.toUpperCase()) {
      case "DELIVERED":
        return {
          color: "text-green-600",
          bg: "bg-green-50",
          border: "border-green-200",
        };
      case "CANCELLED":
        return {
          color: "text-red-600",
          bg: "bg-red-50",
          border: "border-red-200",
        };
      case "SHIPPED":
        return {
          color: "text-blue-600",
          bg: "bg-blue-50",
          border: "border-blue-200",
        };
      default:
        return {
          color: "text-teal-600",
          bg: "bg-teal-50",
          border: "border-teal-200",
        };
    }
  };

  const statusStyle = getStatusStyles(order?.orderStatus);

  // Format Date nicely
  const formatDate = (dateString: string) => {
    if (!dateString) return "Processing";
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div
      onClick={() => navigate(`/account/orders/${order._id}/${orderItem._id}`)}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg hover:border-[#00927C] transition-all duration-300"
    >
      {/* Header: Status & Date */}
      <div
        className={`px-5 py-3 flex justify-between items-center border-b border-gray-100 ${statusStyle.bg}`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-1.5 rounded-full bg-white shadow-sm ${statusStyle.color}`}
          >
            {/* Dynamic Icon based on status could go here */}
            <ElectricBolt fontSize="small" />
          </div>
          <div>
            <h1
              className={`font-bold text-sm tracking-wide ${statusStyle.color} uppercase`}
            >
              {order?.orderStatus || "CONFIRMED"}
            </h1>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500 font-medium">Expected Delivery</p>
          <p className="text-sm font-bold text-gray-800">
            {formatDate(order?.deliveryDate)}
          </p>
        </div>
      </div>

      {/* Body: Product Details */}
      <div className="p-5 flex gap-5 items-center">
        {/* Image Container */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden relative">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={orderItem.product?.images[0]}
            alt={orderItem.product?.title}
          />
        </div>

        {/* Text Details */}
        <div className="flex-grow min-w-0 space-y-1">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {orderItem.product?.brand || "Zosh Bazaar"}
          </h2>

          <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 leading-snug">
            {orderItem.product?.title}
          </h3>

          <div className="flex items-center gap-4 mt-2 text-xs sm:text-sm text-gray-500">
            <span className="bg-gray-100 px-2 py-1 rounded font-medium text-gray-700">
              Size: {orderItem.size || "M"}
            </span>
            <span className="font-medium">Qty: {orderItem.quantity}</span>
          </div>
        </div>

        {/* Arrow Icon (Desktop) */}
        <div className="hidden sm:block text-gray-300 group-hover:text-[#00927C] group-hover:translate-x-1 transition-all">
          <NavigateNext fontSize="large" />
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;

