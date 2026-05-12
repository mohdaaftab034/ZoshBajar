const { default: mongoose } = require('mongoose');
const DataInitializeService = require('../service/DataInitializeService');

// Use env if set; fall back to legacy URI with test database
const url = process.env.MONGODB_URL || "mongodb+srv://aaftabansari034_db_user:aaftabansari@cluster0.l7mtrdl.mongodb.net/test?retryWrites=true&w=majority";

let connectionPromise;

const connectDB = async () => {
    if (connectionPromise) return connectionPromise;

    if (!url) {
        throw new Error('MONGODB_URL env var is missing');
    }

    connectionPromise = mongoose.connect(url)
        .then(() => {
            DataInitializeService.initializeAdminUser();
            return mongoose.connection;
        })
        .catch((error) => {
            console.error('Database connection failed:', error.message);
            throw error;
        });

    return connectionPromise;
};

module.exports = connectDB;
