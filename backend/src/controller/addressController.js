const Address = require("../model/Address");
const User = require("../model/User");

const createAddress = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, mobile, address, city, state, pinCode, locality } = req.body;

        const newAddress = new Address({
            name,
            mobile,
            address,
            city,
            state,
            pincode: pinCode,
            locality,
            user: userId
        });

        const savedAddress = await newAddress.save();

        // Add address to user's addresses array
        await User.findByIdAndUpdate(userId, {
            $push: { addresses: savedAddress._id }
        });

        res.status(201).json({
            success: true,
            data: savedAddress,
            message: "Address created successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAddressById = async (req, res) => {
    try {
        const { addressId } = req.params;

        const address = await Address.findById(addressId);

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }

        res.status(200).json({
            success: true,
            data: address,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getUserAddresses = async (req, res) => {
    try {
        const userId = req.user._id;

        const addresses = await Address.find({ user: userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: addresses,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


module.exports = { createAddress, getAddressById, getUserAddresses };

