const TransactionService = require("../service/TransactionService");

class TransactionController{

    async getTransactionBySeller(req, res){
        try {
            const seller = await req.seller;
            const transaction = await TransactionService.getTransactionsBySellerId(
                seller._id
            );
            return res.status(200).json(transaction);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
}

module.exports = new TransactionController();
