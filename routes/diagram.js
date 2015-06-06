/**
 * Definition der Routen für das Diagrammmodul
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

/**
 * Rendern der Diagrammübersicht mit den passenden Texten
 * @param {Object} req Das Objekt mit den Daten der Anfrage
 * @param {Object} res Das Objekt für die HTTP-Antwort
 * @param {Function} next Funktion zum Weiterleiten zur Bearbeitung der Anfrage
 */
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

/**
 * Rendern der Seite für die Bearbeitung der Diagramminformationen mit den passenden Texten
 * @param {Object} req Das Objekt mit den Daten der Anfrage
 * @param {Object} res Das Objekt für die HTTP-Antwort
 * @param {Function} next Funktion zum Weiterleiten zur Bearbeitung der Anfrage
 */
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

/**
 * Rendern des Designers mit den passenden Texten
 * @param {Object} req Das Objekt mit den Daten der Anfrage
 * @param {Object} res Das Objekt für die HTTP-Antwort
 * @param {Function} next Funktion zum Weiterleiten zur Bearbeitung der Anfrage
 */
router.get('/designer', userCtrl.verifyLogin, function(req, res, next) {
  res.render('diagram/designer', {
    save: 'Speichern',
    back: 'Zurück',
    comments: 'Kommentare',
    dateFormat: 'dd.MM.yyyy HH:mm:ss'
  });
});

/**
 * Rendern des Templates für das Bearbeitungsdialog im Designer mit den passenden Texten
 * @param {Object} req Das Objekt mit den Daten der Anfrage
 * @param {Object} res Das Objekt für die HTTP-Antwort
 * @param {Function} next Funktion zum Weiterleiten zur Bearbeitung der Anfrage
 */
