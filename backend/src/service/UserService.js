const User = require("../model/User");
const JwtProvider = require("../util/JwtProvider");



class UserService{

    async findUserProfileByJwt(jwt){
        const email = JwtProvider.gatEmailFromJwt(jwt);

        const user = await User.findOne({email});

        if(!user){
            throw new Error(`User does not exist with email ${email}`);
        }

        return user;
    }

    async findUserByEmail(email){
        const user = await User.findOne({email});

        if(!user){
            throw new Error(`User does not exist with this ${email}`)
        }

        return user;
    }
}

module.exports = new UserService();
