/**
 * New node file
 */
angular.module('brainworks.user')
.factory('userSettingsFactory', ['$http', function($http){
  return {
    loadUserData: function(userId) {
      return $http.get('/user/'+userId).then(function(res) {
        return res.data;
      });
    },
    updateUser: function(userId, user) {
      return $http.put('/user/'+user, user);
    },
    changePassword: function(userId, newPassword) {
      return $http.post('/user/changePassword/'+userId, {password: newPassword});
    },
    deleteAccount: function(userId) {
      return $http.delete('/user/'+userId);
    }
  };
}])
.controller('settingsCtrl', ['$scope', '$rootScope', '$state', 'userSettingsFactory', 'localStorageService', 'user', function($scope, $rootScope, $state, userSettingsFactory, localStorageService, user) {
  $scope.user = user;
  $scope.currentPw = '';
  $scope.newPw = '';
  $scope.newPwConfirmation = '';
  $scope.createHash = function(value) {
    var val = angular.copy(value);
    var hash = '';
    if(angular.isDefined(val)) {
      hash = CryptoJS.SHA3(val, { outputLength: 512 }).toString();
    }
    return hash;
  };
  $scope.updateUser = function(user) {
    userSettingsFactory.updateUser(user._id, user);
  };
  $scope.changePassword = function(userId, newPw) {
    var password = '';
    if(angular.isDefined(newPw)) {
      password = CryptoJS.SHA3(newPw, { outputLength: 512 }).toString();
    }
    userSettingsFactory.changePassword(userId, password).success(function(response) {
      if(response.success) {
        localStorageService.set('token', response.token);
        localStorageService.set('userId', response.userId);
        // TODO response update/reset data
      }
    });
  };
  $scope.deleteAccount = function(userId) {
    userSettingsFactory.deleteAccount(userId).success(function(response) {
      if(response.success) {
        $rootScope.isAuthentificated = false;
        localStorageService.remove('token');
        localStorageService.remove('userId');
        $state.go('signIn');
      }
    });
  };
}]);