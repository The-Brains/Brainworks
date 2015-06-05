/**
 * Datenhalter von statischen Variablen für die Nutzerseiten.
 * Rendern der Oberfläche
 */
var express = require('express');
var router = express.Router();
var User = require('../models/user/User');
var jwt = require('jsonwebtoken');
var userCtrl = require('../controller/User');
var configuration = require('../config.json');

router.get('/signIn',
  /**
   * Definition der Textelemente im Einloggen-Bereich
   * Zeichnen der Elemente
   * @param req
   * @param res
   * @param next
   */
  function(req, res, next) {
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

router.get('/settings', userCtrl.verifyLogin,
  /**
   * Definition der Textelemente in den Profileinstellungen
   * Zeichnen der Elemente
   * @param req
   * @param res
   * @param next
   */
  function(req, res, next) {
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

router.param('user',
  /**
   * Definition der Textelemente in der Navigationsbar
   * Zeichnen der Elemente
   * @param req
   * @param res
   * @param next
   * @param id
   */
  function(req, res, next, id) {
  var query = User.findById(id);
  query.exec(
    /**
     * Lädt den benötidten Nutzer. Liefert entsprechende Fehler, sofern welche bei der Suche auftreten.
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

router.post('/check',
  /**
   * Prüfen der Verfügbarkeit eines bestimmten Nutzernamens
   * @param req
   * @param res
   * @param next
   */
  function(req, res, next) {
  User.findOne({username: req.body.username},
    /**
     * Beendet die Anfrage mit dem Senden einer Erfolgsmitteilung und einer Meldung, dass der Nutzer für die LogInzeit belegt ist
     * @param err
     * @param user
     */
    function(err, user) {
    if(err) { res.send(err); }
    else { res.json({success: true, available: !user}); }
  });
});

router.post('/signUp',
  /**
   * Prüfen der Verfügbarkeit der Registrierung
   * @param req
   * @param res
   * @param next
   */
  function(req, res, next) {
  var user = new User(req.body.user);
  user.set('loggedIn', true);
  user.save(
    /**
     * Beendet die Anfrage mit dem Senden einer Erfolgsmitteilung, einem signierten Token und der NutzerID
     * @param err
     * @param user
     */
    function(err, user){
    if(err){ res.send(err); }
    else {
      var token = jwt.sign({username: user.username, password: user.password}, configuration.secret, configuration.tokenConfig);
      res.json({success: true, token: token, userId: user._id});
    }
  });
});

router.post('/signIn',
  /**
   * Prüfen der Verfügbarkeit der Log-Ins
   * @param req
   * @param res
   * @param next
   */
  function(req, res, next) {
  User.findOne({username: req.body.username, password: req.body.password},
    /**
     * Prüfung auf Richtigkeit des Benutzernamens. Signierung das Tokens, falls dieser korrekt ist
     * @param err
     * @param user
     */
    function(err, user) {
    if(err){ res.send(err); }
    else if(!user) {
      res.json({success: false, message: 'Das Passwort oder der Benutzername ist falsch!'});
    } else {
      var token = jwt.sign({username: user.username, password: user.password}, configuration.secret, configuration.tokenConfig);
      User.findByIdAndUpdate(user._id, {loggedIn: true},
        /**
         * Beendet die Anfrage mit dem Senden einer Erfolgsmitteilung, einem signierten Token und der NutzerID
         */
        function() {
        res.json({success: true, token: token, userId: user._id});
      });
    }
  });
});

router.post('/signOut',
  /**
   * Ausloggen des bestimmten Benutzers
   * @param req
   * @param res
   * @param next
   */
  function(req, res, next) {
  User.findByIdAndUpdate(req.body.userId, {loggedIn: false},
    /**
     * Die Anfrage wurde erfolgreich bearbeitet und das Ergebnis der Anfrage wird in der Antwort übertragen.
     */
    function() {
    res.sendStatus(200);
  });
});

router.get('/loggedIn',
  /**
   * Prüft beim LogIn, ob der Nutzertoken Valide ist (Verifizierungsprüfung )
   * @param req
   * @param res
   */
  function(req, res) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, configuration.secret,
      /**
       * Prüft, ob der Nutzertoken und das Konfigurationsecret mit der entschlüsselten BenutzerId valide sind
       * @param err
       * @param decoded
       */
      function(err, decoded) {
      if (err) {
        res.send(err);
      } else {
        User.findOne({userId: decoded.userId, loggedIn: true},
          /**
           * Beendet die Anfrage, ob die NutzerId mit der entschlüsselten NutzerId harmoniert mit dem Senden einer Erfolgsmitteilung
           * @param err
           * @param user
           */
          function(err, user) {
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

router.get('/:user', userCtrl.verifyLogin,
  /**
   * Beendet die Anfrage mit dem Senden des Benutzers
   * @param req
   * @param res
   * @param next
   */
  function(req, res, next) {
  res.json(req.user);
});

router.post('/delete/:user', userCtrl.verifyLogin,
  /**
   * Löscht das Nutzerprofil und prüft das dabei die Auswahl des Bestätigungsfeldes
   * @param req
   * @param res
   * @param next
   */
  function(req, res, next) {
  if(!req.body.assignment) {
    res.json({success: false, message: 'Bitte bestätigen Sie die Löschung Ihres Profils!'});
  } else {
    req.user.remove(
      /**
       * Beendet die Anfrage mit dem Senden einer Erfolgsmitteilung
       * @param err
       */
      function(err) {
      if (err) { res.send(err); }
      else { res.json({success: true}); }
    });
  }
});

router.put('/:user', userCtrl.verifyLogin,
  /**
   * Registrierungsprüfung eines neuen Benutzers
   * @param req
   * @param res
   * @param next
   */
  function(req, res, next) {
  User.findByIdAndUpdate(req.user._id, {
    forename: req.body.forename,
    surname: req.body.surname,
    email: req.body.email
  },
  /**
   * Beendet die Anfrage mit dem Senden einer Erfolgsmitteilung, eines signierten tokens und einer neuen BenutzerId
   * @param err
   * @param user
   */
  function(err, user) {
    if(err){ res.send(err); }
    else {
      var token = jwt.sign({username: user.username, password: user.password}, configuration.secret, configuration.tokenConfig);
      res.json({success: true, token: token, userId: user._id});
    }
  });
});

router.post('/changePassword/:user', userCtrl.verifyLogin,
  /**
   * Generierung eines neuen Tokens beim Ändern des Passwortes
   * @param req
   * @param res
   * @param next
   */
  function(req, res, next) {
  User.findByIdAndUpdate(req.user._id, {password: req.body.password},
    /**
     * Beendet die Anfrage mit dem Senden einer Erfolgsmitteilung, eines signierten tokens und einer neuen BenutzerId
     * @param err
     * @param user
     */
    function(err, user) {
    if(err){ res.send(err); }
    else {
      var token = jwt.sign({username: user.username, password: user.password}, configuration.secret, configuration.tokenConfig);
      res.json({success: true, token: token, userId: user._id});
    }
  });
});

module.exports = router;