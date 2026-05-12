const Order = require("../model/Order");
const Seller = require("../model/Seller");
const Transaction = require("../model/Transaction");

class TransactionService{

    // Create a new transaction from an order
    async createTransaction(orderId){
        // Find the order by ID
        const order = await Order.findById(orderId).populate('seller');
        if(!order){
            throw new Error('Order not found');
        }

        const seller = await Seller.findById(order.seller._id);
        if(!seller){
            throw new Error('Seller not found')
        }

        // Create a new Transaction
        const transaction = new Transaction({
            seller: seller._id,
            customer: order.user,
            order: order._id
        })
        
        // Save and return the transaction
        return await transaction.save();
    }

    // Get transaction by seller ID
    async getTransactionsBySellerId(sellerId){
        return await Transaction.find({seller: sellerId}).populate("order");
    }

    // Get All Transaction
    async getAllTransaction(){
        return Transaction.find().populate('seller order customer');
    }
}

module.exports = new TransactionService();
