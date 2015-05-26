/**
 * New node file
 */
var express = require('express');
var router = express.Router();
var userCtrl = require('../controller/user');
var Diagram = require('../models/diagrams/Diagram');
var User = require('../models/user/User');
var Comment = require('../models/daigrams/Comment');
var Shape = require('../models/daigrams/Shape');
var getRawBody = require('raw-body');
var fs = require("fs");

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
    cancel: 'Abbrechen',
    comments: 'Kommentare',
    dateFormat: 'dd.MM.yyyy HH:mm:ss'
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

router.get('/:diagramId', function(req, res, next) {
  User.findOne({'diagrams._id': req.params.diagramId}, function(err, user) {
    if(err) { res.send(err); }
    else {
      res.json(user.diagrams.id(req.params.diagramId));
    }
  });
});

router.delete('/:user/diagram/:diagramId', userCtrl.verifyLogin, function(req, res, next) {
  req.user.diagrams.id(req.params.diagramId).remove();
  req.user.save(function(err) {
    if(err) { res.send(err); }
    else {
      res.json({success: true});
    }
  });
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
    req.user.diagrams.push(new Diagram(req.body));
    req.user.save(function(err, user) {
      if(err) { res.send(err); }
      else {
        res.json({success: true, diagramId: user.diagrams[user.diagrams.length-1]._id});
      }
    });
  }
});

router.put('/:user/diagram/:diagramId/comment', userCtrl.verifyLogin, function(req, res, next) {
  User.findOne({'diagrams._id': req.params.diagramId}, function(err, foundUser) {
    if(err) { res.send(err); }
    else {
      var diagram = foundUser.diagrams.id(req.params.diagramId);
      diagram.comments.push(new Comment({text: req.body.text, author: req.user.username}));
      foundUser.save(function(err, user) {
        if(err) { res.send(err); }
        else {
          res.json({success: true, comment: diagram.comments[diagram.comments.length-1]});
        }
      });
    }
  });
});

router.post('/:user/diagram', userCtrl.verifyLogin, function(req, res, next) {
  if(req.headers['content-type'] === 'application/octet-stream') {
    getRawBody(req, {
      length: req.headers['content-length'],
      encoding: 'UTF-8'
    }, function (err, string) {
      if(err) { res.send(err); }
      else {
        var jsonData = JSON.parse(string);
        fs.writeFile('uploads/' + jsonData._id + '.png', new Buffer(jsonData.thumbnail.replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64'), function(err) {
          if(err) { res.send(err); }
          else {
            var diagram = req.user.diagrams.id(jsonData._id);
            diagram.thumbnail = req.protocol + '://' + req.get('host') + '/diagram/thumbnail/' + jsonData._id;
            // TODO neue shapes erstellen bzw. diese aktualisieren inkl. der relations
            diagram.shapes = jsonData.shapes;
            req.user.save(function(err, user) {
              if(err) { res.send(err); }
              else {
                res.json({success: true});
              }
            });
          }
        });
      }
    });
  }
});

router.get('/thumbnail/:imageId', function(req, res, next) {
  fs.readFile('uploads/'+req.params.imageId+'.png', function(err, data) {
    if (err) throw err;
    res.end(data, 'base64');
  });
});

module.exports = router;