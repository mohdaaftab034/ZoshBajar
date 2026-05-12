const { default: mongoose, model } = require("mongoose");
const UserRoles = require("../domain/UserRole");
const AccountStatus = require("../domain/AccountStatus");

const sellerSchema = new mongoose.Schema({
    sellerName: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        selectFalse: false,
    },
    bussnessDetails: {
        bussnessName: {
            type: String,

        },
        bussnessEmail: {
            type: String
        },
        bussnessMobile: {
            type: String
        },
        bussnessAddress: {
            type: String
        },

    },
    bankDetails: {
        accountNumber: {
            type: String
        },
        accountHolderName: {
            type: String
        },
        bankName: {
            type: String
        },
        ifscCode: {
            type: String
        }
    },
    pickupAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    },
    GSTIN: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [UserRoles.SELLER],
        default: UserRoles.SELLER
    },
    accountStatus: {
        type: String,
        enum: [
            AccountStatus.PENDING_VERIFICATION,
            AccountStatus.ACTIVE,
            AccountStatus.SUSPENDED,
            AccountStatus.DEACTIVATED,
            AccountStatus.BANNED,
            AccountStatus.CLOSED
        ],
        default: AccountStatus.PENDING_VERIFICATION
    }
}, {timestamps: true});

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
