var express = require('express');
var router = express.Router();

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

router.get('/about', function(req, res, next) {
  res.render('about', {});
});

module.exports = router;