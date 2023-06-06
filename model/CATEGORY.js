const mongoose = require('mongoose');

const CATEGORYM = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
        unique: true
    },
    NAME : String,
    IMAGES : String
},{
    collection : 'CATEGORY'
});

const CATEGORY = mongoose.model('CATEGORY', CATEGORYM);

module.exports = CATEGORY
