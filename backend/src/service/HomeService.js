const HomeCategorySection = require("../domain/HomeCategorySection");
const DealService = require("./DealService");

class HomeService{

    async createHomePageData(allCategories){
        // Categories filter with Grid category
        const gridCategories =allCategories.filter(category => category.section === HomeCategorySection.GRID);

        // Categories filter with Shop by categories
        const shopByCategories = allCategories.filter(category => category.section === HomeCategorySection.SHOP_BY_CATEGORIES);

        // Categories filter with electric category
        const electricCategories = allCategories.filter(category => category.section === HomeCategorySection.ELECTRIC_CATEGORIES);

        //Categories filter with Deals category
        const dealCategories = allCategories.filter(category => category.section === HomeCategorySection.DEALS);

        const deals = await DealService.getDeals();

        const home = {
            grid: dealCategories,
            shopByCategories: shopByCategories,
            electricCategories: electricCategories,
            deals: deals,
            dealCategories: dealCategories,
        }

        return home;

    }
}

module.exports = new HomeService();
