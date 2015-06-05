/**
 * TODO Kommentieren
 */
angular.module('brainworks.user', [])
.config(['$stateProvider', '$urlRouterProvider',
         /**
          * TODO Kommentieren
          * @param $stateProvider
          * @param $urlRouterProvider
          */
         function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('profile.settings', {
      url: '/settings',
      templateUrl: '/user/settings',
      controller: 'settingsCtrl',
      resolve: {
        user: ['localStorageService', 'userSettingsFactory',
               /**
                * TODO Kommentieren
                * @param localStorageService
                * @param userSettingsFactory
                */
               function(localStorageService, userSettingsFactory) {
          return userSettingsFactory.loadUserData(localStorageService.get('userId'));
        }]
      }
    })
    .state('profile.logout', {
      url: '/user/signOut',
      controller: ['$rootScope', '$state', 'localStorageService', 'userFactory', function($rootScope, $state, localStorageService, userFactory) {
        userFactory.signOut(localStorageService.get('userId'), localStorageService.get('token')).success(function() {
          $rootScope.isAuthentificated = false;
          localStorageService.remove('token');
          localStorageService.remove('userId');
          $state.go('signIn');
        });
      }]
    });
}])
.factory('userFactory', ['$http', '$rootScope', function($http, $rootScope) {
  return {
    checkUsername:
      /**
       * Ruft die URL zum Checken des Usernames auf
       * @param username
       */
      function(username) {
      return $http.post('/user/check', {username: username});
    },
    createUser:
      /**
       * Ruft die URL zum erstellen eines Users auf
       * @param user
       */
      function(user) {
      return $http.post('/user/signUp', {user: user});
    },
    signIn:
    /**
     * Ruft die URL zum Einloggen auf
     * @param username
     * @param password
     */
      function(username, password) {
      return $http.post('/user/signIn', {username: username, password: password});
    },
    checkLoggedIn:
      /**
       * Prüft, ob der User eingeloggt ist
       */
      function() {
      return $http.get('/user/loggedIn');
    },
    signOut:
      /**
       * Ruft die URl zum Ausloggen auf
       * @param userId
       * @param token
       */
      function(userId, token) {
      return $http.post('/user/signOut', {userId: userId, token: token});
    }
  };
}]);