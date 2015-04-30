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
    .state('sign_in', {
      url: '/sign_in',
      templateUrl: '/user/sign_in'
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
  $scope.signed_in = true;
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