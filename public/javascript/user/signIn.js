/**
 *
 */
angular.module('brainworks.user')
.controller('signInCtrl', ['$scope', '$rootScope', '$state', 'userFactory', 'localStorageService', function($scope, $rootScope, $state, userFactory, localStorageService) {
  $scope.user = {};
  $scope.signIn = function(user) {
    var shaObj = new jsSHA(user.password, "TEXT");
    var password = shaObj.getHash("SHA-512", "HEX");
    userFactory.signIn(user.username, password).success(function(response) {
      if(response.success) {
        localStorageService.set('token', response.token);
        $rootScope.isAuthentificated = true;
        $state.go('profile.diagrams');
      }
    });
  };
}]);