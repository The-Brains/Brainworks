var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Home'
  });
});

router.get('/home', function(req, res, next) {
  res.render('home', {
    title: 'Home'
  });
});

router.get('/sign_in', function(req, res, next) {
  res.render('sign_in', {
    title: 'Sign in'
  });
});

router.get('/about', function(req, res, next) {
  res.render('about', {
    title: 'About'
  });
});

module.exports = router;