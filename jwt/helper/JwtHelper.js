const jwt = require("jsonwebtoken");
const config = require("../../config/config");

function generateJWTTokens(username,expiryTime,role){
    return jwt.sign({
            username: username ,
            roles : [{authority : role}]},
        config.jwtSecret,
        { expiresIn: expiryTime,algorithm: 'HS256'},null);
}

module.exports = {
    generateJWTTokens
}
