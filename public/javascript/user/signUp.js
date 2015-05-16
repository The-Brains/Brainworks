/**
 * 
 */
angular.module('brainworks.user').controller('signUpCtrl', ['$scope', 'userFactory', function($scope, userFactory) {
  $scope.user = {};
  $scope.signUp = function(user) {
    userFactory.createUser(user);
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
          console.log(ngModel);
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