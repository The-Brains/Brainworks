/**
 * Definition der Routen für das Benutzermodul
 */
var express = require('express');
var router = express.Router();
var User = require('../models/user/User');
var jwt = require('jsonwebtoken');
var userCtrl = require('../controller/User');
var configuration = require('../config.json');

/**
 * Rendern der Login-Seite mit den passenden Texten
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
router.get('/signIn', function(req, res, next) {
  res.render('user/signIn', {
    signUp: 'Registrieren',
    or: 'oder',
    signIn: 'Einloggen',
    forename: 'Vorname',
    surname: 'Nachname',
    username: 'Benutzername',
    email: 'E-Mail',
    password: 'Passwort',
    fieldRequired: 'Dieses Feld ist ein Pflichtfeld.',
    checkingUsername: 'Prüfe ob Benutzername verfügbar ist...',
    usernameUnavailable: 'Der Benutzername ist schon vorhanden.',
    usernameAvailable: 'Der Benutzername ist verfügbar.',
    emailInvalid: 'Die E-Mail ist falsch.',
    emailConfirmation: 'E-Mail bestätigen',
    emailNotMatch: 'Die E-Mails stimmen nicht überein. Erneut versuchen?',
    passwordConfirmation: 'Passwort bestätigen',
    passwordNotMatch: 'Die Passwörter stimmen nicht überein. Erneut versuchen?'
  });
});

/**
 * Rendern der Seite für die Profileinstellungen mit den passenden Texten
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
router.get('/settings', userCtrl.verifyLogin, function(req, res, next) {
  res.render('user/settings', {
    accountSettings: 'Profileinstellungen',
    forename: 'Vorname',
    surname: 'Nachname',
    username: 'Benutzername',
    email: 'E-Mail',
    save: 'Speichern',
    changePassword: 'Passwort ändern',
    currentPassword: 'Aktuelles Passwort',
    newPassword: 'Neues Passwort',
    newPasswordConfirmation: 'Neues Password bestätigen',
    deleteAccount: 'Profil löschen',
    fieldRequired: 'Dieses Feld ist ein Pflichtfeld.',
    emailInvalid: 'Die E-Mail ist falsch.',
    actualPasswordNotMatch: 'Das Passwort stimmt mit dem aktuellen nicht überein. Erneut versuchen?',
    passwordNotMatch: 'Die Passwörter stimmen nicht überein. Erneut versuchen?',
    deleteInformation: '*<sup>1</sup> Warnung:<br />Ihr Profil wird entgültig gelöscht. Es werden auch alle Diagramme<br />engültig gelöscht. Bitte sichern Sie sich umgehend Ihre Diagramme.',
    deleteConfirmation: 'Ja, ich will mein Profil endgültig löschen. Ich habe auch die <br /> Informationen aus *<sup>1</sup> gelesen und bin damit einverstanden.'
  });
});

/**
 * Parameter "user" in URLs in einen passenden Benutzer auflösen
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @param {string} id
 */
router.param('user', function(req, res, next, id) {
  var query = User.findById(id);
  /**
   * Lädt den benötidten Nutzer. Liefert entsprechende Fehler, sofern welche bei der Suche auftreten.
   * @param {Object} err
   * @param {Object} user
   */
  query.exec(function (err, user){
    if (err) { return next(err); }
    if (!user) { return next(new Error('can\'t find user')); }
    req.user = user;
    return next();
  });
});

/**
 * Prüfen der Verfügbarkeit eines bestimmten Nutzernamens
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
router.post('/check', function(req, res, next) {
  /**
   * Beendet die Anfrage mit dem Senden einer Erfolgsmitteilung und einer Meldung, ob der Benutzername verfügbar ist oder nicht
   * @param {Object} err
   * @param {Object} user
   */
  User.findOne({username: req.body.username}, function(err, user) {
    if(err) { res.send(err); }
    else { res.json({success: true, available: !user}); }
  });
});

/**
 * Registration eines Benutzers
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
router.post('/signUp', function(req, res, next) {
  var user = new User(req.body.user);
  user.set('loggedIn', true);
  /**
   * Beendet die Anfrage mit dem Senden einer Erfolgsmitteilung, einem signierten Token und der NutzerID
   * @param {Object} err
   * @param {Object} user
   */
  user.save(function(err, user){
    if(err){ res.send(err); }
    else {
      var token = jwt.sign({username: user.username, password: user.password}, configuration.secret, configuration.tokenConfig);
      res.json({success: true, token: token, userId: user._id});
    }
  });
});

