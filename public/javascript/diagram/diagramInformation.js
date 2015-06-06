/**
 * Logik hinter den Diagramminformationen
 */
angular.module('brainworks.diagram')
/**
 * Facotry zum Speichern und Laden der Diagramminformationen
 * @param {Object} $http  Der HTTP-Service zum Senden von HTTP-Anfragen
 * @param {Object} localStorageService  Der Service zum Speichern und Laden von Informationen im Local-Storage
 */
.factory('diagramInformationFactory', ['$http', 'localStorageService', function($http, localStorageService) {
  return {
    /**
     * Lädt die Diagramminformationen für die übergebene ID.
     * @param {string} id  Die ID des Diagrammes
     */
    get: function(id) {
      /**
       * Liest Diagrammdaten (Titel, Beschreibung, öffentliches Diagramm)
       * @param {Object} res Das Objekt mit den Antwortdaten auf die Anfrage
       */
      return $http.get('/diagram/' + localStorageService.get('userId') + '/diagramInformation/' + id).then(function(res) {
        return res.data;
      });
    },
    /**
     * Speichert die Diagramminformationen
     * @param {Object} diagram  Das Objekt mit den geänderten Diagramminformationen
     */
    save: function(diagram) {
      return $http.put('/diagram/' + localStorageService.get('userId') + '/diagram/', diagram);
    }
  };
}])
/**
 * Controller für die Diagramminformationsseite. Definition der Logik hinter den Buttons in den Diagramminformationen.
 * @param {Object} $scope  Der Scope an welchem die Funktionalitäten definiert werden
 * @param {Object} $state  Der State-Service zum Umleiten auf eine andere Seite
 * @param {Object} localStorageService  Der Service zum Speichern und Laden von Informationen im Local-Storage
 * @param {Object} diagram  Das Diagramm für welche die Informationen aktualisiert werden sollen
 * @param {Object} diagramInformationFactory  Die Factory welche mit dem Server kommuniziert
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
   * @param {Object} diagram  Das Objekt mit den geänderten Diagramminformationen
   */
  $scope.save = function(diagram) {
    diagramInformationFactory.save(diagram).success(function(data) {
      if(data.success) {
        $state.go('diagram', {id: data.diagramId});
      }
    });
  };
}]);