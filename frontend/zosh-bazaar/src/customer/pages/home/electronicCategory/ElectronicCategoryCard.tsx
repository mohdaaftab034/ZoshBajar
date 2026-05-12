import { useNavigate } from "react-router";

interface CategoryItemProps {
  item: {
    categoryId: string;
    image: string;
    name: string;
  };
}

const ElectronicCategoryCard = ({ item }: CategoryItemProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/products/${item.categoryId}`)}
      className="
        group flex flex-col items-center gap-3 cursor-pointer 
        min-w-[80px] snap-center 
        transition-all duration-300
      "
    >
      {/* Image Container with Hover Effects */}
      <div
        className="
          h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-gray-50 
          flex items-center justify-center 
          shadow-sm border border-gray-100
          group-hover:bg-[#00927C]/10 group-hover:border-[#00927C] 
          group-hover:shadow-md
          transition-all duration-300 ease-in-out
      "
      >
        <img
          src={item.image}
          alt={item.name}
          className="
            object-contain h-10 w-10 md:h-12 md:w-12 
            group-hover:scale-110 transition-transform duration-300
          "
        />
      </div>

      {/* Text Label */}
      <h2
        className="
          font-medium text-xs md:text-sm text-center text-gray-700 
          group-hover:text-[#00927C] group-hover:font-semibold
          transition-colors duration-300
          truncate w-full px-1
      "
      >
        {item.name}
      </h2>
    </div>
  );
};

export default ElectronicCategoryCard;

