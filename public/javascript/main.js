/**
 * Main-Module der Applikation. Sie dient zum Konfigurieren und Initialisieren von Elementen der Navigationsbar
 */
angular.module('brainworks', ['ui.router', 'LocalStorageModule', 'brainworks.commons', 'brainworks.diagram', 'brainworks.user'])
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
  /**
   * Initiiert die Startseite und regelt die Zugriffe der Navigationsbar
   * @param {Object} $stateProvider
   * @param {Object} $urlRouterProvider
   * @param {Object} $httpProvider
   */
  function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home',
      resolve: {
        diagrams: ['diagramsFactory',
          /**
           * Liefert alle öffentlichen Diagramme
           * @param {Object} diagramsFactory
           */
          function(diagramsFactory) {
          return diagramsFactory.getPublicDiagrams();
        }]
      },
      controller: ['$scope', 'diagrams',
        /**
         * Initiiert Paging für die Diagrammübersicht
         * @param {Object} $scope
         * @param {Object} diagrams
         */
        function($scope, diagrams) {
        $scope.diagrams = diagrams.diagrams;
        $scope.currentPage = 1;
        $scope.numPerPage = 5;
        $scope.maxSize = 5;
      }]
    })
    .state('publicDiagram', {
      url: '/publicDiagram/{id}',
      templateUrl: '/publicDiagram',
      controller: 'publicDiagramCtrl',
      resolve: {
        diagram: ['$stateParams', 'localStorageService', 'diagramsFactory',
          /**
           * Liefert ein bestimmtes öffentliches diagramm (abhängig von der Id der hinterlegten Parameter des Diagramms)
           * @param {Object} $stateParams
           * @param {Object} localStorageService
           * @param {Object} diagramsFactory
           */
          function($stateParams, localStorageService, diagramsFactory) {
          return diagramsFactory.getPublicDiagram($stateParams.id);
        }]
      }
    })
    .state('signIn', {
      url: '/signIn',
      templateUrl: '/user/signIn'
    })
    .state('profile', {
      'abstract': true,
      template: '<ui-view/>'
    })
    .state('about', {
      url: '/about',
      templateUrl: '/about'
    });
  $urlRouterProvider.otherwise('home');
  $httpProvider.interceptors.push(['$q', '$injector', 'localStorageService',
    /**
     * Asynchrones aufrufen der Diagrammkonfiguration
     * @param $q ermöglicht asynchrones Aufrufen
     * @param $injector empfängt Objektinstanzen des Providers
     * @param {Object} localStorageService
     */
    function($q, $injector, localStorageService) {
    return {
      request:
        /**
         * Liefert die Konfiguration des Kopfbereiches
         * Wenn ein Access Token vorhanden ist, wird er ausgelesen
         * @param config
         */
        function(config) {
        config.headers = config.headers || {};
        if (localStorageService.get('token')) {
          config.headers['x-access-token'] = localStorageService.get('token');
        }
        return config;
      },
      responseError:
        /**
         * Ist die Anfrage Unauthorized oder Forbidden wird der Nutzer zurück zum SignIn geleitet
         * @param {Object} response
         */
        function(response) {
        if(response.status === 401 || response.status === 403) {
          $injector.get('$state').go('signIn');
        }
        return $q.reject(response);
      }
    };
  }]);
}])
.controller('brainworksCtrl', ['$rootScope', 'userFactory',
  /**
   * Bei erfolgreichem LogIn und Authentifizierung wird Zugang zu den Nutzerdaten gewährt
   * @param $rootScope
   * @param {Boolean} userFactory
   */
  function($rootScope, userFactory) {
  userFactory.checkLoggedIn().then(
    /**
     * Bei erfolgreicher Authentifizierung wird Zugang zu den Nutzerdaten gewährt
     * @param {Object} res
     */
    function(res) {
    $rootScope.isAuthentificated = res.data.success;
  });
}])
.controller('publicDiagramCtrl', ['$scope', '$state', 'localStorageService', 'diagramsFactory', 'diagram',
  /**
   *
   * @param {Object} $scope
   * @param {Object} $state
   * @param {Object} localStorageService
   * @param {Object} diagramsFactory
   * @param {Object} diagram
   */
  function ($scope, $state, localStorageService, diagramsFactory, diagram) {
  $scope.diagram = diagram;
  $scope.comment = '';
  $scope.elementId = 1;
  $scope.shapes = [];
  angular.forEach($scope.diagram.shapes,
    /**
     * Gesicherte Diagramme werden generiert
     * @param {Object} shape
     */
    function(shape) {
    var tmp = new window[shape._type]();
    tmp.applyJSON(shape);
    tmp.id = $scope.elementId;
    $scope.elementId++;
    $scope.shapes.push(tmp);
  });
  $scope.back =
    /**
     * Rückleitung zur Startseite
     */
    function() {
    $state.go('home');
  };
  $scope.addComment =
    /**
     * Fügt einem bestimmten Diagramm einen Kommentar hinzu
     * @param comment
     * @param {Object} diagramId
     */
    function(comment, diagramId) {
    diagramsFactory.addComment(comment, diagramId, localStorageService.get('userId')).success(
      /**
       * Setzen des Kommentars.
       * TODO Warum wird der Kommentar beim Schließen wieder entfernt?
       * könnten nicht die folgenden zielen auskommentiert werden & die übersicht aktualisiert werden?
        scope.comment = '';
        $scope.commentDiagramForm.$setPristine();
        $scope.commentDiagramForm.$setUntouched();
       *
       * @param {Object} response
       */
      function(response) {
      if(response.success) {
        $scope.diagram.comments.push(response.comment);
        $scope.comment = '';
        $scope.commentDiagramForm.$setPristine();
        $scope.commentDiagramForm.$setUntouched();
      }
    });
  };
}]);