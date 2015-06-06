/**
 * Logik hinter den Diagramm Informationen
 */
angular.module('brainworks.diagram')
/**
 * Verwaltung der gespeicherten Diagrammdaten
 * @param {Object} $http
 * @param {Object} localStorageService
 */
.factory('diagramInformationFactory', ['$http', 'localStorageService', function($http, localStorageService) {
  return {
    /**
     * Weist Id's zugehörige Diagrammdaten (Titel, Beschreibung, öffentliches Diagramm) zu
     * @param {string} id
     */
    get: function(id) {
      /**
       * Liest Diagrammdaten (Titel, Beschreibung, öffentliches Diagramm)
       * @param {Object} res
       */
      return $http.get('/diagram/' + localStorageService.get('userId') + '/diagramInformation/' + id).then(function(res) {
        return res.data;
      });
    },
    /**
     * Sicherung des Diagramms für die entsprechende Adresse
     * @param {Object} diagram
     */
    save: function(diagram) {
      return $http.put('/diagram/' + localStorageService.get('userId') + '/diagram/', diagram);
    }
  };
}])
/**
 * Definition der Logik hinter den Buttons in den Diagramminformationen
 * @param {Object} $scope
 * @param {Object} $state
 * @param {Object} localStorageService
 * @param {Object} diagram
 * @param {Object} diagramInformationFactory
 */
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
   * @param {Object} diagram
   */
  $scope.save = function(diagram) {
    diagramInformationFactory.save(diagram).success(function(data) {
      if(data.success) {
        $state.go('diagram', {id: data.diagramId});
      }
    });
  };
}]);