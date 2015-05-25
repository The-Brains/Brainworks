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

router.get('/about', function(req, res, next) {
  res.render('about', {});
});

module.exports = router;