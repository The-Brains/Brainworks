/**
 * Modul für die Diagramme. Definiert die Routen der Diagramme und die Hauptfunktionalitäten der Diagrammübersicht.
 */
angular.module('brainworks.diagram', ['ui.bootstrap'])
/**
 * Regekt die Routen für das Diagramm-Modul
 * @param {Object} $stateProvider  Der Provider-Service zum Definieren von Routen/States
 */
.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('profile.diagrams', {
      url: '/diagrams',
      templateUrl: '/diagram/diagrams',
      controller: 'diagramCtrl',
      resolve: {
        /**
         * Liefert alle Diagramme des eingeloggten Benutzers.
         * @param {Object} localStorageService  Der Service zum Speichern und Laden von Informationen im Local-Storage
         * @param {Object} diagramsFactory  Die Factory für die Diagramme
         */
        diagrams: ['localStorageService', 'diagramsFactory', function(localStorageService, diagramsFactory) {
          return diagramsFactory.getAll(localStorageService.get('userId'));
        }]
      }
    })
    .state('diagram', {
      url: '/diagram/{id}',
      templateUrl: '/diagram/designer',
      controller: 'designerCtrl',
      resolve: {
        /**
         * Liefert ein bestimmtes Diagramm.
         * @param {Object} $stateParams  Die Parameter der URL
         * @param {Object} localStorageService  Der Service zum Speichern und Laden von Informationen im Local-Storage
         * @param {Object} diagramsFactory  Die Factory für die Diagramme
         */
        diagram: ['$stateParams', 'localStorageService', 'diagramsFactory', function($stateParams, localStorageService, diagramsFactory) {
          return diagramsFactory.get(localStorageService.get('userId'), $stateParams.id);
        }]
      }
    })
    .state('diagramInformation', {
      url: '/diagramInformation/{id}',
      templateUrl: '/diagram/diagramInformation',
      controller: 'diagramInformationCtrl',
      resolve: {
        /**
         * Liefert Informationen für ein bestimmtes Diagramm.
         * @param {Object} $stateParams  Die Parameter der URL
         * @param {Object} diagramInformationFactory  Die Factory für die Diagramminformationen welche mit dem Server kommuniziert
         */
        diagram: ['$stateParams', 'diagramInformationFactory', function($stateParams, diagramInformationFactory) {
          return diagramInformationFactory.get($stateParams.id);
        }]
      }
    })
    .state('addDiagram', {
      url: '/addDiagram',
      templateUrl: '/diagram/diagramInformation',
      controller: 'diagramInformationCtrl',
      resolve: {
        /**
         * Liefert ein leeres Objekt in welchem die Daten gespeichert werden.
         */
        diagram: function() {
          return {
            diagram: {}
          };
        }
      }
    });
}])
/**
 * Factory zum Speichern und Laden von Diagrammen.
 * @param {Object} $http  Der HTTP-Service zum Senden von HTTP-Anfragen
 */
