const Category = require("../model/Category");
const Product = require("../model/Product");

const calculateDiscountPercent = (mrpPrice, sellingPrice) => {
    if (mrpPrice <= 0) {
        return 0;
        // throw new Error("MRP Price should be graeter than Zero")
    }

    const discount = mrpPrice - sellingPrice;

    return Math.round((discount / mrpPrice) * 100);

}


class ProductService {


    async createProduct(req, seller) {
        try {
            const discountPercent = calculateDiscountPercent(
                req.mrpPrice,
                req.sellingPrice
            );

            const category1 = await this.createOrGetCategory(req.category, 1);
            const category2 = await this.createOrGetCategory(req.category2, 2, category1._id);
            const category3 = await this.createOrGetCategory(req.category3, 3, category2._id);

            const product = new Product({
                title: req.title,
                description: req.description,
                images: req.images,
                sellingPrice: req.sellingPrice,
                mrpPrice: req.mrpPrice,
                discountPercent,
                size: req.sizes,
                color: req.color,
                quantity: req.quantity,
                seller: seller._id,
                category: category3._id
            });

            return await product.save();

        } catch (error) {
            throw new Error(error.message);
        }
    }


    async createOrGetCategory(categoryId, level, parentId = null) {
        let category = await Category.findOne({ categoryId });

        if (!category) {
            category = new Category({
                categoryId,
                level,
                parentCategory: parentId
            })
            category = await category.save();
        }
        return category;
    }


    async deleteProduct(productId) {
        try {
            const product = await Product.findByIdAndDelete(productId);
            return "Product deleted successfully."
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateProduct(productId, updatedProductData) {
        try {
            const product = await Product.findByIdAndUpdate(
                productId,
                updatedProductData, { new: true }
            )
            return product;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async findProductById(productId) {
        try {
            const product = await Product.findById(productId).populate("category");

            if (!product) {
                throw new Error("Product Not found");
            }
            return product;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async searchProduct(query) {
        try {
            const products = await Product.find({ title: new RegExp(query, "i") });
            return products;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getProductBySellerId(sellerId) {
        return Product.find({ seller: sellerId });
    }

    async getAllProducts(req) {
        const filterQuery = {};

        // Filter to show only products created by sellers (exclude admin products)
        // If you need to filter by seller existence, uncomment this:
        if (req.sellersOnly === 'true') {
            filterQuery.seller = { $exists: true, $ne: null };
        }

        if (req.category) {
            //
            const category = await Category.findOne({ categoryId: req.category });
            //
            if (!category) {
                return {
                    content: [],
                    totalPages: 0,
                    totalElement: 0
                }
            }
            
            // Get category ID and also find all child categories
            const categoryIds = [category._id.toString()];
            
            // If this is a level 1 or level 2 category, also include products from child categories
            const childCategories = await Category.find({ parentCategory: category._id });
            if (childCategories && childCategories.length > 0) {
                const childCategoryIds = childCategories.map(cat => cat._id.toString());
                categoryIds.push(...childCategoryIds);
                
                // Also get grandchild categories (level 3)
                const grandchildCategories = await Category.find({ 
                    parentCategory: { $in: childCategories.map(cat => cat._id) }
                });
                if (grandchildCategories && grandchildCategories.length > 0) {
                    const grandchildCategoryIds = grandchildCategories.map(cat => cat._id.toString());
                    categoryIds.push(...grandchildCategoryIds);
                }
            }
            
            // Filter by any of the category IDs
            filterQuery.category = { $in: categoryIds };
        }

        if (req.color) {
            filterQuery.color = req.color;
        }

        if (req.minPrice && req.maxPrice) {
            filterQuery.sellingPrice = { $gte: req.minPrice, $lte: req.maxPrice };
        }

        if (req.minDiscount) {
            filterQuery.discountPercent = { $gte: req.minDiscount };
        }

        if (req.size) {
            filterQuery.size = req.size;
        }

        let sortQuery = {};

        if (req.sort === "price_low") {
            sortQuery.sellingPrice = 1;
        } else if (req.sort === "price_high") {
            sortQuery.sellingPrice = -1;
        }

        const products = await Product.find(filterQuery)
            .sort(sortQuery).skip(req.pageNumber * 10)
            .limit(8);

        //
        const totalElement = await Product.countDocuments(filterQuery);

        const totalPages = Math.ceil(totalElement / 10);

        const res = {
            content: products,
            totalPages: totalPages,
            totalElement: totalElement
        }

        return res;
    }
}


module.exports = {
    ProductService: new ProductService(),
    calculateDiscountPercent
};
