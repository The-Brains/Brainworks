/**
 * New node file
 */
var jwt = require('jsonwebtoken');

// TODO chack if the requested user is also the logged in user
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