/**
 * Implementieren der designer.js, diagrammInformation.js, relations.js und der shapes.js in das Projekt
 */
angular.module('brainworks.diagram', ['ui.bootstrap'])
.config(['$stateProvider', '$urlRouterProvider',
  /**
   * Verwaltung der statischen Adressdaten in States
   * Weist dem state(der Seite) die zu verwaltenden Daten zu
   * @param $stateProvider
   * @param $urlRouterProvider
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
           * Liest lokal gespeicherte Diagramme aus
           * @param localStorageService
           * @param diagramsFactory
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
           * @param $stateParams
           * @param localStorageService
           * @param diagramsFactory
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
           * @param $stateParams
           * @param diagramInformationFactory
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
   * @param $http
   */
  function($http) {
  return {
    getAll:
      /**
       * Gibt alle Diagrammdaten eines Users zurück
       * @param userId
       */
      function(userId) {
      return $http.get('/diagram/' + userId + '/diagrams').then(
        /**
         * Gibt die Daten, die bei der URL Hinterlegt sind zurück
         * @param res
         */
        function(res) {
        return res.data;
      });
    },
    getPublicDiagrams:
      /**
       * Gibt alle öffentlichen Diagrammdaten zurück
       */
      function() {
      return $http.get('/diagram/publicDiagrams').then(function(res) {
        return res.data;
      });
    },
    getPublicDiagram:
      /**
       * Gibt Diagrammdaten eines bestimmtes öffentliches zurück
       * @param diagramId
       */
      function(diagramId) {
      return $http.get('/diagram/' + diagramId).then(
        /**
         * Gibt die Daten, die bei der URL Hinterlegt sind zurück
         * @param res
         */
        function(res) {
        return res.data;
      });
    },
    addComment:
      /**
       * Fügt Diagrammdaten eines bestimmten Diagramms eines bestimmten Nutzers eine Beschreibung hinzu
       * @param comment
       * @param diagramId
       * @param userId
       */
      function(comment, diagramId, userId) {
      return $http.put('/diagram/' + userId + '/diagram/' + diagramId + '/comment', {text: comment});
    },
    get:
      /**
       * Gibt Diagrammdaten eines bestimmten Diagramms von einem bestimmten Nutzer zurück
       * @param userId
       * @param diagramId
       */
      function(userId, diagramId) {
      return $http.get('/diagram/' + userId + '/diagram/' + diagramId).then(
        /**
         * Gibt die Daten, die bei der URL Hinterlegt sind zurück
         * @param res
         */
        function(res) {
        return res.data;
      });
    },
    remove:
      /**
       * Entfernt Diagrammdaten eines bestimmten Diagramms von einem bestimmten Nutzer
       * @param userId
       * @param diagramId
       */
      function(userId, diagramId) {
      return $http['delete']('/diagram/' + userId + '/diagram/' + diagramId);
    },
    saveDiagram:
      /**
       * Sichert bestimmte Diagrammdaten eines bestimmten Nutzers
       * @param userId
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
   * @param $scope
   * @param localStorageService
   * @param diagramsFactory
   * @param diagrams
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
       * @param response
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