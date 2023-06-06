const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../model/user');
const jwtHelper = require('../../jwt/helper/JwtHelper')

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ email : username});

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwtHelper.generateJWTTokens(user.email,'1h','ADMIN')

        res.json({ success:true, message: 'authentication successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({success : false, message: 'Internal server error', token:'n/a' });
    }
});

module.exports = router;
