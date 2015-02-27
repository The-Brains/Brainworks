/**
 * Main-Module der Applikation. Sie dient zum Konfigurieren und Initialisieren.
 * 
 * @author Dennis Stumm
 */
var brainworks = angular.module('brainworks', [
  'ngMaterial', 'ui.router'
]);

brainworks.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home'
    })
    .state('sign_in', {
      url: '/sign_in',
      templateUrl: '/sign_in'
    })
    .state('about', {
      url: '/about',
      templateUrl: '/about'
    });
  $urlRouterProvider.otherwise('home');
  
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('orange');
});