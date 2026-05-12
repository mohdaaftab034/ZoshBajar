import ElectronicCategoryCard from "./ElectronicCategoryCard";
import { useAppSelectore } from "../../../../Redux Toolkit/store";

const ElectronicCategory = () => {
  const homeCategories: any = useAppSelectore(
    (store) => store.homeCategory.homeCategories
  );

  //
  // Fallback if data isn't loaded yet
  if (!homeCategories?.electricCategories) return null;

  return (
    <div className="bg-white py-4 sm:py-6 border-b border-gray-100">
      {/* Responsive Layout Strategy:
         - Mobile/Tablet: Flexbox with horizontal scrolling (overflow-x-auto)
         - Desktop (lg): Grid layout for perfect alignment
      */}
      <div
        className="
          flex overflow-x-auto gap-3 sm:gap-4 lg:gap-4 px-4 sm:px-5 lg:px-20
          scrollbar-hide snap-x 
          lg:grid lg:grid-cols-8 lg:overflow-visible
      "
      >
        {homeCategories.electricCategories.slice(0, 8).map((item: any) => (
          <ElectronicCategoryCard key={item.categoryId} item={item} />
        ))}
      </div>

      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default ElectronicCategory;

