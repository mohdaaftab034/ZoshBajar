const UserRoles = require("../domain/UserRole");
const SellerService = require("../service/SellerService");
const JwtProvider = require("../util/JwtProvider");
const bcrypt = require("bcrypt");




class SellerController{
    

    async getSellerProfile(req, res) {
        try {
            const profile = await req.seller;
            const jwt = req.headers.authorization.split(" ")[1]
            const seller = await SellerService.getSellerProfile(jwt);

            res.status(200).json(seller);
        } catch (error) {
            res.status(error instanceof Error ? 404 : 500).json({message: error.message});
        }
    }

    async createSeller(req, res) {
        try {
            const seller = await SellerService.createSeller(req.body);

            const token = JwtProvider.createJwt({email: seller.email});

            const authResponse = {
                message: "Seller created successfully",
                jwt: token,
                role: UserRoles.SELLER
            }

            res.status(200).json(authResponse);
        } catch (error) {
            res.status(error instanceof Error ? 404 : 500).json({message: error.message});
        }
    }

    async getAllSellers(req, res) {
        try {
            const status = req.query.status;
            const sellers = await SellerService.getAllSellers(status);

            res.status(200).json(sellers);
        } catch (error) {
            res.status(error instanceof Error ? 404 : 500).json({message: error.message});
        }
    }

    async updateSeller(req, res) {
        try {
            const exixtingSeller = await req.seller
            const seller = await SellerService.updateSller(exixtingSeller, req.body);

            res.status(200).json({message: "seller updated successfully", seller});
        } catch (error) {
            res.status(error instanceof Error ? 404 : 500).json({message: error.message});
        }
    }

    async deleteSeller(req, res) {
        try {
            await SellerService.deleteSeller(req.params.id);

            res.status(200).json({message: "seller deleted..."});
        } catch (error) {
            res.status(error instanceof Error ? 404 : 500).json({message: error.message});
        }
    }


    async updateSellerAccountStatus(req, res) {
        try {
            const updatedSeller = await SellerService.updateSellerStatus(req.params.id, req.params.status);

            res.status(200).json(updatedSeller);
        } catch (error) {
            res.status(error instanceof Error ? 404 : 500).json({message: error.message});
        }
    }

    async signinSeller(req, res) {
        try {
            const {email, password} = req.body;

            const seller = await SellerService.getSellerFromEmail(email);

            const isPasswordValid = await bcrypt.compare(password, seller.password);

            if (!isPasswordValid) {
                throw new Error("Invalid password")
            }

            const token = JwtProvider.createJwt({email})

            const authResponse = {
                message: "Login Success",
                jwt: token,
                role: UserRoles.SELLER
            }

            return res.status(200).json(authResponse);

        } catch (error) {
            res.status(error instanceof Error ? 404 : 500).json({message: error.message});
        }
    }
}


module.exports = new SellerController();
