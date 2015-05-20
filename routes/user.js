/**
 * New node file
 */
// TODO serverside validation and alerts on client
var express = require('express');
var router = express.Router();
var User = require('../models/user/User');
var jwt = require('jsonwebtoken');
var userCtrl = require('../controller/User');

router.get('/signIn', function(req, res, next) {
  res.render('user/signIn', {});
});

router.get('/settings', userCtrl.verifyLogin, function(req, res, next) {
  res.render('user/settings', {});
});

router.param('user', function(req, res, next, id) {
  var query = User.findById(id);
  query.exec(function (err, user){
    if (err) { return next(err); }
    if (!user) { return next(new Error("can't find user")); }
    req.user = user;
    return next();
  });
});

router.post('/check', function(req, res, next) {
  User.findOne({username: req.body.username}, function(err, user) {
    if(err) { res.send(err); }
    else { res.json({success: true, available: !user}); }
  });
});

router.post('/signUp', function(req, res, next) {
  var user = new User(req.body.user);
  user.set('loggedIn', true);
  user.save(function(err, user){
    if(err){ res.send(err); }
    else {
      var token = jwt.sign({username: user.username, password: user.password}, 'test', {
        expiresInMinutes: 1440
      });
      res.json({success: true, token: token, userId: user._id});
    }
  });
});

router.post('/signIn', function(req, res, next) {
  User.findOne({username: req.body.username, password: req.body.password}, function(err, user) {
    if(err){ res.send(err); }
    else if(!user) {
      res.json({success: false, message: 'The username or password was wrong!'});
    } else {
      var token = jwt.sign({username: user.username, password: user.password}, 'test', {
        expiresInMinutes: 1440
      });
      User.findByIdAndUpdate(user._id, {loggedIn: true}, function() {
        res.json({success: true, token: token, userId: user._id});
      });
    }
  });
});

router.post('/signOut', function(req, res, next) {
  User.findByIdAndUpdate(req.body.userId, {loggedIn: false}, function() {
    res.sendStatus(200);
  });
});

router.get('/loggedIn', function(req, res) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, 'test', function(err, decoded) {
      if (err) {
        res.send(err); 
      } else {
        User.findOne({userId: decoded.userId, loggedIn: true}, function(err, user) {
          if(err){ res.send(err); }
          else if(!user) { res.json({success: false, message: 'Not logged in!'}); }
          else { res.json({success: true}); }
        });
      }
    });
  } else {
    res.json({success: false, message: 'No token is specified!'});
  }
});

router.get('/:user', userCtrl.verifyLogin, function(req, res, next) {
  res.json(req.user);
});

router.delete('/:user', userCtrl.verifyLogin, function(req, res, next) {
  req.user.remove(function(err) {
    if (err) { res.send(err); }
    else { res.json({success: true}); }
  });
});

router.put('/:user', userCtrl.verifyLogin, function(req, res, next) {
  
  // TODO aendern eines benutzers
  console.log(req);
});

router.post('/changePassword/:user', userCtrl.verifyLogin, function(req, res, next) {
  User.findByIdAndUpdate(req.user._id, {password: req.body.password}, function(err, user) {
    if(err){ res.send(err); }
    else {
      var token = jwt.sign({username: user.username, password: user.password}, 'test', {
        expiresInMinutes: 1440
      });
      res.json({success: true, token: token, userId: user._id});
    }
  })
});

module.exports = router;