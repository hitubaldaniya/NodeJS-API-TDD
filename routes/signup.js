const express = require("express");
const router = express.Router();
const createError = require('http-errors');
const { valideUserLogin } = require("../utils/validator");

const userObj = [];

router.get("/", function (req, res, next) {
    res.json(userObj);
});

router.post('/', function(req, res, next) {
    const { body } = req;
    
    const {error, value} = valideUserLogin(body);

    if(error){ 
      return next(createError(422, `Validation Error: ${JSON.stringify(error.details)}`)) ;
    }        
    
    const newUser = {
        email: body.email,
        password: body.password,
        confirmPassword: body.confirmPassword,
        address: body.address,
        dob: body.dob
    }
    
    userObj.push(newUser);

    res.status(201).json(newUser);
})

module.exports = router;
