var express = require('express');
var router = express.Router();

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
  res.render('home', {
  });
});

router.get('/sign_in', function(req, res, next) {
  res.render('sign_in', {
  });
});

router.get('/diagrams', function(req, res, next) {
  res.render('diagrams', {
  });
});

router.get('/settings', function(req, res, next) {
  res.render('settings', {
  });
});

router.get('/about', function(req, res, next) {
  res.render('about', {
  });
});

module.exports = router;