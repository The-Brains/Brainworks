/**
 * Logik hinter den Diagramm Informationen
 */
angular.module('brainworks.diagram')
.factory('diagramInformationFactory', ['$http', 'localStorageService', function($http, localStorageService) {
  return {
    /**
     * Holt die Daten (Titel, Beschreibung, öffentliches Diagramm) aus den aktuellen Diagramm Informationen
     * @param id
     */
    get: function(id) {
      return $http.get('/diagram/' + localStorageService.get('userId') + '/diagramInformation/' + id).then(function(res) {
        return res.data;
      });
    },
    /**
     * Sicherung der Adresse für das gesicherte Diagramm
     * @param diagram
     */
    save: function(diagram) {
      return $http.put('/diagram/' + localStorageService.get('userId') + '/diagram/', diagram);
    }
  };
}])
.controller('diagramInformationCtrl', ['$scope', '$state', 'localStorageService', 'diagram', 'diagramInformationFactory', function($scope, $state, localStorageService, diagram, diagramInformationFactory) {
  $scope.diagram = diagram;
  /**
   * Abbrechen der Bearbeitung der Diagramminformation
   */
  $scope.cancel = function() {
    $state.go('profile.diagrams');
  };
  /**
   * Speichern der Diagramminformationen & anschließendes Öffnen des Diagramms
   * @param diagram
   */
  $scope.save = function(diagram) {
    diagramInformationFactory.save(diagram).success(function(data) {
      if(data.success) {
        $state.go('diagram', {id: data.diagramId});
      }
    });
  };
}]);