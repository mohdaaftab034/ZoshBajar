import { ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const HomeCategoryCard = ({ item }: any) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products/${item.categoryId}`)}
      className="
        relative 
        w-full h-[240px] sm:h-[280px] md:h-[320px] 
        rounded-3xl 
        overflow-hidden 
        cursor-pointer 
        group 
        shadow-md hover:shadow-xl 
        transition-all duration-500
        border border-gray-100
      "
    >
      {/* --- Background Image with Zoom Effect --- */}
      <img
        src={item.image}
        alt={item.name}
        className="
          w-full h-full 
          object-cover 
          transform transition-transform duration-700 ease-out 
          group-hover:scale-110
        "
      />

      {/* --- Gradient Overlay --- */}
      <div
        className="
          absolute inset-0 
          bg-gradient-to-t from-black/80 via-black/20 to-transparent 
          opacity-80 group-hover:opacity-90 
          transition-opacity duration-300
        "
      />

      {/* --- Content Area --- */}
      <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 md:p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <h2 className="text-lg sm:text-xl font-bold mb-1 tracking-wide">{item.name}</h2>

        <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-2 group-hover:translate-y-0">
          Explore Collection
        </p>
 
        <div
          className="
            flex items-center gap-2 
            text-[#00927C] font-semibold bg-white 
            w-fit px-4 py-2 rounded-full 
            transform scale-90 opacity-0 
            group-hover:scale-100 group-hover:opacity-100 
            transition-all duration-500 delay-100
        "
        >
          <span className="text-sm">Shop Now</span>
          <ArrowForward
            fontSize="small"
            className="transform group-hover:translate-x-1 transition-transform"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeCategoryCard;

