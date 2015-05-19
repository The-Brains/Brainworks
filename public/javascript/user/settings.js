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
  $scope.createHash = function(value) {
    var val = angular.copy(value);
    var hash = '';
    if(angular.isDefined(val)) {
      var shaObj = new jsSHA(val, "TEXT");
      hash = shaObj.getHash("SHA-512", "HEX");
    }
    return hash;
  };
}]);