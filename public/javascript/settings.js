///**
// * New node file
// */
//
//var settings = angular.module('settings', []);
//
//settings.controller('user', function($scope, signinService, user) {
////This will add the $rootScope to the $scope
//  this.$inject = ['$scope', 'signinService'];
//  
//  $scope.forename = signinService.user.forename;
//  $scope.surname = signinService.user.surname;
//  $scope.email = signinService.user.email;
//  $scope.username = signinService.user.username;
//  
//  // Change the status if the user were logged in or not
//  $scope.$on("signedIn", function() {
//    $scope.forename = signinService.user.forename;
//    $scope.surname = signinService.user.surname;
//    $scope.email = signinService.user.email;
//    $scope.username = signinService.user.username;
//  });
//  
//  $scope.changeUser = function() {
//    if ($scope.forename === undefined) {
//      $scope.forename = signinService.user.forename;
//    }
//    if ($scope.surname === undefined) {
//      $scope.surname = signinService.user.surname;
//    }
//    if ($scope.email === undefined) {
//      $scope.email = signinService.user.email;
//    }
//    if ($scope.username === undefined) {
//      $scope.username = signinService.user.username;
//    }
//    
//    // Data collection for the server
//    var data = signinService.user;
//    
//    // Adds additional data to the variable data
//    if ($scope.forename !== signinService.user.forename) {
//      data.newForename = $scope.forename;
//    }
//    if ($scope.surname !== signinService.user.surname) {
//      data.newSurname = $scope.surname;
//    }
//    if ($scope.email !== signinService.user.email) {
//      data.newEmail = $scope.email;
//    }
//    if ($scope.username !== signinService.user.username) {
//      data.newUsername = $scope.username;
//    }
//    
//    // Checks if some data has changed
//    if ($scope.forename !== signinService.user.forename ||
//        $scope.surname !== signinService.user.surname   ||
//        $scope.email !== signinService.user.email       ||
//        $scope.username !== signinService.user.username) {
//      
//      // Send the variable data to the server
//      user.updateUser(data);
//      
//    } else alert("Your data weren't changed in the database!");
//    
//  };
//});
//
//settings.controller('pass', function($scope, signinService, user) {
//  $scope.changePass = function() {
//  //This will add the $rootScope to the $scope
//    this.$inject = ['$scope', 'signinService'];
//    
//    var currPass = "";
//    var newPass = "";
//    var newPassAgain = "";
//    
//    if ($scope.currPass !== undefined) {
//      currPass = CryptoJS.SHA3($scope.currPass).toString().toUpperCase();
//    } else alert(""); 
//    
//    if ($scope.newPass !== undefined) {
//      newPass = CryptoJS.SHA3($scope.newPass).toString().toUpperCase();
//    } else alert(""); 
//    
//    if ($scope.newPassAgain !== undefined) {
//      newPassAgain = CryptoJS.SHA3($scope.newPassAgain).toString().toUpperCase();
//    } else alert(""); 
//      
//    if ($scope.currPass !== undefined     && currPass !== ""  && 
//        $scope.newPass !== undefined      && newPass !== ""   &&
//        $scope.newPassAgain !== undefined && newPassAgain !== "") {
//      
//      // check if the current password are equal
//      if (currPass === signinService.user.password) {
//        
//        // check if the new password are equal
//        if (newPass === newPassAgain) {
//          
//          // Check if the new password aren't equal with the current password
//          if (currPass !== newPass) {
//            var data = signinService.user;
//            data.newPass = newPass;
//            
//            user.updatePass(data);
//          } else alert("Your new password is equal with the current password!");
//        } else alert("The new password isn't correct!");
//      } else alert("The current password isn't correct!");
//    }
//    
//    // Change the status if the user were logged in or not
//    $scope.$on("signedIn", function() {
//      if (signinService.cleanPass) {
//        $scope.currPass = "";
//        $scope.newPass = "";
//        $scope.newPassAgain = "";
//      }
//    });
//    
//    currPass = "";
//    newPass = "";
//    newPassAgain = "";
//  };
//});
//
//settings.controller('delete', function($scope, user) {
//  $scope.deleteAccount = function() {
//    if ($scope.assignment) {
//      user.removeUser();
//    } else alert("You must accept the notices before you delete your account!");
//  };
//});