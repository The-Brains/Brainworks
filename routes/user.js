/**
 * New node file
 */
var express = require('express');
var router = express.Router();


router.get('/signIn', function(req, res, next) {
  res.render('user/signIn', {});
});

router.get('/settings', function(req, res, next) {
  res.render('user/settings', {});
});

module.exports = router;