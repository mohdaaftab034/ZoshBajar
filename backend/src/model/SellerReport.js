const { default: mongoose, mongo } = require("mongoose");


const sellerReportSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
        required: true
    },
    totalEarnings: {
        type: Number,
        default: 0
    },
    totalSales: {
        type: Number,
        default: 0
    },
    totalRefunds: {
        type: Number,
        default: 0
    },
    totalTax: {
        type: Number,
        default: 0
    },
    netEarnings: {
        type: Number,
        default: 0
    },
    totalOrders: {
        type: Number,
        default: 0 // Default values for total orders
    },
    canceledOrders: {
        type: Number,
        default: 0 // Default values for cancel orders
    },
    totalTransactions: {
        type: Number,
        default: 0 // Default values for total transactions
    },
}, {timestamps: true})


const SellerReport = mongoose.model('SellerReport', sellerReportSchema);


module.exports = SellerReport;
