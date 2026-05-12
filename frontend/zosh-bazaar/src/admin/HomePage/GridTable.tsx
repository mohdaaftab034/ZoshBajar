import { useAppSelectore } from "../../Redux Toolkit/store";
import HomeCategoryTable from "./HomeCategoryTable";

const GridTable = () => {
  const homeCategories = useAppSelectore(
    (store) => store.homeCategory.homeCategories
  ) as any;
  return (
    <div>
      <HomeCategoryTable categories={homeCategories?.grid} />
    </div>
  );
};

export default GridTable;

