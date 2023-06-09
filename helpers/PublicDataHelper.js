const express = require('express')
const jwt = require('../jwt/helper/JwtHelper')
const allItems = require("../schema/AllItemsSchema");
const ResponseEntity = require("../model/ResponseEntity");
const Categories = require("../schema/CATEGORY");
const deal = require('../schema/DealOfTheDay')

function getAllMenuItems(size, res){
    allItems.find({})
        .limit(size || 40)
        .then(AllItems => {
            res.send(new ResponseEntity(AllItems,true,size ? 'fetched '+size+' entries.':
                'No size parameter fetching 40 entries by default' ))
        })
        .catch(err => {
            res.status(500).send(new ResponseEntity('N/A',false, err.message))
        });
}

function getAllCategories(res){
    Categories.find({})
        .then((CATEGORY) => {
            res.send(new ResponseEntity(CATEGORY,true,'fetched categories successfully !!'))
        })
        .catch((error) => {
            console.error('Error retrieving users:', error);
            res.status(500).send(new ResponseEntity('N/A',false,error.message))
        });
}

function getDealOfTheDay(res) {
    deal.find({})
        .then((deal) =>{
            res.send(new ResponseEntity(deal,true,'fetched deal of the day successfully !!'))
        })
        .catch(err =>{
            console.error('Error retrieving deals:', err);
            res.status(500).send(new ResponseEntity('N/A',false,err.message))
        })
}

module.exports = {
    getAllMenuItems,
    getAllCategories,
    getDealOfTheDay
}