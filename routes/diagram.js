/**
 * New node file
 */
var express = require('express');
var router = express.Router();
var userCtrl = require('../controller/user');
var Diagram = require('../models/diagrams/Diagram');

router.get('/diagrams', userCtrl.verifyLogin, function(req, res, next) {
  res.render('diagram/diagrams', {});
});

router.get('/diagramInformation', userCtrl.verifyLogin, function(req, res, next) {
  res.render('diagram/diagramInformation', {});
});

router.get('/designer', userCtrl.verifyLogin, function(req, res, next) {
  res.render('diagram/designer', {});
});

router.param('diagram', function(req, res, next, id) {
  var query = Diagram.findById(id);
  query.exec(function (err, diagram) {
    if (err) { return next(err); }
    if (!diagram) { return next(new Error("can't find diagram")); }
    req.diagram = diagram;
    return next();
  });
});

router.get('/diagrams/:userId', userCtrl.verifyLogin, function(req, res, next) {
  Diagram.find({authorId: req.params.userId}, 'authorId _id name description isPublic', function(err, diagrams) {
    if(err) { res.send(err); }
    else {
      res.json({success: true, diagrams: diagrams});
    }
  })
});

router.get('/diagramInformation/:diagram', userCtrl.verifyLogin, function(req, res, next) {
  res.json(req.diagram);
});

router.put('/diagram', userCtrl.verifyLogin, function(req, res, next) {
  console.log(req);
  if(typeof req.body._id !== 'undefined') {
    Diagram.findByIdAndUpdate(req.body._id, req.body, function(err, diagram) {
      res.json({success: true, diagramId: diagram._id});
    });
  } else {
    var diagram = new Diagram(req.body);
    diagram.save(function(err, diagram) {
      if(err) { res.send(err); }
      else {
        res.json({success: true, diagramId: diagram._id});
      }
    });
  }
});

module.exports = router;