/**
 * Prüfen des Logins
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
router.post('/signIn', function(req, res, next) {
  /**
   * Prüfung auf Richtigkeit des Benutzernamens und Passworts. Signierung das Tokens, falls dieser korrekt ist.
   * @param {Object} err
   * @param {Object} user
   */
  User.findOne({username: req.body.username, password: req.body.password}, function(err, user) {
    if(err){ res.send(err); }
    else if(!user) {
      res.json({success: false, message: 'Das Passwort oder der Benutzername ist falsch!'});
    } else {
      var token = jwt.sign({username: user.username, password: user.password}, configuration.secret, configuration.tokenConfig);
      /**
       * Setz den Loginflag am Benutzer und beendet die Anfrage mit dem Senden
       * einer Erfolgsmitteilung, einem signierten Token und der NutzerID
       */
      User.findByIdAndUpdate(user._id, {loggedIn: true}, function() {
        res.json({success: true, token: token, userId: user._id});
      });
    }
  });
});

/**
 * Ausloggen des bestimmten Benutzers
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
router.post('/signOut', function(req, res, next) {
  /**
   * Loginflag wird entfernt und das Ergebnis der Anfrage wird in der Antwort übertragen.
   */
  User.findByIdAndUpdate(req.body.userId, {loggedIn: false}, function() {
    res.sendStatus(200);
  });
});

/**
 * Prüft ob ein Benutzer eingeloggt ist
 * @param {Object} req
 * @param {Object} res
 */
router.get('/loggedIn', function(req, res) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    /**
     * Verifiziert das mitgesandte Token
     * @param {Object} err
     * @param {Object} decoded
     */
    jwt.verify(token, configuration.secret, function(err, decoded) {
      if (err) {
        res.send(err);
      } else {
        /**
         * Prüft, ob entschlüsselte Benutzer mit einem gesetzten Loginflag vorhanden ist und sendte eine entsprechende Antwort
         * @param {Object} err
         * @param {Object} user
         */
        User.findOne({userId: decoded.userId, loggedIn: true}, function(err, user) {
          if(err){ res.send(err); }
          else if(!user) { res.json({success: false, message: 'Not logged in!'}); }
          else { res.json({success: true}); }
        });
      }
    });
  } else {
    res.json({success: false, message: 'No token is specified!'});
  }
});

/**
 * Route für holen der Benutzerinformationen
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
router.get('/:user', userCtrl.verifyLogin, function(req, res, next) {
  res.json(req.user);
});

/**
 * Löscht das Nutzerprofil und prüft das dabei die Auswahl des Bestätigungsfeldes
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
router.post('/delete/:user', userCtrl.verifyLogin, function(req, res, next) {
  if(!req.body.assignment) {
    res.json({success: false, message: 'Bitte bestätigen Sie die Löschung Ihres Profils!'});
  } else {
    /**
     * Löscht den Benutzer und beendet die Anfrage mit dem Senden einer Erfolgsmitteilung
     * @param {Object} err
     */
    req.user.remove(function(err) {
      if (err) { res.send(err); }
      else { res.json({success: true}); }
    });
  }
});

/**
 * Ändern der Bneutzereinstellungen
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
router.put('/:user', userCtrl.verifyLogin, function(req, res, next) {
  User.findByIdAndUpdate(req.user._id, {
    forename: req.body.forename,
    surname: req.body.surname,
    email: req.body.email
  },
  /**
   * Beendet die Anfrage mit dem Senden einer Erfolgsmitteilung, eines signierten tokens und einer neuen BenutzerId
   * @param {Object} err
   * @param {Object} user
   */
  function(err, user) {
    if(err){ res.send(err); }
    else {
      var token = jwt.sign({username: user.username, password: user.password}, configuration.secret, configuration.tokenConfig);
      res.json({success: true, token: token, userId: user._id});
    }
  });
});

/**
 * Ändern des Passwortes eines Benutzers
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
router.post('/changePassword/:user', userCtrl.verifyLogin, function(req, res, next) {
  /**
   * Beendet die Anfrage mit dem Senden einer Erfolgsmitteilung, eines signierten tokens und einer neuen BenutzerId
   * @param {Object} err
   * @param {Object} user
   */
  User.findByIdAndUpdate(req.user._id, {password: req.body.password}, function(err, user) {
    if(err){ res.send(err); }
    else {
      var token = jwt.sign({username: user.username, password: user.password}, configuration.secret, configuration.tokenConfig);
      res.json({success: true, token: token, userId: user._id});
    }
  });
});

module.exports = router;