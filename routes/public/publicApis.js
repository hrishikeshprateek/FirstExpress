const express = require('express');
const  allItems = require('../../schema/AllItemsSchema')
const ResponseEntity = require("../../model/ResponseEntity");
const router = express.Router();

router.get('/menu/getAll', (req, res) => {
    const size = req.query.size;
    allItems.find({})
        .limit(size || 40)
        .then(AllItems => {
            res.send(new ResponseEntity(AllItems,true,size ? 'fetched '+size+' entries.':
                'No size parameter fetching 40 entries by default' ))
        })
        .catch(err => {
            res.status(500).send(new ResponseEntity('N/A',false, err.message))
        });
})

module.exports = router;