const SellerService = require("../service/SellerService");
const UserService = require("../service/UserService");
const JwtProvider = require("../util/JwtProvider");


const authMiddleware = async (req, res, next) => {
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
        
        const user = await UserService.findUserByEmail(email);

        req.user = user;

        next();

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = authMiddleware;
