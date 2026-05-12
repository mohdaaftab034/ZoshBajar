import { ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router";

interface DealCardProps {
  deal: {
    image: string;
    discount: number;
    categoryName?: string;
    categoryId?: string;
  };
}

const DealCard = ({ deal }: DealCardProps) => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    if (deal.categoryId) {
      navigate(`/products/${deal.categoryId}`);
    }
  };
  return (
    <div className="relative group w-full h-[280px] sm:h-80 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-50 mx-auto">
      {/* Background Image with Zoom Effect */}
      <div className="w-full h-full overflow-hidden">
        <img
          src={deal.image}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          alt="Deal Category"
        />
      </div>

      {/* Dark Overlay Gradient (Visible on hover for better text readability) */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

      {/* Discount Badge (Top Right) */}
      <div className="absolute top-3 right-3 bg-[#ff3e6c] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10 animate-pulse">
        {deal.discount}% OFF
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white font-semibold text-lg tracking-wide mb-1 drop-shadow-md">
          Flash Sale
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShopNow}
            className="text-[#00927C] font-bold bg-white px-3 py-1 rounded-md text-sm shadow-sm flex items-center gap-1 hover:bg-gray-100 transition-colors"
          >
            Shop Now <ArrowForward sx={{ fontSize: 14 }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealCard;

