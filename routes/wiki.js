var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


router.get('/', function(req, res, next){
  if (req.query.tags) {
    next();
  } else {
  Page.findAll()
  .then(function(pages) {
    res.render('index', { pages: pages});
  });
  // res.redirect('/');
  //res.send('retrieve all wiki pages');
  }
});

router.get('/', function(req, res, next) {
  var search = req.query.tags.split(' ');
  Page.findAll({
    where: {
      tags: {
        $overlap: search
      }
    }
  }).then(function (pages) {
    res.render('index', { pages: pages });
  });


});

router.get('/add', function(req, res, next){
  res.render('addpage');
  //res.send('retrieve the "add a page" form');
});

router.get('/:pagetitle', function(req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.pagetitle
    },
    include: [
      {model: User, as: 'author'}
    ]
  })
  .then(function(page){
    if (page === null) {
      res.status(404).send();
    } else {

      res.render('wikipage', { foundPage: page});
    }
  })
  .catch(next);

  // OPTION TWO
  // const foundPage = Page.findOne({ where: { urlTitle: req.params.pagetitle} });
  // const user = foundPage.then( function(page) { return page.getAuthor();} );

  // Promise.all([foundPage, user])
  // .then(function([foundPage, user]) {
  //   res.render('wikipage', {foundPage: foundPage, user: user });
  // })
  // .catch(next);
});

router.post('/', function(req, res, next){
  //also need to make sure that we're not adding an article
  //at a URL that already exists
  var [author, emailEntered] = [req.body.author, req.body.email];

  //var page =

  User.findOrCreate({
    where: {
        name: author,
        email: emailEntered
    }
  })
  .then(function(userInfo){
    var user = userInfo[0];

    var page = Page.build({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags.split(" ")
    });
    return page.save().then(function (page) {
      return page.setAuthor(user);
    });
  })
  .then(function(page){
      res.redirect(page.route);
  })
  .catch(next);

  // .catch(function() {
  //   var user = User.build({
  //     name: author,
  //     email: emailEntered
  //   });
  //   user.save()
  //   .then(function(userInfo){
  //     return Page.build({
  //       title: req.body.title,
  //       content: req.body.content,
  //       authorId: userInfo.id
  //     });
  //   })
  //   .then(function(newPage){
  //     newPage.save().then(function (foundPage) {
  //       res.redirect(foundPage.route);
  //     });
  //   });
  // })


  //var newUser;


  // .then(function(user){
  //   Page.findOne({
  //     where: {title: req.body.title}
  //   }).belongsTo(user);

  //     newUser = user;
  // });

  //res.json(req.body);
  //res.send('submit a new page to the database');
});

module.exports = router;
