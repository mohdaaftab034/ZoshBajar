import HomeCategoryTable from "./HomeCategoryTable";
import { useAppSelectore } from "../../Redux Toolkit/store";


const ElectronicsTable = () => {
  const homeCategories = useAppSelectore(
    (store) => store.homeCategory.homeCategories
  ) as any;
  //
  return (
    <div>
      <HomeCategoryTable categories={homeCategories?.electricCategories} />
    </div>
  );
};

export default ElectronicsTable;

