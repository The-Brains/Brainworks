/**
 * New node file
 */
var diagrams = angular.module('diagrams', []);

diagrams.controller('diagramsCtrl', function($scope) {
  $scope.diagrams = [{title: 'Test'}, {title: 'Test1'}, {title: 'Test2'}];
});