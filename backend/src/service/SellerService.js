const Address = require("../model/Address");
const Seller = require("../model/Seller");
const JwtProvider = require("../util/JwtProvider");
const bcrypt = require("bcrypt");


class SellerService {

    async createSeller(sellerData){
        const exixtingSeller = await Seller.findOne({email: sellerData.email});
        if(exixtingSeller){
            throw new Error('Email already registered');
        }

        if (!sellerData.password || sellerData.password.length < 6) {
            throw new Error("Password must be at least 6 characters long")
        }

        const hashedPassword = await bcrypt.hash(sellerData.password, 10);

        let savedAddress = sellerData.pickupAddress;

        savedAddress = await Address.create(sellerData.pickupAddress);

        const newSeller = new Seller({
            sellerName: sellerData.sellerName,
            email: sellerData.email,
            password: hashedPassword,
            pickupAddress: savedAddress._id,
            GSTIN: sellerData.GSTIN,
            mobile: sellerData.mobile,
            bankDetails: sellerData.bankDetails,
            bussnessDetails: sellerData.bussnessDetails
        })

        return await newSeller.save();
    }

    async getSellerProfile(jwt){

        const email = JwtProvider.gatEmailFromJwt(jwt);
        return this.getSellerFromEmail(email);
    }

    async getSellerFromEmail(email){
        const seller = await Seller.findOne({email: email})
        if(!seller){
            throw new Error('Seller not found');
        }
        return seller;
    }


    async getSellerById(id){
        const seller = await Seller.findById(id);
        if(!seller){
            throw new Error('Seller not found');
        }

        return seller;
    }

    async getAllSellers(status){
        return await Seller.find({accountStatus: status});
    }

    async updateSller(exixtingSeller, sellerData){
        return await Seller.findByIdAndUpdate(exixtingSeller._id, sellerData, {new: true});
    }

    async updateSellerStatus(sellerId, status){
        return Seller.findByIdAndUpdate(sellerId, {$set: {accountStatus: status}},
            {new: true}
        )
    }

    async deleteSeller(sellerId){
        return await Seller.findByIdAndDelete(sellerId);
    }
}


module.exports = new SellerService();
