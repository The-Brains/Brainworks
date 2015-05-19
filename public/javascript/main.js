/**
 * Main-Module der Applikation. Sie dient zum Konfigurieren und Initialisieren.
 * 
 * @author Dennis Stumm
 */
var brainworks = angular.module('brainworks', [
  'ui.router', 'diagrams', 'signin', 'settings'
]);

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
    boolean: false,
    user: {}
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
  
  // Sets the user to the $rootScope
  options.setUser = function(user) {
    if (typeof user === "object") {
      this.user = user;
      this.shareValues();
    } else this.user = {};
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
brainworks.factory('signin', function($http, $location, signinService) {
  var modelService = {};
  var loginAPI = '/login';
  var signupAPI = '/signup';
  
  // Login the user to the program
  modelService.login = function(User) {
    $http.post(loginAPI, User).success(function(response) {
      
      // Action for successful login
      signinService.setBoolean(response.boolean);
      signinService.setUser(response.user);
      $location.path(response.path);
      return;      
    }).error(function(response) {
      
      // Action for failed login
      alert(response.failure);
      signinService.setBoolean(response.boolean);
      return;      
    });    
  };
  
  // Signup the user to the database
  modelService.signup = function(User) {
    $http.post(signupAPI, User).success(function(response) {
      
      // Action for successful login
      signinService.setBoolean(response.boolean);
      signinService.setUser(response.user);
      $location.path(response.path);
      return;
    }).error(function(response) {
      
      // Action for failed login
      alert(response.failure);
      signinService.setBoolean(response.boolean);
      return;
    }); 
  };
    
  return modelService;
});

// User path to the database
brainworks.factory('user', function($http, $location, signinService) {
  var modelService = {};
  var userAPI = '/user';
  var passAPI = '/pass';
  var deleteAPI = '/delete';
  
  // Change user data in the database
  modelService.updateUser = function(User) {
    $http.post(userAPI, User).success(function(response) {
      
      // Action for successful login
      signinService.setUser(response.user);
      return;
    }).error(function(response) {
      
      // Action for failed login
      alert(response.failure);
      return;
    }); 
  };
  
  // Change user password in the database
  modelService.updatePass = function(User) {
    $http.post(passAPI, User).success(function(response) {
      
      // Action for successful login
      signinService.setUser(response.user);
      alert(response.success);
      return;
    }).error(function(response) {
      
      // Action for failed login
      alert(response.failure);
      return;
    }); 
  };
  
  // Delete user data from the database
  modelService.removeUser = function() {
    $http.post(deleteAPI, signinService.user).success(function(response) {
      
      // Action for successful login
      signinService.setBoolean(response.boolean);
      signinService.setUser(response.user);
      $location.path(response.path);
      return;
    }).error(function(response) {
      
      // Action for failed login
      alert(response.failure);
      signinService.setBoolean(response.boolean);
      return;
    }); 
  };
  
  return modelService;
});