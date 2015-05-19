/**
 * New node file
 */
angular.module('brainworks.user')
.factory('userSettingsFactory', ['$http', function($http){
  return {
    loadUserData: function(userId) {
      return $http.get('/user/'+userId);
    },
    updateUser: function(user) {
      // TODO
    },
    changePassword: function(newPassword) {
      // TODO
    },
    deleteAccount: function(userId) {
      // TODO
    }
  };
}])
.controller('settingsCtrl', ['$scope', 'userSettingsFactory', 'localStorageService', function($scope, userSettingsFactory, localStorageService) {
  $scope.user = {};
  $scope.currentPw = '';
  $scope.newPw = '';
  $scope.newPwConfirmation = '';
  userSettingsFactory.loadUserData(localStorageService.get('userId')).success(function(response) {
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
  $scope.updateUser = function(user) {
    // TODO
  };
  $scope.changePassword = function(newPw) {
    // TODO
  };
  $scope.deleteAccount = function(userId) {
    // TODO
  };
}]);