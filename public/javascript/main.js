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
      templateUrl: '/home',
      resolve: {
        diagrams: ['diagramsFactory', function(diagramsFactory) {
          return diagramsFactory.getPublicDiagrams();
        }]
      },
      controller: ['$scope', 'diagrams', function($scope, diagrams) {
        $scope.diagrams = diagrams.diagrams;
        $scope.currentPage = 1;
        $scope.numPerPage = 5;
        $scope.maxSize = 5;
      }]
    })
    .state('publicDiagram', {
      url: '/publicDiagram/{id}',
      templateUrl: '/publicDiagram',
      controller: 'publicDiagramCtrl',
      resolve: {
        diagram: ['$stateParams', 'localStorageService', 'diagramsFactory', function($stateParams, localStorageService, diagramsFactory) {
          return diagramsFactory.getPublicDiagram($stateParams.id);
        }]
      }
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
  $httpProvider.interceptors.push(['$q', '$injector', 'localStorageService', function($q, $injector, localStorageService) {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        if (localStorageService.get('token')) {
          config.headers['x-access-token'] = localStorageService.get('token');
        }
        return config;
      },
      responseError: function(response) {
        if(response.status === 401 || response.status === 403) {
          $injector.get('$state').go('signIn');
        }
        return $q.reject(response);
      }
    };
  }]);
}])
.controller('brainworksCtrl', ['$rootScope', 'userFactory', function($rootScope, userFactory) {
  userFactory.checkLoggedIn().then(function(res) {
    $rootScope.isAuthentificated = res.data.success;
  });
}])
.controller('publicDiagramCtrl', ['$scope', '$state', 'localStorageService', 'diagramsFactory', 'diagram', function ($scope, $state, localStorageService, diagramsFactory, diagram) {
  $scope.diagram = diagram;
  $scope.comment = '';
  $scope.elementId = 1;
  $scope.shapes = [];
  angular.forEach($scope.diagram.shapes, function(shape) {
    var tmp = new window[shape._type];
    tmp.applyJSON(shape);
    tmp.id = $scope.elementId;
    $scope.elementId++;
    $scope.shapes.push(tmp);
  });
  $scope.back = function() {
    $state.go('home');
  };
  $scope.addComment = function(comment, diagramId) {
    diagramsFactory.addComment(comment, diagramId, localStorageService.get('userId')).success(function(response) {
      if(response.success) {
        $scope.diagram.comments.push(response.comment);
        $scope.comment = '';
        $scope.commentDiagramForm.$setPristine();
        $scope.commentDiagramForm.$setUntouched();
      }
    });
  };
}]);