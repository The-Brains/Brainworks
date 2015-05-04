var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('User');

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Brainworks',
    home: 'Startseite',
    sign_in: 'Einloggen',
    profile: 'Profil',
    about: 'Über',
    diagrams: 'Diagramme',
    logout: 'Ausloggen',
    settings: 'Einstellungen'
  });
});

router.get('/home', function(req, res, next) {
  res.render('home', {});
});

router.get('/sign_in', function(req, res, next) {
  res.render('sign_in', {});
});

router.get('/diagrams', function(req, res, next) {
  res.render('diagrams', {});
});

router.get('/settings', function(req, res, next) {
  res.render('settings', {});
});

router.get('/about', function(req, res, next) {
  res.render('about', {});
});

router.post('/checkLogin', function(req, res, next) {
  var username = req.body.username;
  var password= req.body.password;
  
  var query = user.findOne({username: username, password: password});
  query.exec(function (error, user) {
    if (error) res.status(500).json({failure: "The query couldn't find the data:\n" + error});
    if (!user) res.status(500).json({failure: "You weren't connected! Wrong username or password."});
    else {
      res.status(200).json({success: "You were logged in!"});
    }
  });
});

router.post('/signUp', function(req, res, next) {
  var contents = req.body;
    
  var search = user.findOne({username: contents.username});
  search.exec(function (error, user) {
    if (error) res.status(500).json({failure: "An error has occured:\t" + error});
    if (user) res.status(500).json({failure: "Username is already forgiven!\nPlease choose another username."});
    else {
      var query = user.create({
        forename: forename, 
        surname: surname, 
        username: username,
        email: email,
        password: password
      });
  
      query.exec(function (error, user) {
        if (error) res.status(500).json({failure: "The query couldn't find the data:\n" + error});
        if (!user) res.status(500).json({failure: "Your data couldn't inserted to the database!"});
        else {
          res.status(200).json({success: "You were signed up!"});
          
        }
      });
    }
  });
});

module.exports = router;