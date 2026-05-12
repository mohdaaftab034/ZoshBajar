const SellerService = require("../service/SellerService");
const JwtProvider = require("../util/JwtProvider");


const sellerMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Invalid token, Authorization failed." })
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Invalid token, Authorization failed." })
        }

        let email = JwtProvider.gatEmailFromJwt(token);
        
        const seller = SellerService.getSellerFromEmail(email);

        req.seller = seller;

        next();

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = sellerMiddleware;
