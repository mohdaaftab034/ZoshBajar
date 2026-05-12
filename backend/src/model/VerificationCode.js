const { Schema, default: mongoose } = require("mongoose");

const verificationCodeSchema = new Schema({
    otp: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

})

const VerificationCode = mongoose.model("VerificationCode", verificationCodeSchema);


module.exports = VerificationCode;
