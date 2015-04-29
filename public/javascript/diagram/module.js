/**
 * New node file
 */
var diagram = angular.module('diagram', []);

diagram.controller('diagramCtrl', ['$scope', function($scope) {
  $scope.diagrams = [{_id: 1, title: 'Test'}, {_id: 2, title: 'Test1'}, {_id: 3, title: 'Test2'}];
}]);