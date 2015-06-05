/**
 * Verwaltung der Nutzerdaten
 * Implementieren der settings.js, singIn.js und der singUp.js in das Projekt
 */
angular.module('brainworks.user', [])
.config(['$stateProvider', '$urlRouterProvider',
         /**
          * Verwaltung der statischen Nutzerdaten in states
          * Weist dem state(den Seiten zum LogIn, der Registrierung & den Profileinstellungen) die zu verwaltenden Nutzerdaten zu
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
                * Liest die lokal gesicherten Nutzer aus
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
      controller: ['$rootScope', '$state', 'localStorageService', 'userFactory',
        /**
         * Entfernt beim Logout des Nutzers die zugewiesene UserId und den lokal verwendeten Token
         * @param $rootScope
         * @param $state
         * @param localStorageService
         * @param userFactory
         */
        function($rootScope, $state, localStorageService, userFactory) {
        userFactory.signOut(localStorageService.get('userId'), localStorageService.get('token')).success(
          /**
           * Leitet den Nutzer auf die LogIn Seite, wenn er nicht mehr authentifiziert ist
           * Entfernt token und userId
           */
          function() {
          $rootScope.isAuthentificated = false;
          localStorageService.remove('token');
          localStorageService.remove('userId');
          $state.go('signIn');
        });
      }]
    });
}])
.factory('userFactory', ['$http', '$rootScope',
  /**
   * Validierung und Verwaltung der Nutzerregistrierung und dem Nutzer-LogIn
   * @param $http
   * @param $rootScope
   */
  function($http, $rootScope) {
  return {
    checkUsername:
      /**
       * Ruft die URL zum Prüfen des Usernames auf
       * @param username
       */
      function(username) {
      return $http.post('/user/check', {username: username});
    },
    createUser:
      /**
       * Ruft die URL zum Erstellen eines Users auf
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
       * Ruft die URL auf welche prüft, ob der User eingeloggt ist
       */
      function() {
      return $http.get('/user/loggedIn');
    },
    signOut:
      /**
       * Ruft die URL zum Ausloggen auf
       * @param userId
       * @param token
       */
      function(userId, token) {
      return $http.post('/user/signOut', {userId: userId, token: token});
    }
  };
}]);