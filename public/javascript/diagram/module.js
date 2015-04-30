/**
 * New node file
 */
var diagram = angular.module('brainworks.diagram', []);

diagram.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('profile.diagrams', {
      url: '/diagrams',
      templateUrl: '/diagram/diagrams',
      controller: 'diagramCtrl'
    })
    .state('diagram', {
      url: '/diagram/{id}',
      templateUrl: '/diagram/designer'
    });
}]);

diagram.controller('diagramCtrl', ['$scope', function($scope) {
  $scope.diagrams = [{_id: 1, title: 'Test'}, {_id: 2, title: 'Test1'}, {_id: 3, title: 'Test2'}];
}]);