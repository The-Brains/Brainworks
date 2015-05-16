/**
 * New node file
 */
require('../models/User');

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local');
var User = mongoose.model('User');
/*
 * TODO
 * signin
 * signup
 * signout
 */

passport.serializeUser(function(user, done) {
  done(null, user.id);
});


passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new localStrategy.Strategy(function(username, password, done) {
  User.findOne({username: username, password: password}, function(err, user) {
    if(err) { return done(err); }
    else if(!user) { return done(null, false, { message: 'Invalid username or password!'}); }
    else { return done(null, user); }
  });
}));

router.post('/check', function(req, res, next) {
  User.findOne({username: req.username}, function(err, user) {
    if(err) { next(err); }
    else { res.json({available: !user}); }
  });
});

//router.post('/signUp', function() {});

//router.post('/signIn', function() {});

//router.get('/signOut', function() {});

router.get('/signIn', function(req, res, next) {
  res.render('user/signIn', {});
});

router.get('/settings', function(req, res, next) {
  res.render('user/settings', {});
});

module.exports = router;