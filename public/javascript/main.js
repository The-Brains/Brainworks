/**
 * Main-Module der Applikation. Sie dient zum Konfigurieren und Initialisieren.
 * 
 * @author Dennis Stumm
 */
var brainworks = angular.module('brainworks', ['ui.router', 'diagrams', 'signin']);

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
    .state('profile', {
      abstract: true,
      template: '<ui-view/>'
    })
    .state('profile.diagrams', {
      url: '/diagrams',
      templateUrl: '/diagrams',
      controller: 'diagramsCtrl'
    })
    .state('profile.settings', {
      url: '/settings',
      templateUrl: '/settings'
    })
    // TODO hier und beim einloggen muss ein redirect durchgefuehrt werden
    .state('profile.logout', {
      url: '/logout',
      templateUrl: '/home'
    })
    .state('about', {
      url: '/about',
      templateUrl: '/about'
    });
  $urlRouterProvider.otherwise('home');
});

brainworks.controller('brainworksCtrl', function($scope) {
  $scope.signed_in = false;
});

brainworks.directive('navItem', function($location) {
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
});

// Login path to the database
brainworks.factory('login', function($http) {
  var modelService = {};
  var userAPI = '/login';
  
  modelService.getSingle = function(User) {
    $http.post(userAPI, User).success(function(response) {
      alert("Success:\t" + response.success);
      return true;
    }).error(function(response) {
      alert("Failure:\t" + response.failure);
      return false;
    });
  };
    
  return modelService;
});

// Signup path to the database
brainworks.factory('signup', function($http) {
  var modelService = {};
  var userAPI = '/signup';
  
  modelService.save = function(User) {
    $http.post(userAPI, User).success(function(response) {
      alert( "Success:\t" + response.success);
      return true;
    }).error(function(response) {
      alert("Failure:\t" + response.failure);
      return false;
    }); 
  };
  
  return modelService;
});
