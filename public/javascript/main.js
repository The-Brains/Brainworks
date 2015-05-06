/**
 * Main-Module der Applikation. Sie dient zum Konfigurieren und Initialisieren.
 * 
 * @author Dennis Stumm
 */
angular.module('brainworks', ['ui.router', 'brainworks.commons', 'brainworks.diagram', 'brainworks.user'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
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
}])
.controller('brainworksCtrl', ['$scope', function($scope) {
  $scope.signedIn = false;
}]);