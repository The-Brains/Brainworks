/**
 * New node file
 */
angular.module('brainworks.diagram')
.factory('diagramInformationFactory', ['$http', function($http) {
  return {
    get: function(id) {
      return $http.get('/diagramInformation/' + id).then(function(res) {
        return res.data;
      });
    }
  };
  // TODO ein controller und beim laden der seite evtl. die daten laden oder leer definieren
  // zudem sollte diese technik dann auf alle anderen seiten übertragen werden
}])
.controller('diagramInformationCtrl', ['$scope', 'diagram', 'diagramInformationFactory', function($scope, diagram, diagramInformationFactory) {
  $scope.diagram = diagram;
}]);