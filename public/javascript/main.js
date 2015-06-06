/**
 * Main-Module der Applikation. Sie dient zum Konfigurieren und Initialisieren der Routen und Hauptfunktionalitäten
 */
angular.module('brainworks', ['ui.router', 'LocalStorageModule', 'brainworks.commons', 'brainworks.diagram', 'brainworks.user'])
/**
 * Initiiert die Startseite und regelt die Routen
 * @param {Object} $stateProvider
 * @param {Object} $urlRouterProvider
 * @param {Object} $httpProvider
 */
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home',
      resolve: {
        /**
         * Liefert alle öffentlichen Diagramme
         * @param {Object} diagramsFactory
         */
        diagrams: ['diagramsFactory', function(diagramsFactory) {
          return diagramsFactory.getPublicDiagrams();
        }]
      },
      /**
       * Controller für die öffentliche Diagrammübersicht. Setzt Diagramme im Scope
       * und liefert Funktionalitäten für das Paging.
       * @param {Object} $scope
       * @param {Object} diagrams
       */
      controller: ['$scope', 'diagrams', function($scope, diagrams) {
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
        /**
         * Liefert ein bestimmtes öffentliches Diagramm (abhängig von der ID der hinterlegten Parameter der URL)
         * @param {Object} $stateParams
         * @param {Object} localStorageService
         * @param {Object} diagramsFactory
         */
        diagram: ['$stateParams', 'localStorageService', 'diagramsFactory', function($stateParams, localStorageService, diagramsFactory) {
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
  /**
   * Handler für alle HTTP-Anfragen und Antwotrten. Sendet das Token mit und Leitet bei falschem Login den Benutzer um.
   * @param {Object} $q ermöglicht asynchrones Aufrufen
   * @param {Object} $injector empfängt Objektinstanzen des Providers
   * @param {Object} localStorageService
   */
  $httpProvider.interceptors.push(['$q', '$injector', 'localStorageService', function($q, $injector, localStorageService) {
    return {
      /**
       * Setzt das Token im HTTP-Header beim Senden einer Anfrage.
       * @param {Object} config
       */
      request: function(config) {
        config.headers = config.headers || {};
        if (localStorageService.get('token')) {
          config.headers['x-access-token'] = localStorageService.get('token');
        }
        return config;
      },
      /**
       * Ist die Antwort Unauthorized oder Forbidden wird der Nutzer zurück zum SignIn geleitet
       * @param {Object} response
       */
      responseError: function(response) {
        if(response.status === 401 || response.status === 403) {
          $injector.get('$state').go('signIn');
        }
        return $q.reject(response);
      }
    };
  }]);
}])
/**
 * Controller für den Hauptscope. Liefert die Gunrdfunktionen für die Anwendung.
 * @param {Object} $rootScope
 * @param {Object} userFactory
 */
.controller('brainworksCtrl', ['$rootScope', 'userFactory', function($rootScope, userFactory) {
  /**
   * Fragt beim Server an, ob der Benutzer eingeloggt ist und
   * setzt ein entsprechendes Falg im Root-Scope. Um dem Benutzer
   * Zugang auf andere Seiten zu gewährleisten.
   * @param {Object} res
   */
  userFactory.checkLoggedIn().then(function(res) {
    $rootScope.isAuthentificated = res.data.success;
  });
}])
/**
 * Controller für die Ansicht eines öffentlichen Diagrammes.
 * @param {Object} $scope
 * @param {Object} $state
 * @param {Object} localStorageService
 * @param {Object} diagramsFactory
 * @param {Object} diagram
 */
.controller('publicDiagramCtrl', ['$scope', '$state', 'localStorageService', 'diagramsFactory', 'diagram', function ($scope, $state, localStorageService, diagramsFactory, diagram) {
  $scope.diagram = diagram;
  $scope.comment = '';
  $scope.elementId = 1;
  $scope.shapes = [];
  /**
   * Alle Elemente werden aus dem Diagramm in den Scope gelesen und Objekte für diese angelegt.
   * @param {Object} shape
   */
  angular.forEach($scope.diagram.shapes, function(shape) {
    var tmp = new window[shape._type]();
    tmp.applyJSON(shape);
    tmp.id = $scope.elementId;
    $scope.elementId++;
    $scope.shapes.push(tmp);
  });
  /**
   * Funktion zur Rückleitung zur Startseite
   */
  $scope.back = function() {
    $state.go('home');
  };
  /**
   * Fügt einem bestimmten Diagramm einen Kommentar hinzu
   * @param comment
   * @param {Object} diagramId
   */
  $scope.addComment = function(comment, diagramId) {
    /**
     * Fügt dem Diagramm ein Kommentar hinzu. Bei Erfolg wird das Formular
     * wieder zurückgesetzt, sodass ein neuer Kommentar eingegeben werden kann.
     * @param {Object} response
     */
    diagramsFactory.addComment(comment, diagramId, localStorageService.get('userId')).success(function(response) {
      if(response.success) {
        $scope.diagram.comments.push(response.comment);
        $scope.comment = '';
        $scope.commentDiagramForm.$setPristine();
        $scope.commentDiagramForm.$setUntouched();
      }
    });
  };
}]);