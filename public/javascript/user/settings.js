/**
 * Zuordnung der Nutzer- und Profileinstellungen
 */
angular.module('brainworks.user')
.factory('userSettingsFactory', ['$http',
  /**
   * Löschen, Hinzufügen und Laden von Nutzerdaten
   * @param {Object} $http
   */
  function($http){
  return {
    loadUserData:
      /**
       * Liefert die lokalen Daten eines bestimmten Nutzers
       * @param {Number} userId
       */
      function(userId) {
      return $http.get('/user/'+userId).then(
        /**
         * Liefert die Nutzerdaten
         * @param {Object} res
         */
        function(res) {
        return res.data;
      });
    },
    updateUser:
      /**
       * Fügt einen neuen Nutzer hinzu
       * @param {Number} userId
       * @param {Boolean} user
       */
      function(userId, user) {
      return $http.put('/user/'+userId, user);
    },
    changePassword:
      /**
       * Ändert das Passwort eines bestimmten Nutzers
       * @param {Number} userId
       * @param {String} newPassword
       */
      function(userId, newPassword) {
      return $http.post('/user/changePassword/'+userId, {password: newPassword});
    },
    deleteAccount:
      /**
       * Löscht bei bestätigter Anweisung einen bestimmten Nutzer
       * @param {Number} userId
       * @param {Object} assignment
       */
      function(userId, assignment) {
      return $http.post('/user/delete/'+userId, {assignment: assignment});
    }
  };
}])
.controller('settingsCtrl', ['$scope', '$rootScope', '$state', 'userSettingsFactory', 'localStorageService', 'user',
  /**
   *  Logik zum Löschen eines Nutzers, zu Passworteinstellungen und der Aktualisierung der Nutzer Id/ dem Nutzertoken
   * @param {Object} $scope
   * @param {Object} $rootScope
   * @param {Object} $state
   * @param {Boolean} userSettingsFactory
   * @param {Object} localStorageService
   * @param {Boolean} user
   */
  function($scope, $rootScope, $state, userSettingsFactory, localStorageService, user) {
  $scope.user = user;
  $scope.currentPw = '';
  $scope.newPw = '';
  $scope.newPwConfirmation = '';
  $scope.assignment = false;
  $scope.deleteFormErrors = [];
  $scope.createHash =
    /**
     * Liefert den verschlüsselten Hash des übergebenen Wertes(Passwort)
     * @param {String} value
     */
    function(value) {
    var val = angular.copy(value);
    var hash = '';
    if(angular.isDefined(val)) {
      hash = CryptoJS.SHA3(val, { outputLength: 512 }).toString();
    }
    return hash;
  };
  $scope.updateUser =
    /**
     * Nutzerdaten aktualisieren (NutzerId und Token)
     * @param {Boolean} user
     */
    function(user) {
    userSettingsFactory.updateUser(user._id, user).success(
      /**
       * Nach dem Update wird der Token und die UserID aus der Antwort der Updateanfrage entnommen und gesetzt
       * @param {Object} response
       */
      function(response) {
      if(response.success) {
        localStorageService.set('token', response.token);
        localStorageService.set('userId', response.userId);
      }
    });
  };
  $scope.changePassword =
    /**
     * Ändert das alte Passwort und verschlüsselt das neue Passwort
     * @param {Number} userId
     * @param {String} newPw
     */
    function(userId, newPw) {
    var password = '';
    if(angular.isDefined(newPw)) {
      password = CryptoJS.SHA3(newPw, { outputLength: 512 }).toString();
    }
    userSettingsFactory.changePassword(userId, password).success(
      /**
       * Leert die Profileinstellungen nach erfolgreicher Änderung des Passwortes
       * @param {Object} response
       */
      function(response) {
      if(response.success) {
        localStorageService.set('token', response.token);
        localStorageService.set('userId', response.userId);
        $scope.user.password = $scope.newPw;
        $scope.currentPw = '';
        $scope.newPw = '';
        $scope.newPwConfirmation = '';
        $scope.changePasswordForm.$setPristine();
        $scope.changePasswordForm.$setUntouched();
      }
    });
  };
  $scope.deleteAccount =
    /**
     * Löscht den Accout eines bestimmten Nutzers
     * @param {Number} userId
     * @param {Object} assignment
     */
    function(userId, assignment) {
    userSettingsFactory.deleteAccount(userId, assignment).success(
      /**
       * Entfernt token und UserId nach erfolgreichem Löschen
       * Wechseln zur LogIn Seite
       * @param {Object} response
       */
      function(response) {
      if(response.success) {
        $rootScope.isAuthentificated = false;
        localStorageService.remove('token');
        localStorageService.remove('userId');
        $state.go('signIn');
      } else {
        $scope.deleteFormErrors.push(response.message);
      }
    });
  };
  $scope.closeDeleteError =
    /**
     * Aktualisieren nach dem Schließen der Bestätigungsaufforderung zum Löschen des Profils
     * @param {Number} index
     */
    function(index) {
    $scope.deleteFormErrors.splice(index, 1);
  };
}]);