var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next){
  User.findAll()
  .then(function(users){
    res.render('users', {users: users});
  })
  .catch(next);
});

router.get('/:id', function(req, res, next){
  var pagePromise = Page.findAll({ where: { authorId: req.params.id} });
  var userPromise = User.findOne({ where: { id: req.params.id} });
  Promise.all([userPromise, pagePromise])
  .then(function([user, pages]){
    res.render('singleuser', {user: user, pages: pages});
  })
  .catch(next);
});


module.exports = router;
