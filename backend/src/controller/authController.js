const UserRoles = require("../domain/UserRole");
const AuthService = require("../service/AuthService");


class AuthController{

    async createUser(req, res){
        try {
            const jwt = await AuthService.createUser(req.body);
            const authRespose = {
                jwt, 
                message: "User created successfully",
                role: UserRoles.CUSTOMER
            }

            res.status(200).json(authRespose);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }


    async signinUser(req, res){
        try {
            const authRes = await AuthService.signin(req.body);

            res.status(200).json(authRes)
        } catch (error) {
            res.status(error instanceof Error ? 404 : 500).json({message: error.message});
        }
    }
}


module.exports = new AuthController();
