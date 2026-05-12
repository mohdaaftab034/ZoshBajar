import HomeCategoryCard from "./HomeCategoryCard";
import { useAppSelectore } from "../../../../Redux Toolkit/store";
import { ArrowRightAlt } from "@mui/icons-material";

// --- Reusable Row Component ---
const CategorySection = ({ title, items, sectionIndex }: { title: string; items: any[]; sectionIndex: number }) => {
  return (
    <div className="mb-12 last:mb-0">
      {/* Row Header */}
      <div className="flex justify-between items-end mb-6 px-2">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          {title}
        </h2>
        <button className="hidden sm:flex items-center gap-2 text-[#00927C] font-semibold hover:gap-3 transition-all text-sm uppercase tracking-wide">
          View All <ArrowRightAlt />
        </button>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        className="
        flex 
        overflow-x-auto 
        pb-6 -mx-4 px-4  /* Negative margin allows scroll to hit screen edges on mobile */
        sm:mx-0 sm:px-0 
        gap-5
        snap-x snap-mandatory /* Makes scrolling feel premium */
        custom-scrollbar
      "
      >
        {items?.map((item, itemIndex) => (
          <div
            key={`${sectionIndex}-${itemIndex}`}
            className="
              flex-shrink-0 
              snap-start 
              w-[85vw]         /* Mobile: Show 1 card + peek of next */
              sm:w-[45vw]      /* Tablet: Show 2 cards */
              md:w-[300px]     /* Desktop: Fixed width cards */
              lg:w-[320px]
            "
          >
            <HomeCategoryCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Component ---
const HomeCategory = () => {
  const categories: any = useAppSelectore(
    (store) => store.homeCategory.homeCategories
  );

  const items = categories?.shopByCategories || [];

  // Simulate 4 different datasets for the 4 rows
  // In a real app, you would filter `items` by type (e.g., items.filter(i => i.type === 'men'))
  const rowData = [
    { title: "Top Categories", data: items }, // Row 1
    { title: "Trending Now", data: [...items].reverse() }, // Row 2 (Reversed for variety)
    { title: "New Arrivals", data: items }, // Row 3
    {
      title: "Premium Collection",
      data: [...items].sort(() => 0.5 - Math.random()),
    }, // Row 4 (Randomized)
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      {rowData.map((section, index) => (
        <CategorySection
          key={index}
          title={section.title}
          items={section.data}
          sectionIndex={index}
        />
      ))}

      {/* CSS to hide scrollbar but keep functionality */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #00927C;
        }
        
        /* Optional: Hide scrollbar completely if you prefer clean look */
        /* .custom-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        } 
        */
      `}</style>
    </div>
  );
};

export default HomeCategory;

