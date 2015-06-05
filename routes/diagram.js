/**
 * Datenhalter von statischen Variablen für Diagrammseiten.
 * Rendern der Oberfläche
 */
var express = require('express');
var router = express.Router();
var userCtrl = require('../controller/user');
var Diagram = require('../models/diagrams/Diagram');
var User = require('../models/user/User');
var Comment = require('../models/diagrams/Comment');
var Shape = require('../models/diagrams/Shape');
var Relation = require('../models/diagrams/Relation');
var fs = require('fs');

router.get('/diagrams', userCtrl.verifyLogin,
  /**
   * Definition der Textelemente in der Diagrammübersicht
   * Zeichnen der Elemente
   * @param req
   * @param res
   * @param next
   */
  function(req, res, next) {
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

router.get('/diagramInformation', userCtrl.verifyLogin,
  /**
   * Definition der Textelemente in den Diagramminformationen
   * Zeichnen der Elemente
   * @param req
   * @param res
   * @param next
   */
  function(req, res, next) {
  res.render('diagram/diagramInformation', {
    title: 'Titel',
    description: 'Beschreibung',
    publicDiagram: 'Öffentliches Diagramm',
    save: 'Speichern',
    cancel: 'Abbrechen',
    fieldRequired: 'Dieses Feld ist ein Pflichtfeld.'
  });
});

router.get('/designer', userCtrl.verifyLogin,
  /**
   * Definition der Textelemente des Designers
   * Zeichenen der Elemente
   * @param req
   * @param res
   * @param next
   */
  function(req, res, next) {
  res.render('diagram/designer', {
    save: 'Speichern',
    back: 'Zurück',
    comments: 'Kommentare',
    dateFormat: 'dd.MM.yyyy HH:mm:ss'
  });
});

router.get('/attributesEditor', userCtrl.verifyLogin,
  /**
   * Definition der Textelemente des Eigenschafteneditors
   * Zeichenen der Elemente
   * @param req
   * @param res
   * @param next
   */
  function(req, res, next) {
  res.render('diagram/attributesEditor', {
    title: 'Eigenschaften ändern',
    renameTitle: 'Namen ändern',
    renameAttributes: 'Attribute ändern',
    renameMethods: 'Methoden ändern',
    buttonSave: 'Speichern',
    buttonCancel: 'Abbrechen',
    changeMultiplicityA: 'Kardinalität A ändern',
    changeMultiplicityB: 'Kardinalität B ändern'
  });
});

router.param('user',
  /**
   * Sucht und bestimmt den benötigten User anhand seiner Id
   * @param req
   * @param res
   * @param next
   * @param id
   */
  function(req, res, next, id) {
  var query = User.findById(id);
  query.exec(
    /**
     * Liefert entsprechende Fehler, sofern welche bei der Suche auftreten.
     * @param err
     * @param user
     */
    function (err, user){
    if (err) { return next(err); }
    if (!user) { return next(new Error('can\'t find user')); }
    req.user = user;
    return next();
  });
});

router.get('/:user/diagrams', userCtrl.verifyLogin,
  /**
   * Beendet Anfrage mit dem Senden des zu nutzenden Datenpaketes für die Diagrammübersicht (mit den enthaltenen Diagrammen)
   * @param req
   * @param res
   * @param next
   */
  function(req, res, next) {
  res.json(req.user.diagrams);
});

router.get('/publicDiagrams',
  /**
   * Sucht öffentliche Diagramme
   * @param req
   * @param res
   * @param next
   */
  function(req, res, next) {
  User.find({'diagrams.isPublic': true},
    /**
     * Liefert entsprechende Fehler, sofern welche bei der Suche auftreten,
     * oder lädt alle öffentlichen Nutzerdiagramme
     * @param err
     * @param user
     */
    function(err, users) {
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

router.get('/:user/diagram/:diagramId', userCtrl.verifyLogin,
  /**
   * Beendet Anfrage mit dem Senden des zu nutzenden Datenpaketes für die Diagrammansicht im Designer (von dem die diagramId benötigt wird)
   * @param req
   * @param res
   * @param next
   */
  function(req, res, next) {
  res.json(req.user.diagrams.id(req.params.diagramId));
});

router.get('/:user/diagramInformation/:diagramId', userCtrl.verifyLogin,
  /**
   * Beendet Anfrage mit dem Senden des zu nutzenden Datenpaketes für die Diagramminformationen (von dem die diagramId benötigt wird)
   * @param req
   * @param res
   * @param next
   */
  function(req, res, next) {
  res.json(req.user.diagrams.id(req.params.diagramId));
});

router.get('/:diagramId',
  /**
   * Liefert die DiagrammId für den Router
   * @param req
   * @param res
   * @param next
   */
  function(req, res, next) {
  User.findOne({'diagrams._id': req.params.diagramId},
    /**
     * Beendet Anfrage mit dem Senden derbenötigten diagrammId des Nutzers, wenn kein Fehler dabei auftritt
     * @param err
     * @param user
     */
    function(err, user) {
    if(err) { res.send(err); }
    else {
      res.json(user.diagrams.id(req.params.diagramId));
    }
  });
});

router['delete']('/:user/diagram/:diagramId', userCtrl.verifyLogin,
  /**
   * Löschen eines Diagrams
   * @param req
   * @param res
   * @param next
   */
  function(req, res, next) {
  req.user.diagrams.id(req.params.diagramId).remove();
  req.user.save(
    /**
     * Beendet Anfrage mit einer Erfolgsmitteilung nach dem Löschen eines Diagramms
     * @param err
     * @param user
     */
    function(err) {
    if(err) { res.send(err); }
    else {
      res.json({success: true});
    }
  });
});

router.put('/:user/diagram', userCtrl.verifyLogin,
  /**
   * Übermittelt bei Erfolg entsprechende Mitteilung und die benötigte DiagrammId
   * Legt anhand der DiagrammId fest, ob ein Diagramm öffentlich oder privat ist
   * @param req
   * @param res
   * @param next
   */
  function(req, res, next) {
  if(typeof req.body._id !== 'undefined') {
    var diagram = req.user.diagrams.id(req.body._id);
    diagram.name = req.body.name;
    diagram.description = req.body.description;
    diagram.isPublic = typeof req.body.isPublic !== 'undefined' ? req.body.isPublic : false;
    req.user.save(
      /**
       * Beendet Anfrage mit dem Senden der benötigten diagrammId des Nutzers und mit einer Erfolgsmitteilung
       * @param err
       * @param user
       */
      function(err) {
      if(err) { res.send(err); }
      else {
        res.json({success: true, diagramId: diagram._id});
      }
    });
  } else {
    req.user.diagrams.push(new Diagram(req.body));
    req.user.save(
      /**
       * Beendet Anfrage mit dem Senden der diagrammId des neu erstellten Diagramms des Nutzers und mit einer Erfolgsmitteilung
       * @param err
       * @param user
       */
      function(err, user) {
      if(err) { res.send(err); }
      else {
        res.json({success: true, diagramId: user.diagrams[user.diagrams.length-1]._id});
      }
    });
  }
});

router.put('/:user/diagram/:diagramId/comment', userCtrl.verifyLogin,
  /**
   * Lädt zu einem bestimment Diagramm entsprechenden Kommentar
   * @param req
   * @param res
   * @param next
   */
  function(req, res, next) {
  User.findOne({'diagrams._id': req.params.diagramId},
    /**
     * Stellt zu einem bestimment Diagramm entsprechenden Kommentar her
     * @param err
     * @param foundUser
     */
    function(err, foundUser) {
    if(err) { res.send(err); }
    else {
      var diagram = foundUser.diagrams.id(req.params.diagramId);
      diagram.comments.push(new Comment({text: req.body.text, author: req.user.username}));
      foundUser.save(
        /**
         * Beendet Anfrage mit dem Senden der Id des geladenen Kommentars des Nutzers und mit einer Erfolgsmitteilung
         * @param err
         * @param user
         */
        function(err, user) {
        if(err) { res.send(err); }
        else {
          res.json({success: true, comment: diagram.comments[diagram.comments.length-1]});
        }
      });
    }
  });
});

router.post('/:user/diagram', userCtrl.verifyLogin,
  /**
   * Ersetzt das Standartbild in der Diagrammübersicht
   * @param req
   * @param res
   * @param next
   */
  function(req, res, next) {
  var requestDiagram = JSON.parse(req.body.diagram);
  var diagram = req.user.diagrams.id(requestDiagram._id);
  fs.writeFile('uploads/' + requestDiagram._id + '.png', new Buffer(req.body.thumbnail.replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64'),
    /**
     * Lädt die verwendeten Elemente in das Vorschaubild
     * @param err
     */
    function(err) {
    if(err) { res.send(err); }
    else {
      diagram.thumbnail = req.protocol + '://' + req.get('host') + '/diagram/thumbnail/' + requestDiagram._id;
      var shapes = [];
      for(var i = 0; i<requestDiagram.shapes.length; i++) {
        shapes.push(Shape.hasOwnProperty(requestDiagram.shapes[i]._type) ? new Shape[requestDiagram.shapes[i]._type](requestDiagram.shapes[i]) : new Relation[requestDiagram.shapes[i]._type](requestDiagram.shapes[i]));
      }
      diagram.shapes = shapes;
      diagram.elementId = requestDiagram.elementId;
      req.user.save(
        /**
         * Beendet Anfrage mit dem Senden einer Erfolgsmitteilung
         * @param err
         * @param user
         */
        function(err, user) {
        if(err) { res.send(err); }
        else {
          res.json({success: true});
        }
      });
    }
  });
});

router.get('/thumbnail/:imageId',
  /**
   * Lädt das Vorschaubild zur entsprechenden Id des Bildes
   * @param req
   * @param res
   * @param next
   */
  function(req, res, next) {
  fs.exists('uploads/'+req.params.imageId+'.png',
    /**
     * Prüft die Existenz des Vorschaubildes
     * @param exists
     */
    function(exists) {
    if (!exists) { res.sendStatus(404); }
    else {
      fs.readFile('uploads/'+req.params.imageId+'.png',
        /**
         * Auslesen der Bilddaten
         * @param err
         * @param data
         */
        function(err, data) {
        if (err) res.send(err);
        /* muss evtl. gesetzt werden, damit nahezu alle Browser unsere http Cache Direktiven akzeptieren
         * (Es wirde nicht mit konventionellen Seiten gearbeitet, sondern mit dem Stateprovider und dem URLRouterProvider) */
        res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.setHeader('Expires', '-1');
        res.setHeader('Pragma', 'no-cache');
        res.end(data, 'base64');
      });
    }
  });
});

module.exports = router;