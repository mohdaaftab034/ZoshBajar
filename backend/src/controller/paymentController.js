const Cart = require("../model/Cart");
const OrderService = require("../service/OrderService");
const PaymentService = require("../service/PaymentService");
const SellerReportService = require("../service/SellerReportService");
const SellerService = require("../service/SellerService");
const TransactionService = require("../service/TransactionService");


const paymentSuccessHandler = async (req, res) => {
    const {paymentId} = req.params;
    const {paymentLinkId} = req.query;

    try {
        // Get the user from JWT token

        const user = await req.user;

        const paymentOrder = await PaymentService.getPaymentOrderByPaymentLinkId(paymentLinkId);

        const paymentSuccess = await PaymentService.proceedPaymentOrder(
            paymentOrder,
            paymentId,
            paymentLinkId
        );

        if(paymentSuccess){
            for(let orderId of paymentOrder.orders){
                const order = await OrderService.findOrderById(orderId);

                // Create Transaction for the order
                await TransactionService.createTransaction(order);

                // Get seller and update seller report
                const seller = await SellerService.getSellerById(order.seller);
                const sellerReport = await SellerReportService.getSellerReport(seller);

                // Update the Seller's report
                sellerReport.totalOrders += 1;
                sellerReport.totalEarnings += order.totalSellingPrice;
                sellerReport.totalSales += order.orderItems.length;

                const updatedReport = await SellerReportService.updateSellerReport(sellerReport);
            }

            // await Cart.findOneAndUpdate(
            //     {user: user._id},
            //     {cartItems: []},
            //     {new: true}
            // );

            return res.status(201).json({message: "Payment successfull"})
        } else {
            return res.status(400).json({message: "Payment failed"})
        }

    } catch (error) {
        throw new Error(`Error updating seller report: ${error.message}`)
    }
}

module.exports = {
    paymentSuccessHandler
};
