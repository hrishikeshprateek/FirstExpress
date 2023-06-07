const mongoose = require('mongoose');

const allItems = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    AMOUNT: String,
    AVAILABLE: Boolean,
    CAT_NAME_ID : String,
    DESC : String,
    FOOD_TYPE : Number,
    ICON_URL : String,
    NAME : String
},{
    collection : 'ALL_ITEMS'
});

module.exports = mongoose.model('ALL_ITEMS', allItems);