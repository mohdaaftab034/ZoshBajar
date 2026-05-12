const Seller = require("../model/Seller");
const User = require("../model/User");
const JwtProvider = require("../util/JwtProvider");
const Cart = require("../model/Cart");
const UserService = require("./UserService");
const bcrypt = require("bcrypt");


class AuthService {

    async createUser(req) {
        const { email, fullName, password } = req;

        let user = await User.findOne({ email })

        if (user) {
            throw new Error("User already exists with email")
        }

        if (!password || password.length < 6) {
            throw new Error("Password must be at least 6 characters long")
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            email,
            fullName,
            password: hashedPassword
        })

        await user.save();

        const cart = new Cart({ user: user._id })
        await cart.save();

        return JwtProvider.createJwt({ email })
    }

    async signin(req) {
        const { email, password } = req;

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid password")
        }

        return {
            message: "Login Success",
            jwt: JwtProvider.createJwt({ email }),
            role: user.role
        }


    }
}


module.exports = new AuthService();
