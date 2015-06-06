/**
 * Controller für Benutzerfunktionalitäten
 */
var jwt = require('jsonwebtoken');
var User = require('../models/user/User');
var configuration = require('../config.json');

/**
 * Verifizierung des Log-Ins
 * @param {Object} req Das Objekt mit den Daten der Anfrage
 * @param {Object} res Das Objekt für die HTTP-Antwort
 * @param {Function} next Funktion zum Weiterleiten zur Bearbeitung der Anfrage
 */
exports.verifyLogin = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    /**
     * Verifizierung des Logins und entschlüsseln der Benutzerinformationen im Token
     * @param {Object} err Fehler wenn etwas schief läuft
     * @param {Object} decoded Die entschlüsselten Benutzerinformationen
     */
    jwt.verify(token, configuration.secret, function(err, decoded) {
      if (err) {
        return res.sendStatus(401);
      } else {
        /**
         * Suchen eines eingeloggten Benutzer zu der entsschlüsselten ID
         * @param {Object} err Fehler wenn etwas schief läuft
         * @param {Object} user Der passende Benutzer
         */
        User.findOne({userId: decoded.userId, loggedIn: true}, function(err, user) {
          if(err){ return res.sendStatus(401); }
          else if(!user) { return res.sendStatus(401); }
          else {
            req.decoded = decoded;
            next();
          }
        });
      }
    });
  } else {
    return res.sendStatus(401);
  }
};