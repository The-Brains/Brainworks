/**
 * New node file
 */
var diagram = angular.module('brainworks.diagram', ['ui.bootstrap']);

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
  $scope.filteredDiagrams=[];
  $scope.currentPage = 1;
  $scope.numPerPage = 2;
  
  $scope.filterData = function() {
    var begin = (($scope.currentPage - 1) * $scope.numPerPage);
    var end = begin + $scope.numPerPage;
    $scope.filteredDiagrams = $scope.diagrams.slice(begin, end);
  };
  $scope.filterData();
}]);