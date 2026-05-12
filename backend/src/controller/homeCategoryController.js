const HomeCategoryService = require("../service/HomeCategoryService");
const HomeService = require("../service/HomeService");

class HomeCategoryController{

    // Create Home Categories
    async createHomeCategories(req, res){
        try {
            const homeCategories = req.body;
            const categories = await HomeCategoryService.createCategories(homeCategories)
            const home = await HomeService.createHomePageData(categories);
            return res.status(202).json(home);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    // Get All home categories
    async getHomeCategory(req, res){
        try {
            const categories = await HomeCategoryService.getAllHomeCategories();
            return res.status(200).json(categories); // Send all categories with 200 OK status
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    // Update Home Categories
    async updateHomeCategory(req, res){
        try {
            const id = req.params.id; // Get ID from route params
            const homeCategory = req.body; // Get updated category from request
            const updatedCategory = await HomeCategoryService.updateHomeCategory(homeCategory, id);
            return res.status(200).json(updatedCategory);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    // Create Single Home Category
    async createHomeCategory(req, res){
        try {
            const homeCategory = req.body;
            const createdCategory = await HomeCategoryService.createHomeCategory(homeCategory);
            return res.status(201).json(createdCategory);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
}


module.exports = new HomeCategoryController();
