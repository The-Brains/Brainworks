/**
 * Logik hinter den Diagramm Informationen
 */
angular.module('brainworks.diagram')
.factory('diagramInformationFactory', ['$http', 'localStorageService',
  /**
   * Verwaltung der gespeicherten Diagrammdaten
   * @param {Object} $http
   * @param {Object} localStorageService
   */
  function($http, localStorageService) {
  return {
    get:
      /**
       * Weist Id's zugehörige Diagrammdaten (Titel, Beschreibung, öffentliches Diagramm) zu
       * @param {Number} id
       */
      function(id) {
      return $http.get('/diagram/' + localStorageService.get('userId') + '/diagramInformation/' + id).then(
        /**
         * Liest Diagrammdaten (Titel, Beschreibung, öffentliches Diagramm)
         * @param {Object} res
         */
        function(res) {
        return res.data;
       }
      );
    },
    save:
      /**
       * Sicherung des Diagramms für die entsprechende Adresse
       * @param {Object} diagram
       */
      function(diagram) {
      return $http.put('/diagram/' + localStorageService.get('userId') + '/diagram/', diagram);
    }
  };
}])
.controller('diagramInformationCtrl', ['$scope', '$state', 'localStorageService', 'diagram', 'diagramInformationFactory',
  /**
   * Definition der Logik hinter den Buttons in den Diagramminformationen
   * @param {Object} $scope
   * @param {Object} $state
   * @param {Object} localStorageService
   * @param {Object} diagram
   * @param {Object} diagramInformationFactory
   */
  function($scope, $state, localStorageService, diagram, diagramInformationFactory) {
  $scope.diagram = diagram;

  $scope.cancel =
    /**
     * Abbrechen der Bearbeitung der Diagramminformation
     */
    function() {
    $state.go('profile.diagrams');
  };

  $scope.save =
    /**
     * Speichern der Diagramminformationen & anschließendes Öffnen des Diagramms
     * @param {Object} diagram
     */
    function(diagram) {
    diagramInformationFactory.save(diagram).success(function(data) {
      if(data.success) {
        $state.go('diagram', {id: data.diagramId});
      }
    });
  };
}]);