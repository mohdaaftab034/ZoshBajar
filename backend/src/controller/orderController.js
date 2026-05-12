const PaymentOrder = require("../model/PaymentOrder");
const CartService = require("../service/CartService");
const OrderService = require("../service/OrderService");
const PaymentService = require("../service/PaymentService");


class OrderController {

    // Create Order
    async createOrder(req, res) {
        const { shippingAddress } = req.body;
        const { paymentMethod } = req.query;
        const jwt = req.headers.authorization;

        try {
            const user = await req.user;

            const cart = await CartService.findUserCart(user);
            const orders = await OrderService.createOrder(user, shippingAddress, cart)

            const paymentOrder = await PaymentService.createOrder(user, orders);

            const response = {};

            if (paymentMethod === 'RAZORPAY') {
                const payment = await PaymentService.createRazorpayPaymentLink(
                    user,
                    paymentOrder.amount,
                    paymentOrder._id
                )

                response.payment_link_url = payment.short_url;
                paymentOrder.paymentLinkId = payment.id;

                await PaymentOrder.findByIdAndUpdate(paymentOrder._id, paymentOrder);
            }

            return res.status(200).json(response);

        } catch (error) {
            res.status(500).json({ message: `Error creating order: ${error.message}` })
        }
    }

    // Get Order By ID
    async getOrderById(req, res, next) {
        try {
            const { orderId } = req.params;
            const order = await OrderService.findOrderById(orderId);
            return res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ message: `Error creating order: ${error.message}` })
        }
    }

    // Get Order Item By Id
    async getOrderItemById(req, res, next) {
        try {
            const { orderItemId } = req.params;
            const orderItem = await OrderService.findOrderItemById(orderItemId);
            return res.status(200).json(orderItem);
        } catch (error) {
            res.status(500).json({ message: `Error creating order: ${error.message}` })
        }
    }

    // Get user's order history
    async getUserOrderHistory(req, res) {

        const user = await req.user;
        try {
            const orderHistory = await OrderService.usersOrderHistory(user._id);
            return res.status(200).json(orderHistory)
        } catch (error) {
            res.status(500).json({ message: `Error creating order: ${error.message}` })
        }
    }

    // Get orders for a specific seller (shop)
    async getSellerOrders(req, res) {
        try {
            const seller = await req.seller;
            const orders = await OrderService.getSellersOrder(seller._id);
            return res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: `Error creating order: ${error.message}` })
        }
    }

    // Update order status
    async updateOrderStatus(req, res) {
        try {
            const { orderId, orderStatus } = req.params;

            const updateOrder = await OrderService.updateOrderStatus(
                orderId,
                orderStatus
            )
            return res.status(200).json(updateOrder)
        } catch (error) {
            res.status(500).json({ message: `Error creating order: ${error.message}` })
        }
    }

    // Cancel order
    async cancelOrder(req, res) {
        try {
            const { orderId } = req.params;
            const userId = req.user._id;
            const canceledOrder = await OrderService.cancelOrder(orderId, userId);
            return res.status(200).json({ error: error.message });
        } catch (error) {
            res.status(500).json({ message: `Error creating order: ${error.message}` })
        }
    }

    // // Delete An Order
    // async deleteOrder(req, res){
    //     try {
    //         const {orderId} = req.params;
    //         await OrderService.deleteOrder(orderId);
    //         return res.status(200).json({message: "Order deleted successfully."})
    //     } catch (error) {
    //         res.status(500).json({message: `Error creating order: ${error.message}`})
    //     }
    // }
}

module.exports = new OrderController();