.factory('diagramsFactory', ['$http', function($http) {
  return {
    /**
     * Liefert alle Diagramme eines Users
     * @param {string} userId  Die ID des Benutzers
     */
    getAll: function(userId) {
      /**
       * Liefert die alle Diagramme des Benutzers
       * @param {Object} res  Das Objekt mit den Antwortdaten auf die Anfrage
       */
      return $http.get('/diagram/' + userId + '/diagrams').then(function(res) {
        return res.data;
      });
    },
    /**
     * Liefert alle öffentlichen Diagrammdaten
     */
    getPublicDiagrams: function() {
      /**
       * Liefert die alle öffentlichen Diagramme
       * @param {Object} res  Das Objekt mit den Antwortdaten auf die Anfrage
       */
      return $http.get('/diagram/publicDiagrams').then(function(res) {
        return res.data;
      });
    },
    /**
     * Liefert Diagrammdaten eines bestimmten öffentlichen Diagrammes
     * @param {string} diagramId  Die ID des Diagrammes
     */
    getPublicDiagram: function(diagramId) {
      /**
       * Liefert die Daten des öffentlichen Diagrammes
       * @param {Object} res  Das Objekt mit den Antwortdaten auf die Anfrage
       */
      return $http.get('/diagram/' + diagramId).then(function(res) {
        return res.data;
      });
    },
    /**
     * Fügt ein Kommentar einem Diagramm hinzu
     * @param {string} comment  Der Kommentar, welches hinzugefügt werden soll
     * @param {string} diagramId  Die ID des Diagrammes welches kommentiert wurde
     * @param {string} userId  Die ID des Benutzers welcher den Kommentar angelegt hat
     */
    addComment: function(comment, diagramId, userId) {
      return $http.put('/diagram/' + userId + '/diagram/' + diagramId + '/comment', {text: comment});
    },
    /**
     * Gibt Diagrammdaten eines bestimmten Diagramms von einem bestimmten Nutzer zurück
     * @param {string} userId  Die ID des Benutzers
     * @param {string} diagramId  Die ID des Diagrammes
     */
    get: function(userId, diagramId) {
      /**
       * Gibt die Daten des Diagrammes zurück
       * @param {Object} res  Das Objekt mit den Antwortdaten auf die Anfrage
       */
      return $http.get('/diagram/' + userId + '/diagram/' + diagramId).then(function(res) {
        return res.data;
      });
    },
    /**
     * Entfernt ein Diagramm von einem bestimmten Nutzer
     * @param {string} userId  Die ID des Benutzers
     * @param {string} diagramId  Die ID des Diagrammes
     */
    remove: function(userId, diagramId) {
      return $http['delete']('/diagram/' + userId + '/diagram/' + diagramId);
    },
    /**
     * Sichert bestimmte Diagrammdaten eines bestimmten Nutzers
     * @param {string} userId  Die ID des Benutzers
     * @param {Object} formdata  Das Objekt mit den Daten des Diagrammes
     */
    saveDiagram: function(userId, formdata) {
      return $http({
        method: 'POST',
        url: '/diagram/' + userId + '/diagram/',
        data: formdata,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
      });
    }
  };
}])
/**
 * Controller für den Ansicht der Diagramme. Liefert die Funktionen für die Diagrammübersicht.
 * @param {Object} $scope  Der Scope an welchem die Funktionalitäten definiert werden
 * @param {Object} localStorageService  Der Service zum Speichern und Laden von Informationen im Local-Storage
 * @param {Object} diagramsFactory  Die Factory für die Diagramme
 * @param {Object} diagrams  Die Diagramme für die Diagrammübersicht
 */
.controller('diagramCtrl', ['$scope', 'localStorageService', 'diagramsFactory', 'diagrams', function($scope, localStorageService, diagramsFactory, diagrams) {
  $scope.diagrams = diagrams;
  $scope.currentPage = 1;
  $scope.numPerPage = 5;
  $scope.maxSize = 5;
  /**
   * Diagramm löschen
   * @param {number} index  Der Index des Diagrammes im Array des Scopes
   */
  $scope.removeDiagram = function(index) {
    /**
     * Bei Erfolg wird das Array der Diagramme aktualisiert
     * @param {Object} response  Das Objekt mit den Antwortdaten
     */
    diagramsFactory.remove(localStorageService.get('userId'), $scope.diagrams[index]._id).success(function(response) {
      if(response.success) {
        $scope.diagrams.splice(index, 1);
      }
    });
  };
}])
/**
 * Filter für das Paging. Setzt einen Startwert, ab dem die Eingehenden Daten ausgewertet werden
 */
.filter('startFrom', function() {
  /**
   * Schneidet den Input bei Start ab
   * @param {Object[]} input  Das Array mit allen Diagrammen
   * @param {number} start  Der Startwert ab welchem die Diagramme angezeigt werden sollen
   */
  return  function(input, start) {
    start = +start;
    return input.slice(start);
  };

});