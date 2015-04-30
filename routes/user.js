/**
 * New node file
 */
var express = require('express');
var router = express.Router();


router.get('/sign_in', function(req, res, next) {
  res.render('user/sign_in', {});
});

router.get('/settings', function(req, res, next) {
  res.render('user/settings', {});
});

module.exports = router;