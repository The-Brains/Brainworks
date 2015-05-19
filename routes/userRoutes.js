/**
 * New node file
 */

var User = require('../models/User');
var modelLogin = '/login';
var modelSignup = '/signup';
var modelUser = '/user';
var modelPass = '/pass';
var modelDelete = '/delete';

module.exports = function(router) {
  
  // Route to checkLogin
  router.route(modelLogin).post(function(req, res, next) {
    var query = User.findOne(req.body);
    query.exec(function (error, User) {
      if (error) res.status(500).json({
        failure: "The query couldn't find the data:\n" + error,
        boolean: false
      });
      if (!User) res.status(500).json({
        failure: "You weren't connected! Wrong username or password.",
        boolean: false
      });
      else res.status(200).json({
        success: "You were logged in!", 
        user: User,
        boolean: true,
        path: "/diagrams"
      });
    });
  });
  
  // Route to signUp
  router.route(modelSignup).post(function(req, res, next) {
    var user = new User(req.body);
    
    var search = User.findOne({username: req.body.username});
    search.exec(function (error, User) {
      if (error) res.status(500).json({
        failure: "An error has occured:\t" + error,
        boolean: false
      });
      if (User) res.status(500).json({
        failure: "Username is already forgiven!\nPlease choose another username.",
        boolean: false
      });
      else {
        user.save(function(error) {
          if (error) res.status(500).json({
            failure: "Your data couldn't inserted into the database:\n" + error,
            boolean: false
          });
          else res.status(200).json({
            success: "You were signed up!", 
            user: user,
            boolean: true,
            path: "/diagrams"
          });
        });  
      }
    });
  });
  
  //Route to update user data
  router.route(modelUser).post(function(req, res, next) {
    var data = req.body;
    
    var query = User.findById(data.id);
    query.exec(function (error, User) {
      if (error) res.status(500).json({
        failure: "An error has occured:\t" + error
      });
      if (User) {
        if (data.newForename) User.forename = data.newForename;
        if (data.newSurname) User.surname = data.newSurname;
        if (data.newEmail) User.email = data.newEmail;
        if (data.newUsername) User.username = data.newUsername;
        
        User.save(function(error) {
          if (error) res.status(500).json({
            failure: "An error has occured:\t" + error
          });
          else res.status(200).json({
            success: "The user data was successfully changed in the database!",
            user: User
          });  
        });
      }
      else res.status(500).json({
        failure: "The user data couldn't changed in the database!"
      });
    });
  });
    
  //Route to update password
  router.route(modelPass).post(function(req, res, next) {
    var data = req.body;
    
    var query = User.findById(data.id);
    query.exec(function(error, User) {
      if (error) res.status(500).json({
        failure: "An error has occured:\t" + error
      }); 
      if (User) {
        User.password = data.newPass;
        
        User.save(function(error) {
          if (error) res.status(500).json({
            failure: "An error has occured:\t" + error
          });
          else res.status(200).json({
            success: "The password was successfully changed in the database!",
            user: User
          });
        });
      } else res.status(500).json({
        failure: "The password couldn't changed in the database!"
      });
    });
  });
  
  //Route to delete Account
  router.route(modelDelete).post(function(req, res, next) {
    User.remove({username: req.body.username}, function (error) {
      if (error) res.status(500).json({
        failure: "The user weren't removed from the database:\t" + error,
        boolean: true
      });
      else res.status(200).json({
        success: "The user was successfully deleted from the database!",
        boolean: false,
        path: "/sign_in"
      });
    });
  });
};