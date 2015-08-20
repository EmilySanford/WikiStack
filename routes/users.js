var express = require('express');
var router = express.Router();
var models = require('../models/');
var Page = models.Page;
var User = models.User;
var mongoose = require('mongoose');
var Promise = require('bluebird');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}).exec().then(function(users) {
    console.log(userList);
    res.render('user', {users: users});
  }).catch(next);
  //res.send('respond with a resource');
});


router.get('/:id', function(req, res, next){
  var userPromise = User.findById(req.params.id).exec();
  var pagesPromise = Page.find({ author: req.params.id }).exec();
  Promise.join(userPromise, pagesPromise, function(user, pages){
    res.render('user', { user: user, pages: pages });
  }).catch(next);
});

module.exports = router;
