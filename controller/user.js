/**
 * New node file
 */
var jwt = require('jsonwebtoken');

exports.verifyLogin = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, 'test', function(err, decoded) {
      if (err) {
        return res.sendStatus(401);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.sendStatus(401);
  }
};