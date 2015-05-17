/**
 * 
 */
angular.module('brainworks.user')
.controller('signUpCtrl', ['$scope', '$rootScope', '$state', 'userFactory', 'localStorageService', function($scope, $rootScope, $state, userFactory, localStorageService) {
  $scope.user = {};
  $scope.emailConfirmation = "";
  $scope.passwordConfirmation = "";
  $scope.signUp = function(user) {
    userFactory.createUser(user).success(function(response) {
      if(response.success) {
        localStorageService.set('token', response.token);
        $rootScope.isAuthentificated = true;
        $state.go('profile.diagrams');
      }
    });
  };
}])
.directive('username', ['$q', 'userFactory', function($q, userFactory) {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ngModel) {
      ngModel.$asyncValidators.username = function(modelValue, viewValue) {
        if(ngModel.$isEmpty(modelValue)) {
          return $q.when();
        }
        var def = $q.defer();
        userFactory.checkUsername(modelValue).success(function(res) {
          if(res.available) {
            def.resolve();
          } else {
            def.reject();
          }
        });
        return def.promise;
      }
    }
  };
}]);