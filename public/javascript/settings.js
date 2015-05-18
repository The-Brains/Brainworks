/**
 * New node file
 */

var settings = angular.module('settings', []);

settings.controller('user', function($scope, signinService) {
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

settings.controller('pass', function($scope, signinService) {
  $scope.changePass = function() {
    
  };
});

settings.controller('delete', function($scope, signinService) {
  $scope.deleteAccount = function() {
    if ($scope.assignment) {
      
    }
  };
});