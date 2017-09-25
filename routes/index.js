var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next){
  res.render('index');
});

module.exports = router;


// This will be a sort of table of contents for which routes we have and how we get to them, which is useful as we scale
