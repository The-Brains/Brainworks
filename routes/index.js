/**
 * Definition der allgemeinen Routen
 */
var express = require('express');
var router = express.Router();

/**
 * Rendert das Grundkonstrukt mit den entpsrechenden Texten
 * @param {Object} req Das Objekt mit den Daten der Anfrage
 * @param {Object} res Das Objekt für die HTTP-Antwort
 * @param {Function} next Funktion zum Weiterleiten zur Bearbeitung der Anfrage
 */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Brainworks',
    home: 'Startseite',
    signIn: 'Einloggen',
    profile: 'Profil',
    about: 'Über',
    diagrams: 'Diagramme',
    logout: 'Ausloggen',
    settings: 'Einstellungen'
  });
});

/**
 * Rendert die Startseite mit den entsprechenden Texten
 * @param {Object} req Das Objekt mit den Daten der Anfrage
 * @param {Object} res Das Objekt für die HTTP-Antwort
 * @param {Function} next Funktion zum Weiterleiten zur Bearbeitung der Anfrage
 */
router.get('/home', function(req, res, next) {
  res.render('home', {
    paginationNext: 'Weiter',
    paginationPrevious: 'Zurück',
    paginationLast: 'Letzte',
    paginationFirst: 'Erste',
    search: 'Suche',
    viewDiagram: 'Diagramm ansehen'
  });
});

/**
 * Rendert die Seite für die Ansicht eines öffentlichen Diagramms mit den entsprechenden Texten
 * @param {Object} req Das Objekt mit den Daten der Anfrage
 * @param {Object} res Das Objekt für die HTTP-Antwort
 * @param {Function} next Funktion zum Weiterleiten zur Bearbeitung der Anfrage
 */
router.get('/publicDiagram', function(req, res, next) {
  res.render('diagram/publicDiagram', {
    back: 'Zurück',
    comment: 'Kommentar',
    fieldRequired: 'Dieses Feld ist ein Pflichtfeld.',
    addComment: 'Kommentieren',
    comments: 'Kommentare',
    dateFormat: 'dd.MM.yyyy HH:mm:ss'
  });
});

/**
 * Rendert die About-Seite
 * @param {Object} req Das Objekt mit den Daten der Anfrage
 * @param {Object} res Das Objekt für die HTTP-Antwort
 * @param {Function} next Funktion zum Weiterleiten zur Bearbeitung der Anfrage
 */
router.get('/about', function(req, res, next) {
  res.render('about', {});
});

module.exports = router;