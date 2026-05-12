// Vercel serverless entry point
const app = require('../src/index');

// Export the Express app directly for Vercel
module.exports = app;
