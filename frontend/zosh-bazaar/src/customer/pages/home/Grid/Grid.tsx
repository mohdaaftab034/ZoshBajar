import { Box, Skeleton, Typography } from "@mui/material";
import { useAppSelectore } from "../../../../Redux Toolkit/store";
import { useNavigate } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";

// Reusable Component for individual Grid Items
const GridItem = ({
  image,
  title,
  colSpan,
  rowSpan,
  categoryId,
}: {
  image: string;
  title?: string;
  colSpan: string;
  rowSpan: string;
  categoryId: string;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (categoryId) {
      navigate(`/products/${categoryId}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative group overflow-hidden rounded-xl shadow-lg cursor-pointer ${colSpan} ${rowSpan}`}
    >
      {/* Background Image with Zoom Effect */}
      <div
        className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 p-4 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <Typography
          variant="h6"
          className="text-white font-bold tracking-wide capitalize"
        >
          {title || "Collection"}
        </Typography>
        <div className="flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-sm text-gray-200 font-medium">Shop Now</span>
          <ArrowForward sx={{ color: "white", fontSize: 16 }} />
        </div>
      </div>
    </div>
  );
};

const Grid = () => {
  const category: any = useAppSelectore(
    (store) => store.homeCategory?.homeCategories
  );

  // Loading State
  if (!category || !category.grid || category.grid.length < 6) {
    return (
      <Box className="px-4 sm:px-5 lg:px-20 pt-10 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-3 sm:gap-4 h-auto lg:h-[650px]">
          <Skeleton
            variant="rectangular"
            className="col-span-2 md:col-span-2 lg:col-span-3 h-[200px] sm:h-[250px] lg:h-full rounded-xl"
          />
          <div className="col-span-2 md:col-span-2 lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4 h-auto lg:h-full">
            <Skeleton variant="rectangular" className="h-[150px] sm:h-[200px] lg:h-full rounded-xl" />
            <Skeleton variant="rectangular" className="h-[150px] sm:h-[200px] lg:h-full rounded-xl" />
            <Skeleton variant="rectangular" className="h-[150px] sm:h-[200px] lg:h-full rounded-xl" />
            <Skeleton variant="rectangular" className="h-[150px] sm:h-[200px] lg:h-full rounded-xl" />
          </div>
          <Skeleton
            variant="rectangular"
            className="col-span-2 md:col-span-2 lg:col-span-3 h-[200px] sm:h-[250px] lg:h-full rounded-xl"
          />
        </div>
      </Box>
    );
  }

  return (
    <div className="py-10 bg-gray-50">
      {/* Responsive Grid Container */}
      {/* Mobile: 2 cols, Tablet: 4 cols, Desktop: 12 cols custom layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-3 sm:gap-4 px-4 sm:px-5 lg:px-20 h-auto lg:h-[650px]">
        {/* Item 0: Left Tall */}
        <GridItem
          image={category.grid[0]?.image}
          title={category.grid[0]?.name}
          categoryId={category.grid[0]?.categoryId}
          colSpan="col-span-2 md:col-span-2 lg:col-span-3"
          rowSpan="h-[180px] sm:h-[220px] md:h-[280px] lg:h-full lg:row-span-12"
        />

        {/* Item 1: Top Middle Left */}
        <GridItem
          image={category.grid[1]?.image}
          title={category.grid[1]?.name}
          categoryId={category.grid[1]?.categoryId}
          colSpan="col-span-1 md:col-span-1 lg:col-span-2"
          rowSpan="h-[150px] sm:h-[180px] lg:h-full lg:row-span-6"
        />

        {/* Item 2: Top Middle Right */}
        <GridItem
          image={category.grid[2]?.image}
          title={category.grid[2]?.name}
          categoryId={category.grid[2]?.categoryId}
          colSpan="col-span-1 md:col-span-1 lg:col-span-4"
          rowSpan="h-[150px] sm:h-[180px] lg:h-full lg:row-span-6"
        />

        {/* Item 3: Right Tall */}
        <GridItem
          image={category.grid[3]?.image}
          title={category.grid[3]?.name}
          categoryId={category.grid[3]?.categoryId}
          colSpan="col-span-2 md:col-span-2 lg:col-span-3"
          rowSpan="h-[180px] sm:h-[220px] md:h-[280px] lg:h-full lg:row-span-12"
        />

        {/* Item 4: Bottom Middle Left */}
        <GridItem
          image={category.grid[4]?.image}
          title={category.grid[4]?.name}
          categoryId={category.grid[4]?.categoryId}
          colSpan="col-span-1 md:col-span-1 lg:col-span-4"
          rowSpan="h-[150px] sm:h-[180px] lg:h-full lg:row-span-6"
        />

        {/* Item 5: Bottom Middle Right */}
        <GridItem
          image={category.grid[5]?.image}
          title={category.grid[5]?.name}
          categoryId={category.grid[5]?.categoryId}
          colSpan="col-span-1 md:col-span-1 lg:col-span-2"
          rowSpan="h-[150px] sm:h-[180px] lg:h-full lg:row-span-6"
        />
      </div>
    </div>
  );
};

export default Grid;

