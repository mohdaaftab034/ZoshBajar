const express = require("express");
require("dotenv").config();
const connectDB = require("./db/db");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

/* =========================
   MIDDLEWARES
========================= */

// Simple & safe CORS for Vercel
app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Debug middleware - Log all incoming requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Body:', JSON.stringify(req.body, null, 2));
    next();
});

/* =========================
   DB CONNECTION MIDDLEWARE (for Vercel)
========================= */

// Ensure DB is connected before handling any request
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error('DB connection error:', err.message);
        res.status(500).json({ 
            error: 'Database connection failed',
            message: err.message 
        });
    }
});

/* =========================
   ROUTES
========================= */

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the zosh bazzaar backend system!" });
});

const adminRoutes = require("./routers/AdminRoutes.js");
const sellerRoutes = require("./routers/SellerRoutes.js");
const authRouters = require("./routers/AuthRoutes.js");
const userRouters = require("./routers/UserRoutes.js");
const sellerProductRoutes = require("./routers/SellerProductRoutes.js");
const productRoutes = require("./routers/ProductRoutes.js");
const cartRoutes = require("./routers/CartRoutes.js");
const orderRoutes = require("./routers/OrderRoutes.js");
const sellerOrderRoutes = require("./routers/SellerOrderRoutes.js");
const paymentRoutes = require("./routers/PaymentsRoutes.js");
const transactionRoutes = require("./routers/TransactionRoutes.js");
const sellerReportRoutes = require("./routers/SellerReportRoutes.js");
const homeCategoryRoutes = require("./routers/HomeCategoryRoutes.js");
const dealRoutes = require("./routers/DealRoutes.js");
const chatRoutes = require("./routers/ChatRoutes.js");
const addressRoutes = require("./routers/AddressRoutes.js");
const reviewRoutes = require("./routers/ReviewRoutes.js");
const wishlistRoutes = require("./routers/WishlistRoutes.js");
const couponRoutes = require("./routers/CouponRoutes.js");

app.use("/reviews", reviewRoutes);
app.use("/wishlist", wishlistRoutes);

app.use("/auth", authRouters);
app.use("/users", userRouters);
app.use("/sellers", sellerRoutes);
app.use("/products", productRoutes);
app.use("/sellers/products", sellerProductRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/sellers/orders", sellerOrderRoutes);
app.use("/payment", paymentRoutes);
app.use("/transactions", transactionRoutes);
app.use("/sellers/report", sellerReportRoutes);
app.use("/addresses", addressRoutes);
app.use("/coupons", couponRoutes);

app.use("/admin", adminRoutes);
app.use("/home", homeCategoryRoutes);
app.use("/admin/deals", dealRoutes);
app.use("/chat", chatRoutes);

/* =========================
   ERROR HANDLERS
========================= */

// 404 Handler for undefined routes
app.use((req, res) => {
    console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
        error: 'Route not found',
        method: req.method,
        path: req.originalUrl,
        message: `Cannot ${req.method} ${req.originalUrl}`
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

/* =========================
   SERVER & DB CONNECTION
========================= */

const PORT = process.env.PORT || 5000;

// Local development
if (!process.env.VERCEL) {
    app.listen(PORT, async () => {
        try {
            await connectDB();
            console.log(`Server running on port ${PORT}`);
        } catch (error) {
            console.error("DB connection failed:", error.message);
            process.exit(1);
        }
    });
} else {
    // Vercel (serverless) – DB connect once on cold start
    connectDB().then(() => {
        console.log("DB connected on Vercel");
    }).catch(err => {
        console.error("DB init error:", err.message);
    });
}

module.exports = app;
