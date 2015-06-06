/**
 * Prüfung der Registrierungsdaten (Passwort & username).
 */
angular.module('brainworks.user')
/**
 * Prüfung des Benutzernamens und des Passwortes beim Registrieren eines Nutzers.
 * @param {Object} $scope
 * @param {Object} $rootScope
 * @param {Object} $state
 * @param {Object} userFactory
 * @param {Object} localStorageService
 */
.controller('signUpCtrl', ['$scope', '$rootScope', '$state', 'userFactory', 'localStorageService', function($scope, $rootScope, $state, userFactory, localStorageService) {
  $scope.user = {};
  $scope.emailConfirmation = '';
  $scope.passwordConfirmation = '';
  /**
   * Wenn der Nutzer hinterlegt ist, wird dessen Passwort entschlüsselt und abgeglichen. Er wird schließlich eingeloggt.
   * @param {Object} user
   */
  $scope.signUp = function(user) {
    var parameters = angular.copy(user);
    if(angular.isDefined(parameters.password)) {
      parameters.password = CryptoJS.SHA3(parameters.password, { outputLength: 512 }).toString();
    }
    /**
     * Nutzertoken und NutzerId werden gesetzt. Der Nutzer wird als authentifiziert markiert und zur Diagrammübersicht weitergeleitet.
     * @param {Object} response
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
 * Asynchrone Rückgabe des korrekten Benutzernamens.
 * @param {Object} $q
 * @param {Object} userFactory
 */
.directive('username', ['$q', 'userFactory', function($q, userFactory) {
  return {
    require: 'ngModel',
    /**
     * Asynchrones Prüfen auf korrektheit des Usernames.
     * @param {Object} scope
     * @param {Object} elm
     * @param {Object} attrs
     * @param {Object} ngModel
     */
    link: function(scope, elm, attrs, ngModel) {
      /**
       * $q.when wandelt ein 3rd party Objekt in ein $q promise,
       * da zunächst nicht sicher ist ob das übergebene Objekt ein Promise ist.
       * @param {string} modelValue
       * @param {string} viewValue
       */
      ngModel.$asyncValidators.username = function(modelValue, viewValue) {
        if(ngModel.$isEmpty(modelValue)) {
          return $q.when();
        }
        /* Definition eines promise */
        var def = $q.defer();
        /**
         * Wenn der Username korrekt ist wird def(das Promise) aufgelöst,
         * sonst wird def abgelehnt.
         * @param {Object} res
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