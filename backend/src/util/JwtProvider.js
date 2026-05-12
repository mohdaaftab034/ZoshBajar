const jwt = require('jsonwebtoken')

const secretKey = "ksjdheoijdpedkendekndgjgduidbecyvewmxbiunmhshwiudhbhBXshgxiejdgekdhbskxsuhuhdjdkjojf"

class JwtProvider {

    constructor(secretKey){
        this.secretKey = secretKey;
    }

    createJwt(payload) {
        return jwt.sign(payload, this.secretKey, {expiresIn: '10d'});
    }

    gatEmailFromJwt(token){
        try {
            const decodedToken = jwt.verify(token, this.secretKey);
            return decodedToken.email
        } catch (error) {
            throw new Error('Invalid Token');
        }
    }

    verifyJwt(token){
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            throw new Error('Invalid Token');
        }
    }
}


module.exports = new JwtProvider(secretKey);
