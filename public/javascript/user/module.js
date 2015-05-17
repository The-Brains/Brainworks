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
    .state('profile.logout', {
      url: '/user/signOut',
      controller: ['$rootScope', '$state', 'localStorageService', function($rootScope, $state, localStorageService) {
        $rootScope.isAuthentificated = false;
        localStorageService.remove('token');
        $state.go('signIn');
      }]
    });
}])
.factory('userFactory', ['$http', function($http) {
  return {
    isAuthentificated: false,
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
      return $http.get('/user/loggedIn').success(function(response) {
        this.isAuthentificated = response.success;
      });
    }
  };
}]);