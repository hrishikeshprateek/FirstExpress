const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const ResponseEntity = require("../../model/ResponseEntity");

function generateJWTTokens(username, expiryTime, role) {
    return jwt.sign({
            username: username,
            roles: [{authority: role}]
        },
        config.jwtSecret,
        {expiresIn: expiryTime, algorithm: 'HS256'}, null);
}

function verifyJWTTokens(token) {
    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
        //console.log(err.message)
        return (err || (Date.now() / 1000) >= decoded.exp ?
            new ResponseEntity('N/A', false, (err) ? err.message : 'token already expired') :
            new ResponseEntity(decoded, true, 'token valid and verified.'));

    }, null);
}

module.exports = {
    generateJWTTokens,
    verifyJWTTokens
}
