const Deal = require("../model/Deal");
const HomeCategory = require("../model/HomeCategory");

class DealService {

    async getDeals() {
        return Deal.find().populate({ path: "category" })
    }

    async createDeals(deal) {
        try {
            const category = await HomeCategory.findById(deal.categoryId);

            if (!category) {
                throw new Error("Category not found");
            }

            // Check if deal already exists for this category
            const existingDeal = await Deal.findOne({ category: deal.categoryId });
            if (existingDeal) {
                throw new Error(`A deal already exists for this category. Please update the existing deal instead.`);
            }

            const newDeal = new Deal({
                discount: deal.discount,
                category: category._id
            })

            const saveDeal = await newDeal.save();

            return await Deal.findById(saveDeal._id).populate({ path: "category" });
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateDeal(deal, id) {
        const exixtingDeal = await HomeCategory.findById(id).populate({ path: "category" });

        if (exixtingDeal) {
            return await Deal.findOneAndUpdate(exixtingDeal._id,
                { discount: deal.discount },
                { new: true })
        }
        throw new Error("Deal not found")
    }

    async deleteDeal(id) {
        const deal = await Deal.findById(id);
        if (!deal) {
            throw new Error("Deal not found")
        }
        await Deal.deleteOne({ _id: id })
    }
}

module.exports = new DealService();
