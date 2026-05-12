const Razorpay = require("razorpay");

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

if (!keyId || !keySecret) {
  console.warn("Razorpay credentials missing; payments will be disabled.");
  module.exports = null;
} else {
  const razorpay = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });

  module.exports = razorpay;
}

