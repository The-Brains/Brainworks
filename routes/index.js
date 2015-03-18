var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Brainworks',
    home: 'Startseite',
    sign_in: 'Einloggen',
    profile: 'Profil',
    about: 'Über'
  });
});

router.get('/home', function(req, res, next) {
  res.render('home', {
  });
});

router.get('/sign_in', function(req, res, next) {
  res.render('sign_in', {
  });
});

router.get('/about', function(req, res, next) {
  res.render('about', {
  });
});

module.exports = router;