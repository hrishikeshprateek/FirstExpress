const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const {verifyJWTTokens} = require("../helper/JwtHelper");

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token || !token.toString().startsWith('Bearer')) {
        return res.status(401).json({ message: 'No token provided or token not formatted properly' });
    }

    const responseEntity = verifyJWTTokens(token);

    if (responseEntity.success){
        req.username = responseEntity.data.username;
        next();
    }else return res.status(401).json({ message: 'Invalid token : '+responseEntity.message });

/*    jwt.verify(token.toString().substring(7), config.jwtSecret, (err, decoded) => {
        console.log(token.toString().substring(7))
        if (err) {
            return res.status(401).json({ message: 'Invalid token : '+err.message });
        }

        req.username = decoded.username;
        next();
    },null);*/
};

module.exports = verifyToken;
