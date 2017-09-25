var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


router.get('/', function(req, res, next){
  res.redirect('/');
  //res.send('retrieve all wiki pages');
});

router.get('/add', function(req, res, next){
  res.render('addpage');
  //res.send('retrieve the "add a page" form');
});

router.post('/', function(req, res, next){
  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });
  page.save().then(res.json(page));
  //res.json(req.body);
  //res.send('submit a new page to the database');
});

module.exports = router;
