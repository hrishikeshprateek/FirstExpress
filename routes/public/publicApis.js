const express = require('express');
const Users = require("../../schema/user");
const publicDataHelper = require('../../helpers/PublicDataHelper')
const router = express.Router();

router.get('/menu/getAll', (req, res) => {
    publicDataHelper.getAllMenuItems(req.query.size,res)
})

router.get('/menu/categories',(req, res) =>{
    publicDataHelper.getAllCategories(res)
})

router.get('/menu/dealOfTheDay', (req, res) =>{
    publicDataHelper.getDealOfTheDay(res)
})

module.exports = router;