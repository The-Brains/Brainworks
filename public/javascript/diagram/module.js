/**
 * Verwaltung der Diagrammdaten
 * Implementieren der designer.js, diagrammInformation.js, relations.js und der shapes.js in das Projekt
 */
angular.module('brainworks.diagram', ['ui.bootstrap'])
.config(['$stateProvider', '$urlRouterProvider',
  /**
   * Verwaltung der statischen Diagrammdaten in states
   * Weist dem state(den Seiten zur Diagrammverwaltung) die entsprechenden Diagrammdaten zu
   * @param {Object} $stateProvider
   * @param {Object} $urlRouterProvider
   */
  function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('profile.diagrams', {
      url: '/diagrams',
      templateUrl: '/diagram/diagrams',
      controller: 'diagramCtrl',
      resolve: {
        diagrams: ['localStorageService', 'diagramsFactory',
          /**
           * Liest lokal gesicherten Diagramme
           * @param {Object} localStorageService
           * @param {Object} diagramsFactory
           */
          function(localStorageService, diagramsFactory) {
          return diagramsFactory.getAll(localStorageService.get('userId'));
        }]
      }
    })
    .state('diagram', {
      url: '/diagram/{id}',
      templateUrl: '/diagram/designer',
      controller: 'designerCtrl',
      resolve: {
        diagram: ['$stateParams', 'localStorageService', 'diagramsFactory',
          /**
           * Liest lokal gespeicherte Designer aus
           * @param {Object} $stateParams
           * @param {Object} localStorageService
           * @param {Object} diagramsFactory
           */
          function($stateParams, localStorageService, diagramsFactory) {
          return diagramsFactory.get(localStorageService.get('userId'), $stateParams.id);
        }]
      }
    })
    .state('diagramInformation', {
      url: '/diagramInformation/{id}',
      templateUrl: '/diagram/diagramInformation',
      controller: 'diagramInformationCtrl',
      resolve: {
        diagram: ['$stateParams', 'diagramInformationFactory',
          /**
           * Liest lokal gespeicherte DiagrammInformationen aus
           * @param {Object} $stateParams
           * @param {Object} diagramInformationFactory
           */
          function($stateParams, diagramInformationFactory) {
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
.factory('diagramsFactory', ['$http',
  /**
   *
   * @param {Object} $http
   */
  function($http) {
  return {
    getAll:
      /**
       * Liefert alle Diagrammdaten eines Users
       * @param {Number} userId
       */
      function(userId) {
      return $http.get('/diagram/' + userId + '/diagrams').then(
        /**
         * Liefert die Daten, die bei der URL Hinterlegt sind
         * @param {Object} res
         */
        function(res) {
        return res.data;
      });
    },
    getPublicDiagrams:
      /**
       * Liefert alle öffentlichen Diagrammdaten
       */
      function() {
      return $http.get('/diagram/publicDiagrams').then(function(res) {
        return res.data;
      });
    },
    getPublicDiagram:
      /**
       * Liefert Diagrammdaten eines bestimmtes öffentliches
       * @param {Object} diagramId
       */
      function(diagramId) {
      return $http.get('/diagram/' + diagramId).then(
        /**
         * Liefert die Daten, die bei der URL Hinterlegt sind
         * @param {Object} res
         */
        function(res) {
        return res.data;
      });
    },
    addComment:
      /**
       * Fügt Diagrammdaten eines bestimmten Diagramms eines bestimmten Nutzers eine Beschreibung hinzu
       * @param comment
       * @param {Object} diagramId
       * @param {Number} userId
       */
      function(comment, diagramId, userId) {
      return $http.put('/diagram/' + userId + '/diagram/' + diagramId + '/comment', {text: comment});
    },
    get:
      /**
       * Gibt Diagrammdaten eines bestimmten Diagramms von einem bestimmten Nutzer zurück
       * @param {Number} userId
       * @param {Object} diagramId
       */
      function(userId, diagramId) {
      return $http.get('/diagram/' + userId + '/diagram/' + diagramId).then(
        /**
         * Gibt die Daten, die bei der URL Hinterlegt sind zurück
         * @param {Object} res
         */
        function(res) {
        return res.data;
      });
    },
    remove:
      /**
       * Entfernt Diagrammdaten eines bestimmten Diagramms von einem bestimmten Nutzer
       * @param {Number} userId
       * @param {Object} diagramId
       */
      function(userId, diagramId) {
      return $http['delete']('/diagram/' + userId + '/diagram/' + diagramId);
    },
    saveDiagram:
      /**
       * Sichert bestimmte Diagrammdaten eines bestimmten Nutzers
       * @param {Number} userId
       * @param formdata
       */
      function(userId, formdata) {
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
.controller('diagramCtrl', ['$scope', 'localStorageService', 'diagramsFactory', 'diagrams',
  /**
   * Paging in der Diagrammübersicht
   * @param {Object} $scope
   * @param {Object} localStorageService
   * @param {Object} diagramsFactory
   * @param {Object} diagrams
   */
  function($scope, localStorageService, diagramsFactory, diagrams) {
  $scope.diagrams = diagrams;
  $scope.currentPage = 1;
  $scope.numPerPage = 5;
  $scope.maxSize = 5;
  $scope.removeDiagram =
    /**
     * Diagramm löschen
     * @param index
     */
    function(index) {
    diagramsFactory.remove(localStorageService.get('userId'), $scope.diagrams[index]._id).success(
      /**
       * Bei Erfolg wird das Array der Diagramme aktualisiert
       * @param {Object} response
       */
      function(response) {
      if(response.success) {
        $scope.diagrams.splice(index, 1);
      }
    });
  };
}])
.filter('startFrom',
  /**
   * Setzt einen Startwert, ab dem die Eingehenden Daten ausgewertet werden
   */
  function() {
  return (
  /**
   * Schneidet den Input bei Start ab
   * TODO Code geändert - einfach die Klammern nach dem return angefügt, um diesen Kommentar dazwischenzuquetschen
   * @param {String} input
   * @param {Integer} start
   */
  function(input, start) {
    start = +start;
    return input.slice(start);
  });

});