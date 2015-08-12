var express = require('express');
var router = express.Router();
var models = require('../models/');
var Page = models.Page;
var User = models.User;

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}).exec().then(function(userList) {
    console.log(userList);
    res.render('user', {users: userList});
  }).catch(next);
  res.send('respond with a resource');
});

module.exports = router;
