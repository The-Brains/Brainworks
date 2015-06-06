/**
 * Einloggen mit Username und Password
 */
angular.module('brainworks.user')
/**
 * LogIn Validierungsprüfung
 * @param {Object} $scope
 * @param {Object} $rootScope
 * @param {Object} $state
 * @param {Object} userFactory
 * @param {Object} localStorageService
 */
.controller('signInCtrl', ['$scope', '$rootScope', '$state', 'userFactory', 'localStorageService', function($scope, $rootScope, $state, userFactory, localStorageService) {
  $scope.user = {};
  $scope.formErrors = [];
  /**
   * LogIn des Users
   * @param {Object} user
   */
  $scope.signIn = function(user) {
    var password = '';
    if(angular.isDefined(user.password)) {
      password = CryptoJS.SHA3(user.password, { outputLength: 512 }).toString();
    }
    /**
     * Noch dem erfolgreichen LogIn werden UserId und Usertoken gesetzt.
     * Die Nutzerauthentifikation wird auf true gesetzt und die Diagramme im Profil werden angezeigt
     * @param {Object} response
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
   * @param {number} index
   */
  $scope.closeError = function(index) {
    $scope.formErrors.splice(index, 1);
  };
}]);