router.get('/attributesEditor', userCtrl.verifyLogin, function(req, res, next) {
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

/**
 * Parameter "user" in URLs in einen passenden Benutzer auflösen
 * @param {Object} req Das Objekt mit den Daten der Anfrage
 * @param {Object} res Das Objekt für die HTTP-Antwort
 * @param {Function} next Funktion zum Weiterleiten zur Bearbeitung der Anfrage
 * @param {string} id Die ID des Benutzers, welche als Parameter gesandt wurde
 */
router.param('user', function(req, res, next, id) {
  var query = User.findById(id);
  /**
   * Lädt den benötidten Nutzer. Liefert entsprechende Fehler, sofern welche bei der Suche auftreten.
   * @param {Object} err Das Objekt mit den Fehlerinformationen wenn ein Fehler auftritt
   * @param {Object} user Das Objekt des gefunden Benutzers
   */
  query.exec(function (err, user){
    if (err) { return next(err); }
    if (!user) { return next(new Error('can\'t find user')); }
    req.user = user;
    return next();
  });
});

/**
 * Beendet Anfrage mit dem Senden des zu nutzenden Datenpaketes für die Diagrammübersicht (mit den enthaltenen Diagrammen)
 * @param {Object} req Das Objekt mit den Daten der Anfrage
 * @param {Object} res Das Objekt für die HTTP-Antwort
 * @param {Function} next Funktion zum Weiterleiten zur Bearbeitung der Anfrage
 */
router.get('/:user/diagrams', userCtrl.verifyLogin, function(req, res, next) {
  res.json(req.user.diagrams);
});

/**
 * Sucht öffentliche Diagramme
 * @param {Object} req Das Objekt mit den Daten der Anfrage
 * @param {Object} res Das Objekt für die HTTP-Antwort
 * @param {Function} next Funktion zum Weiterleiten zur Bearbeitung der Anfrage
 */
router.get('/publicDiagrams', function(req, res, next) {
  /**
   * Liefert entsprechende Fehler, sofern welche bei der Suche auftreten,
   * oder lädt alle öffentlichen Nutzerdiagramme
   * @param {Object} err Das Objekt mit den Fehlerinformationen wenn ein Fehler auftritt
   * @param {Object} user Das Objekt der Benutzer mit vorhandenen öffentlichen Diagrammen
   */
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

/**
 * Beendet Anfrage mit dem Senden des zu nutzenden Datenpaketes für die Diagrammansicht im Designer
 * @param {Object} req Das Objekt mit den Daten der Anfrage
 * @param {Object} res Das Objekt für die HTTP-Antwort
 * @param {Function} next Funktion zum Weiterleiten zur Bearbeitung der Anfrage
 */
router.get('/:user/diagram/:diagramId', userCtrl.verifyLogin, function(req, res, next) {
  res.json(req.user.diagrams.id(req.params.diagramId));
});

/**
 * Beendet Anfrage mit dem Senden des zu nutzenden Datenpaketes für die Diagramminformationen
 * @param {Object} req Das Objekt mit den Daten der Anfrage
 * @param {Object} res Das Objekt für die HTTP-Antwort
 * @param {Function} next Funktion zum Weiterleiten zur Bearbeitung der Anfrage
 */
router.get('/:user/diagramInformation/:diagramId', userCtrl.verifyLogin, function(req, res, next) {
  res.json(req.user.diagrams.id(req.params.diagramId));
});

/**
 * Liefert das Diagramm für die angefragte ID
 * @param {Object} req Das Objekt mit den Daten der Anfrage
 * @param {Object} res Das Objekt für die HTTP-Antwort
 * @param {Function} next Funktion zum Weiterleiten zur Bearbeitung der Anfrage
 */
router.get('/:diagramId', function(req, res, next) {
  /**
   * Beendet Anfrage mit dem Senden des Diagramms für die passende ID, wenn kein Fehler dabei auftritt
   * @param {Object} err Das Objekt mit den Fehlerinformationen wenn ein Fehler auftritt
   * @param {Object} user Das Objekt des Authors des Diagrammes
   */
  User.findOne({'diagrams._id': req.params.diagramId}, function(err, user) {
    if(err) { res.send(err); }
    else {
      res.json(user.diagrams.id(req.params.diagramId));
    }
  });
});

/**
 * Löschen eines Diagrams
 * @param {Object} req Das Objekt mit den Daten der Anfrage
 * @param {Object} res Das Objekt für die HTTP-Antwort
 * @param {Function} next Funktion zum Weiterleiten zur Bearbeitung der Anfrage
 */
router['delete']('/:user/diagram/:diagramId', userCtrl.verifyLogin, function(req, res, next) {
  req.user.diagrams.id(req.params.diagramId).remove();
  /**
   * Beendet Anfrage mit einer Erfolgsmitteilung nach dem Löschen eines Diagramms
   * @param {Object} err Das Objekt mit den Fehlerinformationen wenn ein Fehler auftritt
   */
  req.user.save(function(err) {
    if(err) { res.send(err); }
    else {
      res.json({success: true});
    }
  });
});

/**
 * Fügt ein Diagramm hinzu oder aktualisiert die bestehenden Diagramminformationen
 * @param {Object} req Das Objekt mit den Daten der Anfrage
 * @param {Object} res Das Objekt für die HTTP-Antwort
 * @param {Function} next Funktion zum Weiterleiten zur Bearbeitung der Anfrage
 */
router.put('/:user/diagram', userCtrl.verifyLogin, function(req, res, next) {
  if(typeof req.body._id !== 'undefined') {
    var diagram = req.user.diagrams.id(req.body._id);
    diagram.name = req.body.name;
    diagram.description = req.body.description;
    diagram.isPublic = typeof req.body.isPublic !== 'undefined' ? req.body.isPublic : false;
    /**
     * Beendet Anfrage mit dem Senden der Diagramm-ID des Nutzers und mit einer Erfolgsmitteilung
     * @param {Object} err Das Objekt mit den Fehlerinformationen wenn ein Fehler auftritt
     */
    req.user.save(function(err) {
      if(err) { res.send(err); }
      else {
        res.json({success: true, diagramId: diagram._id});
      }
    });
  } else {
    req.user.diagrams.push(new Diagram(req.body));
    /**
     * Beendet Anfrage mit dem Senden der Diagramm-ID des neu erstellten Diagramms des Nutzers und mit einer Erfolgsmitteilung
     * @param {Object} err Das Objekt mit den Fehlerinformationen wenn ein Fehler auftritt
     * @param {Object} user Das Objekt des Benutzers an welchem das neue Diagramm gespeichert wurde
     */
    req.user.save(function(err, user) {
      if(err) { res.send(err); }
      else {
        res.json({success: true, diagramId: user.diagrams[user.diagrams.length-1]._id});
      }
    });
  }
});

/**
 * Fügt zu einem bestimment Diagramm ein Kommentar hinzu
 * @param {Object} req Das Objekt mit den Daten der Anfrage
 * @param {Object} res Das Objekt für die HTTP-Antwort
 * @param {Function} next Funktion zum Weiterleiten zur Bearbeitung der Anfrage
 */
router.put('/:user/diagram/:diagramId/comment', userCtrl.verifyLogin, function(req, res, next) {
  /**
   * Sucht den Author des kommentierten Diagramms
   * @param {Object} err Das Objekt mit den Fehlerinformationen wenn ein Fehler auftritt
   * @param {Object} foundUser Das Objekt des Authors
   */
  User.findOne({'diagrams._id': req.params.diagramId}, function(err, foundUser) {
    if(err) { res.send(err); }
    else {
      var diagram = foundUser.diagrams.id(req.params.diagramId);
      diagram.comments.push(new Comment({text: req.body.text, author: req.user.username}));
      /**
       * Beendet Anfrage mit dem Senden des erstellten Kommentars des Nutzers und mit einer Erfolgsmitteilung
       * @param {Object} err Das Objekt mit den Fehlerinformationen wenn ein Fehler auftritt
       * @param {Object} user Das Objekt des Authors des Diagrammes, welches kommentiert wurde
       */
      foundUser.save(function(err, user) {
        if(err) { res.send(err); }
        else {
          res.json({success: true, comment: diagram.comments[diagram.comments.length-1]});
        }
      });
    }
  });
});

/**
 * Speichert ein Diagramm nach dem Bearbeiten im Designer
 * @param {Object} req Das Objekt mit den Daten der Anfrage
 * @param {Object} res Das Objekt für die HTTP-Antwort
 * @param {Function} next Funktion zum Weiterleiten zur Bearbeitung der Anfrage
 */
router.post('/:user/diagram', userCtrl.verifyLogin, function(req, res, next) {
  var requestDiagram = JSON.parse(req.body.diagram);
  var diagram = req.user.diagrams.id(requestDiagram._id);
  /**
   * Speichert das erstellte Thumbnail in den "uploads"-Ordner
   * @param {Object} err Das Objekt mit den Fehlerinformationen wenn ein Fehler auftritt
   */
  fs.writeFile('uploads/' + requestDiagram._id + '.png', new Buffer(req.body.thumbnail.replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64'), function(err) {
    if(err) { res.send(err); }
    else {
      diagram.thumbnail = req.protocol + '://' + req.get('host') + '/diagram/thumbnail/' + requestDiagram._id;
      var shapes = [];
      for(var i = 0; i<requestDiagram.shapes.length; i++) {
        shapes.push(Shape.hasOwnProperty(requestDiagram.shapes[i]._type) ? new Shape[requestDiagram.shapes[i]._type](requestDiagram.shapes[i]) : new Relation[requestDiagram.shapes[i]._type](requestDiagram.shapes[i]));
      }
      diagram.shapes = shapes;
      diagram.elementId = requestDiagram.elementId;
      /**
       * Speichert die Änderungen am Diagramm und sendet eine Antwort an den Client
       * @param {Object} err Das Objekt mit den Fehlerinformationen wenn ein Fehler auftritt
       * @param {Object} user Das Objekt des Benutzers, an welchem die Änderungen gespeichert wurden
       */
      req.user.save(function(err, user) {
        if(err) { res.send(err); }
        else {
          res.json({success: true});
        }
      });
    }
  });
});

/**
 * Lädt das Vorschaubild zur entsprechenden ID des Bildes
 * @param {Object} req Das Objekt mit den Daten der Anfrage
 * @param {Object} res Das Objekt für die HTTP-Antwort
 * @param {Function} next Funktion zum Weiterleiten zur Bearbeitung der Anfrage
 */
router.get('/thumbnail/:imageId', function(req, res, next) {
  /**
   * Prüft die Existenz des Vorschaubildes
   * @param {boolean} exists Wahrheitswert, ob das Bild vorhanden ist oder nicht
   */
  fs.exists('uploads/'+req.params.imageId+'.png', function(exists) {
    if (!exists) { res.sendStatus(404); }
    else {
      /**
       * Auslesen der Bilddaten
       * @param {Object} err Das Objekt mit den Fehlerinformationen wenn ein Fehler auftritt
       * @param {Object} data Die Daten des Bildes
       */
      fs.readFile('uploads/'+req.params.imageId+'.png', function(err, data) {
        if (err) { res.send(err); }
        /* Sendet Header mit, damit die Bilder nicht im Cache gespeichert werden und immer wieder
         * vom Server angefragt werden, sodass das aktuelle Bild in der Übersicht angezeigt wird */
        res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.setHeader('Expires', '-1');
        res.setHeader('Pragma', 'no-cache');
        res.end(data, 'base64');
      });
    }
  });
});

module.exports = router;