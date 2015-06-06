/**
 * Verwaltung der Diagrammdaten
 * Implementieren der designer.js, diagrammInformation.js, relations.js und der shapes.js in das Projekt
 */
angular.module('brainworks.diagram', ['ui.bootstrap'])
/**
 * Verwaltung der statischen Diagrammdaten in states
 * Weist dem state(den Seiten zur Diagrammverwaltung) die entsprechenden Diagrammdaten zu
 * @param {Object} $stateProvider
 * @param {Object} $urlRouterProvider
 */
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('profile.diagrams', {
      url: '/diagrams',
      templateUrl: '/diagram/diagrams',
      controller: 'diagramCtrl',
      resolve: {
        /**
         * Liest lokal gesicherten Diagramme
         * @param {Object} localStorageService
         * @param {Object} diagramsFactory
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
         * Liest lokal gespeicherte Designer aus
         * @param {Object} $stateParams
         * @param {Object} localStorageService
         * @param {Object} diagramsFactory
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
         * Liest lokal gespeicherte DiagrammInformationen aus
         * @param {Object} $stateParams
         * @param {Object} diagramInformationFactory
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
         * Liefert einen Template mit leeren Diagramminformationen
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
 *
 * @param {Object} $http
 */
.factory('diagramsFactory', ['$http', function($http) {
  return {
    /**
     * Liefert alle Diagrammdaten eines Users
     * @param {string} userId
     */
    getAll: function(userId) {
      /**
       * Liefert die Daten, die bei der URL Hinterlegt sind
       * @param {Object} res
       */
      return $http.get('/diagram/' + userId + '/diagrams').then(function(res) {
        return res.data;
      });
    },
    /**
     * Liefert alle öffentlichen Diagrammdaten
     */
    getPublicDiagrams: function() {
      return $http.get('/diagram/publicDiagrams').then(function(res) {
        return res.data;
      });
    },
    /**
     * Liefert Diagrammdaten eines bestimmtes öffentliches
     * @param {string} diagramId
     */
    getPublicDiagram: function(diagramId) {
      /**
       * Liefert die Daten, die bei der URL Hinterlegt sind
       * @param {Object} res
       */
      return $http.get('/diagram/' + diagramId).then(function(res) {
        return res.data;
      });
    },
    /**
     * Fügt Diagrammdaten eines bestimmten Diagramms eines bestimmten Nutzers eine Beschreibung hinzu
     * @param {string} comment
     * @param {string} diagramId
     * @param {string} userId
     */
    addComment: function(comment, diagramId, userId) {
      return $http.put('/diagram/' + userId + '/diagram/' + diagramId + '/comment', {text: comment});
    },
    /**
     * Gibt Diagrammdaten eines bestimmten Diagramms von einem bestimmten Nutzer zurück
     * @param {string} userId
     * @param {string} diagramId
     */
    get: function(userId, diagramId) {
      /**
       * Gibt die Daten, die bei der URL Hinterlegt sind zurück
       * @param {Object} res
       */
      return $http.get('/diagram/' + userId + '/diagram/' + diagramId).then(function(res) {
        return res.data;
      });
    },
    /**
     * Entfernt Diagrammdaten eines bestimmten Diagramms von einem bestimmten Nutzer
     * @param {string} userId
     * @param {string} diagramId
     */
    remove: function(userId, diagramId) {
      return $http['delete']('/diagram/' + userId + '/diagram/' + diagramId);
    },
    /**
     * Sichert bestimmte Diagrammdaten eines bestimmten Nutzers
     * @param {string} userId
     * @param {Object} formdata
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
 * Paging in der Diagrammübersicht
 * @param {Object} $scope
 * @param {Object} localStorageService
 * @param {Object} diagramsFactory
 * @param {Object} diagrams
 */
.controller('diagramCtrl', ['$scope', 'localStorageService', 'diagramsFactory', 'diagrams', function($scope, localStorageService, diagramsFactory, diagrams) {
  $scope.diagrams = diagrams;
  $scope.currentPage = 1;
  $scope.numPerPage = 5;
  $scope.maxSize = 5;
  /**
   * Diagramm löschen
   * @param {Number} index
   */
  $scope.removeDiagram = function(index) {
    /**
     * Bei Erfolg wird das Array der Diagramme aktualisiert
     * @param {Object} response
     */
    diagramsFactory.remove(localStorageService.get('userId'), $scope.diagrams[index]._id).success(function(response) {
      if(response.success) {
        $scope.diagrams.splice(index, 1);
      }
    });
  };
}])
/**
 * Setzt einen Startwert, ab dem die Eingehenden Daten ausgewertet werden
 */
.filter('startFrom', function() {
  /**
   * Schneidet den Input bei Start ab
   * @param {string} input
   * @param {number} start
   */
  return  function(input, start) {
    start = +start;
    return input.slice(start);
  };

});