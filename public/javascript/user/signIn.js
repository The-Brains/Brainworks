/**
 *
 */
angular.module('brainworks.user')
.controller('signInCtrl', ['$scope', '$rootScope', '$state', 'userFactory', 'localStorageService', function($scope, $rootScope, $state, userFactory, localStorageService) {
  $scope.user = {};
  $scope.signIn = function(user) {
    userFactory.signIn(user.username, user.password).success(function(response) {
      if(response.success) {
        localStorageService.set('token', response.token);
        $rootScope.isAuthentificated = true;
        $state.go('profile.diagrams');
      }
    });
  };
}]);