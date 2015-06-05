/**
 * Datenhalter von statischen Variablen für die Startseite und die Navigation.
 * Rendern der Oberfläche
 */
var express = require('express');
var router = express.Router();

router.get('/',
  /**
   * Definition der Textelemente in der Navigationsbar
   * Zeichnen der Elemente
   * @param {Object} req
   * @param {Object} res
   * @param {variable} next
   */
  function(req, res, next) {
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

router.get('/home',
  /**
   * Definition der Textelemente in der Startseite
   * Zeichnen der Elemente
   * @param {Object} req
   * @param {Object} res
   * @param {variable} next
   */
  function(req, res, next) {
  res.render('home', {
    paginationNext: 'Weiter',
    paginationPrevious: 'Zurück',
    paginationLast: 'Letzte',
    paginationFirst: 'Erste',
    search: 'Suche',
    viewDiagram: 'Diagramm ansehen'
  });
});

router.get('/publicDiagram',
  /**
   * Definition der Textelemente in der Ansicht eines öffentlichen Diagramms
   * Zeichnen der Elemente
   * @param {Object} req
   * @param {Object} res
   * @param {variable} next
   */
  function(req, res, next) {
  res.render('diagram/publicDiagram', {
    back: 'Zurück',
    comment: 'Kommentar',
    fieldRequired: 'Dieses Feld ist ein Pflichtfeld.',
    addComment: 'Kommentieren',
    comments: 'Kommentare',
    dateFormat: 'dd.MM.yyyy HH:mm:ss'
  });
});

router.get('/about',
  /**
   * Definition des Textelementes in der Ansicht des About(Über) Bereiches
   * Zeichnen des Elementes
   * @param {Object} req
   * @param {Object} res
   * @param {variable} next
   */
  function(req, res, next) {
  res.render('about', {});
});

module.exports = router;