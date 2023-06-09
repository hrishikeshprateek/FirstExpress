const mongoose = require('mongoose')

const deal = new mongoose.Schema({

    ID :{
        type: String,
        required: true,
        unique: true
    },
    AMOUNT : Number,
    AVAILABLE : Boolean,
    CAT_NAME_ID : String,
    DESC : String,
    FOOD_TYPE : Number,
    ICON_URL : String,
    NAME : String

},{
    collection : 'DEAL_OF_THE_DAY'
})

module.exports = mongoose.model('DEAL_OF_THE_DAY',deal)