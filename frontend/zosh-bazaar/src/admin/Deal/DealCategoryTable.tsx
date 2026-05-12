import HomeCategoryTable from '../HomePage/HomeCategoryTable'
import { useAppSelectore } from '../../Redux Toolkit/store';



const DealCategoryTable = () => {

  const  homeCategories  = useAppSelectore((store) => store.homeCategory.homeCategories) as any;

  return (
    <div>
        <HomeCategoryTable categories={homeCategories?.dealCategories}/>
    </div>
  )
}

export default DealCategoryTable
