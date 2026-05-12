import { Box } from "@mui/material";
import { menLevelTwo } from "../../Data/category/levelTwo/menLevelTwo";
import { womenLevelTwo } from "../../Data/category/levelTwo/womenLevelTwo";
import { electronicLevelTwo } from "../../Data/category/levelTwo/electronicLevelTwo";
import { furnitureLevelTwo } from "../../Data/category/levelTwo/furnitureLevelTwo";
import { menLevelThree } from "../../Data/category/level three/menLevelThree";
import { womenLevelThree } from "../../Data/category/level three/womenLevelThree";
import { furnitureLevelThree } from "../../Data/category/level three/furnitureLevelThree";
import { electronicLevelThree } from "../../Data/category/level three/electronicsLevelThree";
import { useNavigate } from "react-router";

// --- Types ---
// (Optional: Good practice to keep these if using TypeScript)
interface CategoryItem {
  name: string;
  categoryId: string;
  parentCategoryId?: string;
  level?: number;
}

const categoryTwo: { [key: string]: CategoryItem[] } = {
  men: menLevelTwo,
  women: womenLevelTwo,
  electronics: electronicLevelTwo,
  home_furniture: furnitureLevelTwo,
};

const categoryThree: { [key: string]: CategoryItem[] } = {
  men: menLevelThree,
  women: womenLevelThree,
  electronics: electronicLevelThree,
  home_furniture: furnitureLevelThree,
};

const CategorySheet = ({ selectedCategory, setShowSheet }: any) => {
  const navigate = useNavigate();

  // Helper to find children
  const childCategory = (category: CategoryItem[], parentCategoryId: string) =>
    category?.filter((child) => child.parentCategoryId === parentCategoryId);

  return (
    <Box
      sx={{ zIndex: 9999 }}
      className="bg-white shadow-2xl w-full h-[80vh] sm:h-[500px] lg:h-[550px] overflow-y-auto rounded-b-xl border-t border-gray-100 relative custom-scrollbar"
    >
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00927C] to-transparent opacity-50"></div>

      {/* Grid Layout: 
          - 2 columns on Mobile
          - 3 columns on Tablets (md)
          - 4 columns on Laptops (lg)
          - 5 columns on Large Desktops (xl)
      */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-10 lg:px-16">
        {categoryTwo[selectedCategory]?.map((item, index) => {
          const children = childCategory(
            categoryThree[selectedCategory] || [],
            item.categoryId
          );

          return (
            <div
              key={`${item.categoryId}-${index}`}
              className="group space-y-4"
            >
              {/* Category Heading */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-4 bg-[#00927C] rounded-full"></div>
                <h3 className="font-bold text-[#00927C] text-sm uppercase tracking-wider">
                  {item.name}
                </h3>
              </div>

              {/* Sub-category Links */}
              <ul className="space-y-2">
                {children?.map((child, childIdx) => (
                  <li
                    key={child.categoryId || `${item.categoryId}-${childIdx}`}
                    onClick={() => {
                      navigate(`/products/${child.categoryId}`);
                      setShowSheet(false);
                    }}
                    className="
                        text-sm text-gray-500 font-medium cursor-pointer 
                        transition-all duration-200 ease-in-out
                        hover:text-gray-900 hover:translate-x-1 hover:font-semibold
                        flex items-center gap-2
                    "
                  >
                    {/* Subtle dot on hover */}
                    <span className="w-1 h-1 rounded-full bg-gray-300 opacity-0 transition-opacity group-hover:opacity-100"></span>
                    {child.name}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Custom Scrollbar Styles (Inline or move to global CSS) */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #00927C;
        }
      `}</style>
    </Box>
  );
};

export default CategorySheet;

