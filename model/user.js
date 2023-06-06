const mongoose = require('mongoose');

const roles = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    role: String
});

const user = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    email: String,
    password: String,
    name: String,
    phone: String,
    createdOn: String,
    enabled: String,
    isEmailVerified: Boolean,
    roles: {
        type: [roles],
        default: []
    }
},{
    collection : 'user'
});

const User = mongoose.model('user', user);

module.exports = User;
