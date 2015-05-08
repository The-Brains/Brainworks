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
      controller: 'logoutCtrl'
    })
    .state('about', {
      url: '/about',
      templateUrl: '/about'
    });
  $urlRouterProvider.otherwise('home');
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

// Switch for the Login-Page as a service
brainworks.factory('signinService', function($rootScope) {
  var options = {
    boolean: false
  };
  
  // This will share the boolean for the Login-Page
  options.shareValues = function() {
    $rootScope.$broadcast("signedIn");
  }
  
  // Sets the new boolean to the $rootScope
  options.setBoolean = function(value) {
    if (typeof value === "boolean") {
      this.boolean = value;
      this.shareValues();
    } else this.boolean = false;
  }
    
  return options;
});

// Logout the user and shows them an login page
brainworks.controller('logoutCtrl', function(signinService, $location) {
  signinService.setBoolean(false);
  $location.path("/sign_in");
});

// Switch for the Login-Page as controller
brainworks.controller('brainworksCtrl', function($scope, signinService) {
  
  // This will add the $rootScope to the $scope
  this.$inject = ['$scope', 'signinService'];
  
  // Change the status if the user were logged in or not
  $scope.$on("signedIn", function() {
    $scope.signed_in = signinService.boolean;
  });
});

// Login path to the database
brainworks.factory('login', function($http, $location, signinService) {
  var modelService = {};
  var userAPI = '/login';
  
  modelService.getSingle = function(User) {
    $http.post(userAPI, User).success(function(response) {
      
      // Action for successful login
      alert(response.success);
      signinService.setBoolean(true);
       $location.path("/diagrams");
      return;      
    }).error(function(response) {
      
      // Action for failed login
      alert(response.failure);
      signinService.setBoolean(false);
      return;      
    });
  };
    
  return modelService;
});

// Signup path to the database
brainworks.factory('signup', function($http, $location, signinService) {
  var modelService = {};
  var userAPI = '/signup';
  
  modelService.save = function(User) {
    $http.post(userAPI, User).success(function(response) {
      
      // Action for successful login
      alert(response.success);
      signinService.setBoolean(true);
      $location.path("/diagrams");
      return;
    }).error(function(response) {
      
      // Action for failed login
      alert(response.failure);
      signinService.setBoolean(false);
      return;
    }); 
  };
  
  return modelService;
});