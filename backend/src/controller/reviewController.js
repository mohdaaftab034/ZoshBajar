const Product = require("../model/Product");
const Review = require("../model/Review");



const createReview = async (req, res) => {
    const user = await req.user;
    //
    const { reviewText, rating, productId } = req.body;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        // Create the New Review
        const review = new Review({
            user: user._id,
            product: product._id,
            reviewText,
            rating,
            createdAt: new Date()
        })

        const savedReview = await review.save();

        product.reviews.push(savedReview._id);

        const allReviews = await Review.find({ product: product._id });

        const totalScore = allReviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = totalScore / allReviews.length;

        product.averageRating = averageRating;

        await product.save();

        return res.status(201).json(savedReview)

    } catch (error) {
        //
        return res.status(500).json({ message: "create Products failed", error: error.message })
    }
}

const getAllReviews = async (req, res) => {
    const productId = req.params.productId;

    try {
        const reviews = await Review.find({ product: productId }).populate('user', 'fullName email');

        return res.status(200).json(reviews);
    } catch (error) {
        return res.status(500).json({ message: "Fetching reviews failed", error: error.message })
    }
}


module.exports = {
    createReview,
    getAllReviews
}
