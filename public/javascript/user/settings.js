/**
 * New node file
 */
angular.module('brainworks.user')
.controller('settingsCtrl', ['$scope', 'userFactory', 'localStorageService', function($scope, userFactory, localStorageService) {
  $scope.user = {};
  $scope.currentPw = '';
  $scope.newPw = '';
  $scope.newPwConfirmation = '';
  userFactory.loadUserData(localStorageService.get('userId')).success(function(response) {
    $scope.user = response;
  });
}]);