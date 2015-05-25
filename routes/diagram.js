/**
 * New node file
 */
var express = require('express');
var router = express.Router();
var userCtrl = require('../controller/user');
var Diagram = require('../models/diagrams/Diagram');
var User = require('../models/user/User');

router.get('/diagrams', userCtrl.verifyLogin, function(req, res, next) {
  res.render('diagram/diagrams', {
    diagrams: 'Diagramme',
    paginationNext: 'Weiter',
    paginationPrevious: 'Zurück',
    paginationLast: 'Letzte',
    paginationFirst: 'Erste',
    search: 'Suche',
    addDiagram: 'Diagramm hinzufügen',
    updateInformation: 'Informationen aktualisieren',
    editDiagram: 'Diagramm Bearbeiten',
    deleteDiagram: 'Diagramm löschen'
  });
});

router.get('/diagramInformation', userCtrl.verifyLogin, function(req, res, next) {
  res.render('diagram/diagramInformation', {
    title: 'Titel',
    description: 'Beschreibung',
    publicDiagram: 'Öffentliches Diagramm',
    save: 'Speichern',
    cancel: 'Abbrechen',
    fieldRequired: 'Dieses Feld ist ein Pflichtfeld.'
  });
});

router.get('/designer', userCtrl.verifyLogin, function(req, res, next) {
  res.render('diagram/designer', {
    save: 'Speichern',
    cancel: 'Abbrechen'
  });
});

router.param('user', function(req, res, next, id) {
  var query = User.findById(id);
  query.exec(function (err, user){
    if (err) { return next(err); }
    if (!user) { return next(new Error("can't find user")); }
    req.user = user;
    return next();
  });
});

router.get('/:user/diagrams', userCtrl.verifyLogin, function(req, res, next) {
  res.json(req.user.diagrams);
});

router.get('/publicDiagrams', function(req, res, next) {
  User.find({'diagrams.isPublic': true}, function(err, users) {
    if(err) { res.send(err); }
    else {
      var diagrams = [];
      for(var i=0; i<users.length; i++) {
        for(var j=0; j<users[i].diagrams.length; j++) {
          if(users[i].diagrams[j].isPublic) {
            diagrams.push(users[i].diagrams[j]);
          }
        }
      }
      res.json({success: true, diagrams: diagrams});
    }
  });
});

router.get('/:user/diagram/:diagramId', userCtrl.verifyLogin, function(req, res, next) {
  res.json(req.user.diagrams.id(req.params.diagramId));
});

router.get('/:user/diagramInformation/:diagramId', userCtrl.verifyLogin, function(req, res, next) {
  res.json(req.user.diagrams.id(req.params.diagramId));
});

router.put('/:user/diagram', userCtrl.verifyLogin, function(req, res, next) {
  if(typeof req.body._id !== 'undefined') {
    var diagram = req.user.diagrams.id(req.body._id);
    diagram.name = req.body.name;
    diagram.description = req.body.description;
    diagram.isPublic = typeof req.body.isPublic !== 'undefined' ? req.body.isPublic : false;
    req.user.save(function(err) {
      if(err) { res.send(err); }
      else {
        res.json({success: true, diagramId: diagram._id});
      }
    });
  } else {
    req.user.diagrams.push(req.body);
    req.user.save(function(err, user) {
      if(err) { res.send(err); }
      else {
        res.json({success: true, diagramId: user.diagrams[user.diagrams.length-1]._id});
      }
    });
  }
});

module.exports = router;