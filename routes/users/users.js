const express = require('express');
const router = express.Router();
const db = require('../../db')
const Users = require("../../model/user");
const middleWareAuth = require('../../jwt/middleware/auth')

/* GET users listing. */
router.get('/', middleWareAuth,(req, res)=> {
    Users.find({})
      .then((CATEGORY) => {
          console.log(CATEGORY)
        res.send(CATEGORY)
      })
      .catch((error) => {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'An error occurred' });
      });

});

router.get('/getProfile/:authToken',(req, res) => {
    const token = req.params.authToken

});

router.post("/post",middleWareAuth, (req, resp) =>{
  resp.send(req.body)
});

module.exports = router;
