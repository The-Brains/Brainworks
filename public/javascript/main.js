/**
 * Main-Module der Applikation. Sie dient zum Konfigurieren und Initialisieren.
 * 
 * @author Dennis Stumm
 */
var brainworks = angular.module('brainworks', ['ui.router', 'brainworks.diagram', 'brainworks.user']);

brainworks.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
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
}]);
brainworks.controller('brainworksCtrl', ['$scope', function($scope) {
  $scope.signedIn = false;
}]);
brainworks.directive('navItem', ['$location', function($location) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      page: '@page',
      title: '@title'
    },
    template: '<li ui-sref-active="active"><a ui-sref="{{page}}">{{title}}</a></li>'
  };
}]);