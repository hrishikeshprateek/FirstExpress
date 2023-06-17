const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../schema/user');
const jwtHelper = require('../../jwt/helper/JwtHelper')
const ResponseEntity = require("../../model/ResponseEntity");

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ email : username});

        if (!user) {
            return res.status(404).send(new ResponseEntity("[]",false,"No user record found !!"));
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(401).send(new ResponseEntity("[]",false,"Invalid password !!"));
        }

        const token = jwtHelper.generateJWTTokens(user.email,'1h','ADMIN')

        res.json({ success:true, message: 'authentication successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({success : false, message: 'Internal server error', token:'n/a' });
    }
});

module.exports = router;
