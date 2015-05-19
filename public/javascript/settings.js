/**
 * New node file
 */

var settings = angular.module('settings', []);

settings.controller('user', function($scope, signinService, user) {
//This will add the $rootScope to the $scope
  this.$inject = ['$scope', 'signinService'];
  
  $scope.forename = signinService.user.forename;
  $scope.surname = signinService.user.surname;
  $scope.email = signinService.user.email;
  $scope.username = signinService.user.username;
  
  // Change the status if the user were logged in or not
  $scope.$on("signedIn", function() {
    $scope.forename = signinService.user.forename;
    $scope.surname = signinService.user.surname;
    $scope.email = signinService.user.email;
    $scope.username = signinService.user.username;
  });
  
  $scope.changeUser = function() {
    
  };
});

settings.controller('pass', function($scope, signinService, user) {
  $scope.changePass = function() {
    var currPass = "";
    var newPass = "";
    var newPassAgain = "";
    
    if ($scope.currPass !== undefined) {
      currPass = CryptoJS.SHA3($scope.currPass).toString().toUpperCase();
    } else alert(""); 
    
    if ($scope.newPass !== undefined) {
      newPass = CryptoJS.SHA3($scope.newPass).toString().toUpperCase();
    } else alert(""); 
    
    if ($scope.newPassAgain !== undefined) {
      newPassAgain = CryptoJS.SHA3($scope.newPassAgain).toString().toUpperCase();
    } else alert(""); 
      
    if ($scope.currPass !== undefined     && currPass !== ""  && 
        $scope.newPass !== undefined      && newPass !== ""   &&
        $scope.newPassAgain !== undefined && newPassAgain !== "") {
      
      // check if the current password are equal
      if (currPass === signinService.user.password) {
        
        // check if the new password are equal
        if (newPass === newPassAgain) {
          
          // Check if the new password aren't equal with the current password
          if (currPass !== newPass) {
            var data = signinService.user;
            data.newPass = newPass;
            
            user.updatePass(data);
          } else alert("Your new password is equal with the current password!");
        } else alert("The new password isn't correct!");
      } else alert("The current password isn't correct!");
    }
    
    currPass = "";
    newPass = "";
    newPassAgain = "";
  };
});

settings.controller('delete', function($scope, user) {
  $scope.deleteAccount = function() {
    if ($scope.assignment) {
      user.removeUser();
    } else alert("You must accept the notices before you delete your account!");
  };
});