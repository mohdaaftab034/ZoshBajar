const razorpay = require("../config/razorpayClient");
const OrderStatus = require("../domain/OrderStatus");
const PaymentStatus = require("../domain/PaymentStatus");
const Order = require("../model/Order");
const PaymentOrder = require("../model/PaymentOrder");

class PaymentService{

    async createOrder(user, orders){
        const amount = orders.reduce((sum, order)=> sum + order.totalSellingPrice, 0);

        const paymentOrder = new PaymentOrder({
            amount,
            user: user._id,
            orders: orders.map(order => order._id)
        })

        return await paymentOrder.save();
    }

    async getPaymentOrderById(orderId){
        const paymentOrder = await PaymentOrder.findOne(orderId);

        if(!paymentOrder){
            throw new Error("Payment Order not found");
        }

        return paymentOrder;
    }

    async getPaymentOrderByPaymentLinkId(paymentLinkId){
        const paymentOrder = await PaymentOrder.findOne({paymentLinkId});

        if(!paymentOrder){
            throw new Error("Payment Order not found");
        }

        return paymentOrder;
    }

    async proceedPaymentOrder(paymentOrder, paymentId, paymentLinkId){
        if (!razorpay) {
            throw new Error("Razorpay is not configured");
        }

        if(paymentOrder.status === PaymentStatus.PENDING){
            const payment = await razorpay.payments.fetch(paymentId);

            if(payment.status === 'captured'){
                // Update each order's payment status
                await Promise.all(paymentOrder.orders.map(async (orderId)=> {
                    const order = await Order.findById(orderId);
                    order.paymentStatus = PaymentStatus.COMPLETED;
                    order.orderStatus = OrderStatus.PLACED
                    await order.save();
                }))

                paymentOrder.status = PaymentStatus.COMPLETED

                await paymentOrder.save();

                return true;
            } else {
                paymentOrder.status = PaymentStatus.FAILED;
                await paymentOrder.save();
                return false;
            }
        }
        return false;
    }

    async createRazorpayPaymentLink(user, amount, orderId){
        try {
            if (!razorpay) {
                throw new Error("Razorpay is not configured");
            }

            const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

            const paymentLinkRequest = {
                amount: amount * 100,
                currency: "INR",
                customer: {
                    name: user.fullName,
                    email: user.email
                },
                notify: {
                    email: true
                },
                callback_url: `${frontendUrl}/payment-success/${orderId}`,
                callback_method: "get"
            }

            const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);

            return paymentLink;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}


module.exports = new PaymentService();
