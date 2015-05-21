/**
 * New node file
 */
var express = require('express');
var router = express.Router();
var userCtrl = require('../controller/user');


router.get('/diagrams', userCtrl.verifyLogin, function(req, res, next) {
  res.render('diagram/diagrams', {});
});

router.get('/diagramInformation', userCtrl.verifyLogin, function(req, res, next) {
  res.render('diagram/diagramInformation', {});
});

router.get('/designer', userCtrl.verifyLogin, function(req, res, next) {
  res.render('diagram/designer', {});
});

module.exports = router;