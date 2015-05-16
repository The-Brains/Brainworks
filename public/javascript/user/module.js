/**
 * New node file
 */
angular.module('brainworks.user', [])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('profile.settings', {
      url: '/settings',
      templateUrl: '/user/settings'
    })
    // TODO hier und beim einloggen muss ein redirect durchgefuehrt werden
    .state('profile.logout', {
      url: '/logout',
      templateUrl: '/home'
    });
}])
.factory('userFactory', ['$http', function($http) {
  return {
    checkUsername: function(username) {
      return $http.post('/user/check', {username: username});
    },
    createUser: function(user) {
      return $http.post('/signUp', user);
    },
    signIn: function(userdata) {
      return $http.post('/signIn', userdata);
    }
  };
}]);