/**
 * New node file
 */
var jwt = require('jsonwebtoken');
var User = require('../models/user/User');

exports.verifyLogin = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, 'test', function(err, decoded) {
      if (err) {
        return res.sendStatus(401);
      } else {
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