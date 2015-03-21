/**
 * Main-Module der Applikation. Sie dient zum Konfigurieren und Initialisieren.
 * 
 * @author Dennis Stumm
 */
var brainworks = angular.module('brainworks', ['ui.router']);

brainworks.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home'
    })
    .state('sign_in', {
      url: '/sign_in',
      templateUrl: '/sign_in'
    })
    .state('diagrams', {
      url: '/diagrams',
      templateUrl: '/diagrams'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: '/profile'
    })
    .state('about', {
      url: '/about',
      templateUrl: '/about'
    });
  $urlRouterProvider.otherwise('home');
});
brainworks.controller('brainworksCtrl', function($scope) {
  $scope.signed_in = true;
});
brainworks.directive('navItem', function($location) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      linkUrl: '@linkUrl',
      title: '@title',
      serf: '@serf'
    },
    template: '<li ui-sref-active="active"><a ui-sref="{{serf}}" ng-href="{{linkUrl}}">{{title}}</a></li>'
  };
});