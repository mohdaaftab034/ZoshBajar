const { default: mongoose } = require("mongoose");

const dealsSchema = new mongoose.Schema({
    discount: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HomeCategory",
        required: true,
        unique: true
    }
})


const Deal = mongoose.model("Deal", dealsSchema);

module.exports = Deal;
