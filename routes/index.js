const express = require('express');
const router = express.Router();
const wikiRouter = require('./wiki.js');
const userRouter = require('./user.js');


router.use('/wiki', wikiRouter);
router.use('/users', userRouter); // or will this be a different link?

router.get('/', function(req, res, next){
  res.render('index');
});

module.exports = router;


// This will be a sort of table of contents for which routes we have and how we get to them, which is useful as we scale
