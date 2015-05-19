/**
 *
 */
angular.module('brainworks.user')
.controller('signInCtrl', ['$scope', '$rootScope', '$state', 'userFactory', 'localStorageService', function($scope, $rootScope, $state, userFactory, localStorageService) {
  $scope.user = {};
  $scope.formErrors = [];
  $scope.signIn = function(user) {
    var password = '';
    if(angular.isDefined(user.password)) {
      var shaObj = new jsSHA(user.password, "TEXT");
      password = shaObj.getHash("SHA-512", "HEX");
    }
    userFactory.signIn(user.username, password).success(function(response) {
      if(response.success) {
        localStorageService.set('token', response.token);
        localStorageService.set('userId', response.userId);
        $rootScope.isAuthentificated = true;
        $state.go('profile.diagrams');
      } else {
        $scope.formErrors.push(response.message);
      }
    });
  };
  $scope.closeError = function(index) {
    $scope.formErrors.splice(index, 1);
  };
}]);