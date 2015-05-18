/**
 * Main-Module der Applikation. Sie dient zum Konfigurieren und Initialisieren.
 * 
 * @author Dennis Stumm
 */
angular.module('brainworks', ['ui.router', 'LocalStorageModule', 'brainworks.commons', 'brainworks.diagram', 'brainworks.user'])
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home'
    })
    .state('signIn', {
      url: '/signIn',
      templateUrl: '/user/signIn'
    })
    .state('profile', {
      abstract: true,
      template: '<ui-view/>'
    })
    .state('about', {
      url: '/about',
      templateUrl: '/about'
    });
  $urlRouterProvider.otherwise('home');
  $httpProvider.interceptors.push(['$q', '$location', 'localStorageService', function($q, $location, localStorageService) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if (localStorageService.get('token')) {
          config.headers['x-access-token'] = localStorageService.get('token');
        }
        return config;
      },
      responseError: function(response) {
        if(response.status === 401 || response.status === 403) {
          $location.path('/user/signIn');
        }
        return $q.reject(response);
      }
    };
  }]);
}])
.controller('brainworksCtrl', ['$rootScope', 'userFactory', function($rootScope, userFactory) {
  $rootScope.isAuthentificated = false;
  userFactory.checkLoggedIn().success(function(response) {
    $rootScope.isAuthentificated = response.success;
  });
}]);