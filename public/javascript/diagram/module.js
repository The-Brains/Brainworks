/**
 * New node file
 */
angular.module('brainworks.diagram', ['ui.bootstrap'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('profile.diagrams', {
      url: '/diagrams',
      templateUrl: '/diagram/diagrams',
      controller: 'diagramCtrl',
      resolve: {
        diagrams: ['localStorageService', 'diagramsFactory', function(localStorageService, diagramsFactory) {
          return diagramsFactory.getAll(localStorageService.get('userId'));
        }]
      }
    })
    .state('diagram', {
      url: '/diagram/{id}',
      templateUrl: '/diagram/designer',
      controller: 'designerCtrl',
      resolve: {
        diagram: ['$stateParams', 'localStorageService', 'diagramsFactory', function($stateParams, localStorageService, diagramsFactory) {
          return diagramsFactory.get(localStorageService.get('userId'), $stateParams.id);
        }]
      }
    })
    .state('diagramInformation', {
      url: '/diagramInformation/{id}',
      templateUrl: '/diagram/diagramInformation',
      controller: 'diagramInformationCtrl',
      resolve: {
        diagram: ['$stateParams', 'diagramInformationFactory', function($stateParams, diagramInformationFactory) {
          return diagramInformationFactory.get($stateParams.id);
        }]
      }
    })
    .state('addDiagram', {
      url: '/addDiagram',
      templateUrl: '/diagram/diagramInformation',
      controller: 'diagramInformationCtrl',
      resolve: {
        diagram: function() {
          return {
            diagram: {}
          };
        }
      }
    });
}])
.factory('diagramsFactory', ['$http', function($http) {
  return {
    getAll: function(userId) {
      return $http.get('/diagram/' + userId + '/diagrams').then(function(res) {
        return res.data;
      });
    },
    getPublicDiagrams: function() {
      return $http.get('/diagram/publicDiagrams').then(function(res) {
        return res.data;
      });
    },
    getPublicDiagram: function(diagramId) {
      return $http.get('/diagram/' + diagramId).then(function(res) {
        return res.data;
      });
    },
    addComment: function(comment, diagramId, userId) {
      return $http.put('/diagram/' + userId + '/diagram/' + diagramId + '/comment', {text: comment});
    },
    get: function(userId, diagramId) {
      return $http.get('/diagram/' + userId + '/diagram/' + diagramId).then(function(res) {
        return res.data;
      });
    },
    remove: function(userId, diagramId) {
      return $http['delete']('/diagram/' + userId + '/diagram/' + diagramId);
    },
    saveDiagram: function(userId, formdata) {
      return $http({
        method: 'POST',
        url: '/diagram/' + userId + '/diagram/',
        data: formdata,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
      });
    }
  };
}])
.controller('diagramCtrl', ['$scope', 'localStorageService', 'diagramsFactory', 'diagrams', function($scope, localStorageService, diagramsFactory, diagrams) {
  $scope.diagrams = diagrams;
  $scope.currentPage = 1;
  $scope.numPerPage = 5;
  $scope.maxSize = 5;
  $scope.removeDiagram = function(index) {
    diagramsFactory.remove(localStorageService.get('userId'), $scope.diagrams[index]._id).success(function(response) {
      if(response.success) {
        $scope.diagrams.splice(index, 1);
      }
    });
  };
}])
.filter('startFrom', function() {
  return function(input, start) {
    start = +start;
    return input.slice(start);
  };
});