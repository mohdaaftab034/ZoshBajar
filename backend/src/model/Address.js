const { default: mongoose } = require("mongoose");


const addressSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    locality: {
        type: String
    },
    city: {
        type: String
    },
    pincode: {
        type: Number
    },
    state: {
        type: String
    },
    address: {
        type: String
    },
    mobile: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});


const Address = mongoose.model("Address", addressSchema);


module.exports = Address;
