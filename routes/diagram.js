/**
 * New node file
 */
var express = require('express');
var router = express.Router();

router.get('/diagrams', function(req, res, next) {
  res.render('diagram/diagrams', {});
});

router.get('/designer', function(req, res, next) {
  res.render('diagram/designer', {});
});

module.exports = router;