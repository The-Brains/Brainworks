/**
 * Einloggen mit Username und Password
 */
angular.module('brainworks.user')
.controller('signInCtrl', ['$scope', '$rootScope', '$state', 'userFactory', 'localStorageService',
  /**
   * LogIn Validierungsprüfung
   * @param $scope
   * @param $rootScope
   * @param $state
   * @param userFactory
   * @param localStorageService
   */
  function($scope, $rootScope, $state, userFactory, localStorageService) {
  $scope.user = {};
  $scope.formErrors = [];
  $scope.signIn =
    /**
     * LogIn des Users
     * @param user
     */
    function(user) {
    var password = '';
    if(angular.isDefined(user.password)) {
      password = CryptoJS.SHA3(user.password, { outputLength: 512 }).toString();
    }
    userFactory.signIn(user.username, password).success(
      /**
       * Noch dem erfolgreichen LogIn werden UserId und Usertoken gesetzt.
       * Die Nutzerauthentifikation wird auf true gesetzt und die Diagramme im Profil werden angezeigt
       * @param response
       */
      function(response) {
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
  $scope.closeError =
    /**
     * Aktualisierung der Seite(entfernen der Fehlermeldung) nach dem Schließen der Fehlermeldung
     * @param index
     */
    function(index) {
    $scope.formErrors.splice(index, 1);
  };
}]);