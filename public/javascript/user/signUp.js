/**
 * Logik hinter der Registrierung
 */
angular.module('brainworks.user')
/**
 * Controller für die Registierung eines Benutzers.
 * @param {Object} $scope  Der Scope an welchem die Funktionalitäten definiert werden
 * @param {Object} $rootScope  Der Root-Scope der Anwendung, welcher für alle anderen Scopes zugänglich ist
 * @param {Object} $state  Der State-Service zum Umleiten auf eine andere Seite
 * @param {Object} userFactory  Die Factory für die Benutzerdaten
 * @param {Object} localStorageService  Der Service zum Speichern und Laden von Informationen im Local-Storage
 */
.controller('signUpCtrl', ['$scope', '$rootScope', '$state', 'userFactory', 'localStorageService', function($scope, $rootScope, $state, userFactory, localStorageService) {
  $scope.user = {};
  $scope.emailConfirmation = '';
  $scope.passwordConfirmation = '';
  /**
   * Funktion zum Registrieren eines Benutzers-
   * @param {Object} user  Das Objekt mit den Benutzerdaten
   */
  $scope.signUp = function(user) {
    var parameters = angular.copy(user);
    if(angular.isDefined(parameters.password)) {
      parameters.password = CryptoJS.SHA3(parameters.password, { outputLength: 512 }).toString();
    }
    /**
     * Nutzertoken und NutzerId werden gesetzt. Der Nutzer wird als authentifiziert markiert und zur Diagrammübersicht weitergeleitet.
     * @param {Object} response  Das Objekt mit den Antwortdaten auf die Anfrage
     */
    userFactory.createUser(parameters).success(function(response) {
      if(response.success) {
        localStorageService.set('token', response.token);
        localStorageService.set('userId', response.userId);
        $rootScope.isAuthentificated = true;
        $state.go('profile.diagrams');
      }
    });
  };
}])
/**
 * Direktive für die Prüfung auf freie Benutzernamen
 * @param {Object} $q  Der Service ermöglicht asynchrones Aufrufen
 * @param {Object} userFactory  Die Factory für die Benutzerdaten
 */
.directive('username', ['$q', 'userFactory', function($q, userFactory) {
  return {
    require: 'ngModel',
    /**
     * Erstellung der Direktive und implementierung der entsprechenden Funktionalitäten.
     * @param {Object} scope  Der Scope der Direktive
     * @param {Object} elm  Das HTML-Element
     * @param {Object} attrs  Die Attribute des HTML-Elements
     * @param {Object} ngModel  Das Model in denen die Daten gespeichert sind
     */
    link: function(scope, elm, attrs, ngModel) {
      /**
       * Asynchroner Validator für die Prüfung auf freie Benutzernamen registrieren
       * @param {string} modelValue  Der Wert im Model.
       * @param {string} viewValue  Der Wert im View.
       */
      ngModel.$asyncValidators.username = function(modelValue, viewValue) {
        if(ngModel.$isEmpty(modelValue)) {
          return $q.when();
        }
        /* Definition eines promise */
        var def = $q.defer();
        /**
         * Wenn der Username frei ist wird def(das Promise) aufgelöst,
         * sonst wird def abgelehnt.
         * @param {Object} res  Das Objekt mit den Antwortdaten auf die Anfrage
         */
        userFactory.checkUsername(modelValue).success(function(res) {
          if(res.available) {
            def.resolve();
          } else {
            def.reject();
          }
        });
        return def.promise;
      };
    }
  };
}]);