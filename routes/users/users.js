const express = require('express');
const router = express.Router();
const db = require('../../db')
const Users = require("../../schema/user");
const middleWareAuth = require('../../jwt/middleware/auth')
const jwtHelper = require('../../jwt/helper/JwtHelper')
const ResponseEntity = require("../../model/ResponseEntity");

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
    const response = jwtHelper.verifyJWTTokens(req.params.authToken);
    if(response.success){
        Users
            .find({email : response.username})
            .then((user) => {
                //TODO REMOVE SCHEMA MODEL
                res.send(new ResponseEntity(user,true,'Query successfully executed.'))
            })
            .catch((error) => res.status(500).send(new ResponseEntity('N/A',false,error.message)))
    }else res.status(500).send(new ResponseEntity('N/A',false,response.message))

});

router.post("/post",middleWareAuth, (req, resp) =>{
  resp.send(req.body)
});

module.exports = router;
