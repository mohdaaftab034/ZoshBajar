const OrderStatus = Object.freeze({
    PENDING: "PENDING",
    PLACED: "PLACED",
    CONFIRMED: "CONFIRMED",
    SHIPPED: "SHIPPED",
    DELIVERED: "DELIVERED",
    CONCELLED: "CANCELLED"
})

module.exports = OrderStatus;
