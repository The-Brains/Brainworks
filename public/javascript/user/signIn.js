/**
 * Logik hinter dem Einloggen eines Benutzers
 */
angular.module('brainworks.user')
/**
 * Controller für das Einloggen eines Benutzers.
 * @param {Object} $scope  Der Scope an welchem die Funktionalitäten definiert werden
 * @param {Object} $rootScope  Der Root-Scope der Anwendung, welcher für alle anderen Scopes zugänglich ist
 * @param {Object} $state  Der State-Service zum Umleiten auf eine andere Seite
 * @param {Object} userFactory  Die Factory für die Benutzerdaten
 * @param {Object} localStorageService  Der Service zum Speichern und Laden von Informationen im Local-Storage
 */
.controller('signInCtrl', ['$scope', '$rootScope', '$state', 'userFactory', 'localStorageService', function($scope, $rootScope, $state, userFactory, localStorageService) {
  $scope.user = {};
  $scope.formErrors = [];
  /**
   * LogIn des Users
   * @param {Object} user  Das Objekt mit den Benutzerinformationen bentötig für den Login
   */
  $scope.signIn = function(user) {
    var password = '';
    if(angular.isDefined(user.password)) {
      password = CryptoJS.SHA3(user.password, { outputLength: 512 }).toString();
    }
    /**
     * Noch dem erfolgreichen LogIn werden UserId und Usertoken gesetzt.
     * Die Nutzerauthentifikation wird auf true gesetzt und die Diagramme im Profil werden angezeigt
     * @param {Object} response  Das Objekt mit den Antwortdaten auf die Anfrage
     */
    userFactory.signIn(user.username, password).success(function(response) {
      if(response.success) {
        localStorageService.set('token', response.token);
        localStorageService.set('userId', response.userId);
        $rootScope.isAuthentificated = true;
        $state.go('profile.diagrams');
      } else {
        $scope.formErrors.push(response.message);
      }
    });
  };
  /**
   * Aktualisierung der Seite(entfernen der Fehlermeldung) nach dem Schließen der Fehlermeldung
   * @param {number} index  Der Index der Fehlermeldung im Array
   */
  $scope.closeError = function(index) {
    $scope.formErrors.splice(index, 1);
  };
}]);