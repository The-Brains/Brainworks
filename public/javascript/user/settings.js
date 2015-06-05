/**
 * TODO Kommentieren
 */
angular.module('brainworks.user')
.factory('userSettingsFactory', ['$http', function($http){
  return {
    loadUserData:
      /**
       *
       * @param userId
       */
      function(userId) {
      return $http.get('/user/'+userId).then(function(res) {
        return res.data;
      });
    },
    updateUser:
      /**
       *
       * @param userId
       * @param user
       */
      function(userId, user) {
      return $http.put('/user/'+userId, user);
    },
    changePassword:
      /**
       *
       * @param userId
       * @param newPassword
       */
      function(userId, newPassword) {
      return $http.post('/user/changePassword/'+userId, {password: newPassword});
    },
    deleteAccount:
      /**
       *
       * @param userId
       * @param assignment
       */
      function(userId, assignment) {
      return $http.post('/user/delete/'+userId, {assignment: assignment});
    }
  };
}])
.controller('settingsCtrl', ['$scope', '$rootScope', '$state', 'userSettingsFactory', 'localStorageService', 'user', function($scope, $rootScope, $state, userSettingsFactory, localStorageService, user) {
  $scope.user = user;
  $scope.currentPw = '';
  $scope.newPw = '';
  $scope.newPwConfirmation = '';
  $scope.assignment = false;
  $scope.deleteFormErrors = [];
  $scope.createHash =
    /**
     *
     * @param value
     */
    function(value) {
    var val = angular.copy(value);
    var hash = '';
    if(angular.isDefined(val)) {
      hash = CryptoJS.SHA3(val, { outputLength: 512 }).toString();
    }
    return hash;
  };
  $scope.updateUser =
    /**
     *
     * @param user
     */
    function(user) {
    userSettingsFactory.updateUser(user._id, user).success(function(response) {
      if(response.success) {
        localStorageService.set('token', response.token);
        localStorageService.set('userId', response.userId);
      }
    });
  };
  $scope.changePassword =
    /**
     *
     * @param userId
     * @param newPw
     */
    function(userId, newPw) {
    var password = '';
    if(angular.isDefined(newPw)) {
      password = CryptoJS.SHA3(newPw, { outputLength: 512 }).toString();
    }
    userSettingsFactory.changePassword(userId, password).success(function(response) {
      if(response.success) {
        localStorageService.set('token', response.token);
        localStorageService.set('userId', response.userId);
        $scope.user.password = $scope.newPw;
        $scope.currentPw = '';
        $scope.newPw = '';
        $scope.newPwConfirmation = '';
        $scope.changePasswordForm.$setPristine();
        $scope.changePasswordForm.$setUntouched();
      }
    });
  };
  $scope.deleteAccount =
    /**
     *
     * @param userId
     * @param assignment
     */
    function(userId, assignment) {
    userSettingsFactory.deleteAccount(userId, assignment).success(function(response) {
      if(response.success) {
        $rootScope.isAuthentificated = false;
        localStorageService.remove('token');
        localStorageService.remove('userId');
        $state.go('signIn');
      } else {
        $scope.deleteFormErrors.push(response.message);
      }
    });
  };
  $scope.closeDeleteError =
    /**
     *
     * @param index
     */
    function(index) {
    $scope.deleteFormErrors.splice(index, 1);
  };
}]);