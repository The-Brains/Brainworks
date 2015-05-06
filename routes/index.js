var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/brainworks/user/');

require('../routes/userRoutes')(router); // Routing of User

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

/* router.post('/checkLogin', function(req, res, next) {
  var contents = req.body;
  
  var query = user.findOne({username: contents.username, password: contents.password});
  query.exec(function (error, user) {
    if (error) res.status(500).json({failure: "The query couldn't find the data:\n" + error});
    if (!user) res.status(500).json({failure: "You weren't connected! Wrong username or password."});
    else res.status(200).json({success: "You were logged in!"});
  });
});

router.post('/signUp', function(req, res, next) {
  var contents = req.body;
    
  var search = user.findOne({username: contents.username});
  search.exec(function (error, user) {
    if (error) res.status(500).json({failure: "An error has occured:\t" + error});
    if (user) res.status(500).json({failure: "Username is already forgiven!\nPlease choose another username."});
    else {
//      var newUser = user({
//        forename: contents.forename, 
//        surname: contents.surname, 
//        username: contents.username,
//        email: contents.email,
//        password: contents.password
//      });
//  
//      newUser.save(function (error) {
//        if (error) res.status(500).json({failure: "Your data couldn't inserted into the database:\n" + error});
//        else res.status(200).json({success: "You were signed up!"});
//      });
      
      res.status(200).json({success: "You were signed up!"});
    }
  });
}); */

module.exports = router;