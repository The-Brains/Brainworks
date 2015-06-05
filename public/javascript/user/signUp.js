/**
 * Prüfung der Registrierungsdaten (Passwort & username).
 */
angular.module('brainworks.user')
.controller('signUpCtrl', ['$scope', '$rootScope', '$state', 'userFactory', 'localStorageService',
  /**
   * Prüfung des Benutzernamens und des Passwortes beim Registrieren eines Nutzers.
   * @param {Object} $scope
   * @param $rootScope
   * @param {Object} $state
   * @param {Boolean} userFactory
   * @param {Object} localStorageService
   */
  function($scope, $rootScope, $state, userFactory, localStorageService) {
  $scope.user = {};
  $scope.emailConfirmation = '';
  $scope.passwordConfirmation = '';
  $scope.signUp =
    /**
     * Wenn der Nutzer hinterlegt ist, wird dessen Passwort entschlüsselt und abgeglichen. Er wird schließlich eingeloggt.
     * @param {Boolean} user
     */
    function(user) {
    var parameters = angular.copy(user);
    if(angular.isDefined(parameters.password)) {
      parameters.password = CryptoJS.SHA3(parameters.password, { outputLength: 512 }).toString();
    }
    userFactory.createUser(parameters).success(
      /**
       * Nutzertoken und NutzerId werden gesetzt. Der Nutzer wird als authentifiziert markiert und zur Diagrammübersicht weitergeleitet.
       * @param {Object} response
       */
      function(response) {
      if(response.success) {
        localStorageService.set('token', response.token);
        localStorageService.set('userId', response.userId);
        $rootScope.isAuthentificated = true;
        $state.go('profile.diagrams');
      }
    });
  };
}])
.directive('username', ['$q', 'userFactory',
  /**
   * Asynchrone Rückgabe des korrekten Benutzernamens.
   * @param $q
   * @param {Boolean} userFactory
   */
  function($q, userFactory) {
  return {
    require: 'ngModel',
    link:
      /**
       * Asynchrones Prüfen auf korrektheit des Usernames.
       * @param {Object} scope
       * @param elm
       * @param {Object} attrs
       * @param {Object} ngModel
       */
      function(scope, elm, attrs, ngModel) {
      ngModel.$asyncValidators.username =
        /**
         * $q.when wandelt ein 3rd party Objekt in ein $q promise,
         * da zunächst nicht sicher ist ob das übergebene Objekt ein Promise ist.
         * @param modelValue
         * @param viewValue
         */
        function(modelValue, viewValue) {
        if(ngModel.$isEmpty(modelValue)) {
          return $q.when();
        }
        /* Definition eines promise */
        var def = $q.defer();
        userFactory.checkUsername(modelValue).success(
          /**
           * Wenn der Username korrekt ist wird def(das Promise) aufgelöst,
           * sonst wird def abgelehnt.
           * @param {Object} res
           */
          function(res) {
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