/**
 * New node file
 */

var User = require('../models/User');
var modelLogin = '/login';
var modelSignup = '/signup';

module.exports = function(router) {

  // Route to checkLogin
  router.route(modelLogin).post(function(req, res, next) {
    var query = User.findOne(req.body);
    query.exec(function (error, User) {
      if (error) res.status(500).json({failure: "The query couldn't find the data:\n" + error});
      if (!User) res.status(500).json({failure: "You weren't connected! Wrong username or password."});
      else res.status(200).json({success: "You were logged in!"});
    });
  });
  
  // Route to signUp
  router.route(modelSignup).post(function(req, res, next) {
    var search = User.findOne({username: req.body.username});
    search.exec(function (error, User) {
      if (error) res.status(500).json({failure: "An error has occured:\t" + error});
      if (User) res.status(500).json({failure: "Username is already forgiven!\nPlease choose another username."});
      else {
        var user = new User();
        fill(user, req.body, function() {
          user.save(function(error) {
            if (error) res.status(500).json({failure: "Your data couldn't inserted into the database:\n" + error});
            else res.status(200).json({success: "You were signed up!"});
          });  
        });
      }
    });
    
    function fill(user, body, callback) {
      user.vorname = body.vorname;
      user.name = body.name; 
      User.username = body.username; 
      user.email = body.email;
      user.password = body.password;
      callback();
    }
  });
};