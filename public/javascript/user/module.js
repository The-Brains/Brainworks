/**
 * New node file
 */
angular.module('brainworks.user', [])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('profile.settings', {
      url: '/settings',
      templateUrl: '/user/settings',
      controller: 'settingsCtrl'
    })
    .state('profile.logout', {
      url: '/user/signOut',
      controller: ['$rootScope', '$state', 'localStorageService', function($rootScope, $state, localStorageService) {
        $rootScope.isAuthentificated = false;
        localStorageService.remove('token');
        localStorageService.remove('userId');
        $state.go('signIn');
      }]
    });
}])
.factory('userFactory', ['$http', '$rootScope', function($http, $rootScope) {
  return {
    checkUsername: function(username) {
      return $http.post('/user/check', {username: username});
    },
    createUser: function(user) {
      return $http.post('/user/signUp', {user: user});
    },
    signIn: function(username, password) {
      return $http.post('/user/signIn', {username: username, password: password});
    },
    checkLoggedIn: function() {
      return $http.get('/user/loggedIn');
    }
  };
}]);