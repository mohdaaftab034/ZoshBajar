const HomeCategory = require("../model/HomeCategory");

class HomeCategoryService {


    async getAllHomeCategories() {
        return await HomeCategory.find();
    } 
 
    async createHomeCategory(homeCategory) {
        return await HomeCategory.create(homeCategory);
    }

    async createCategories(homeCategories) {
        const exixtingCategories = await HomeCategory.find();

        if (exixtingCategories.length == 0) {
            return await HomeCategory.insertMany(homeCategories);
        }

        return exixtingCategories;
    }

    async updateHomeCategory(category, id) {
        const exixtingCategory = await HomeCategory.findById(id);

        if (!exixtingCategory) {
            throw new Error("Category not found");
        }

        return await HomeCategory.findOneAndUpdate(
            { _id: id },
            category,
            { new: true }
        );

    }
}

module.exports = new HomeCategoryService();
