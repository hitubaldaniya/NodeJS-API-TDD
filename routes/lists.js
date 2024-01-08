const express = require("express");
const router = express.Router();
const createError = require('http-errors');
const { valideSchema } = require("../utils/validator");

const lists = [{ id: 1, name: "Hitesh", completed: false }];

router.get("/", function (req, res, next) {
  res.json(lists);
});

router.get("/:id", function (req, res, next) {
  const id = Number(req.params.id);
  const findlist = lists.find((list) => list.id === id);

  if(!findlist) return next(createError(404, 'Not Found'));

  res.json(findlist);
});

router.post('/', function(req, res, next) {
    const { body } = req;

    const {error, value} = valideSchema(body);

    if(error){ 
      return next(createError(422, `Validation Error: ${JSON.stringify(error.details)}`)) ;
    }        

    const newList = {
        id: lists.length + 1,
        name: body.name,
        completed: false
    }
    
    lists.push(newList);

    res.status(201).json(newList);
})

module.exports = router;
