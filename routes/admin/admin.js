let express = require('express');
let router = express.Router();

router.delete('/category/delete/:catID',function (req, res) {
    res.send(req.params)
})

module.exports = router;