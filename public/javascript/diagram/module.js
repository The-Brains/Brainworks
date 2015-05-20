/**
 * New node file
 */
angular.module('brainworks.diagram', ['ui.bootstrap'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('profile.diagrams', {
      url: '/diagrams',
      templateUrl: '/diagram/diagrams',
      controller: 'diagramCtrl'
    })
    .state('diagram', {
      url: '/diagram/{id}',
      templateUrl: '/diagram/designer'
    })
    .state('diagramInformation', {
      url: '/diagramInformation/{id}',
      templateUrl: '/diagram/diagramInformation'
    })
    .state('addDiagram', {
      url: '/addDiagram',
      templateUrl: '/diagram/diagramInformation'
    });
}])
.controller('diagramCtrl', ['$scope', function($scope) {
  $scope.diagrams = [{_id: 1, title: 'Test'}, {_id: 2, title: 'Test1'}, {_id: 3, title: 'Test2'}];
  $scope.currentPage = 1;
  $scope.numPerPage = 5;
  $scope.maxSize = 5;
}])
.filter('startFrom', function() {
  return function(input, start) {
    start = +start;
    return input.slice(start);
  };
})
;