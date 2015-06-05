/**
 * Zuordnung der Nutzer- und Profileinstellungen
 */
angular.module('brainworks.user')
.factory('userSettingsFactory', ['$http',
  /**
   * Löschen, Hinzufügen und Laden von Nutzerdaten
   * @param $http
   */
  function($http){
  return {
    loadUserData:
      /**
       * Liefert die lokalen Daten eines bestimmten Nutzers
       * @param userId
       */
      function(userId) {
      return $http.get('/user/'+userId).then(
        /**
         * Liefert die Nutzerdaten
         * @param res
         */
        function(res) {
        return res.data;
      });
    },
    updateUser:
      /**
       * Fügt einen neuen Nutzer hinzu
       * @param userId
       * @param user
       */
      function(userId, user) {
      return $http.put('/user/'+userId, user);
    },
    changePassword:
      /**
       * Ändert das Passwort eines bestimmten Nutzers
       * @param userId
       * @param newPassword
       */
      function(userId, newPassword) {
      return $http.post('/user/changePassword/'+userId, {password: newPassword});
    },
    deleteAccount:
      /**
       * Löscht bei bestätigter Anweisung einen bestimmten Nutzer
       * @param userId
       * @param assignment
       */
      function(userId, assignment) {
      return $http.post('/user/delete/'+userId, {assignment: assignment});
    }
  };
}])
.controller('settingsCtrl', ['$scope', '$rootScope', '$state', 'userSettingsFactory', 'localStorageService', 'user',
  /**
   *  Logik zum Löschen eines Nutzers, zu Passworteinstellungen und der Aktualisierung der Nutzer Id/ dem Nutzertoken
   * @param $scope
   * @param $rootScope
   * @param $state
   * @param userSettingsFactory
   * @param localStorageService
   * @param user
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
     * @param user
     */
    function(user) {
    userSettingsFactory.updateUser(user._id, user).success(
      /**
       * Nach dem Update wird der Token und die UserID aus der Antwort der Updateanfrage entnommen und gesetzt
       * @param response
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
     * @param userId
     * @param newPw
     */
    function(userId, newPw) {
    var password = '';
    if(angular.isDefined(newPw)) {
      password = CryptoJS.SHA3(newPw, { outputLength: 512 }).toString();
    }
    userSettingsFactory.changePassword(userId, password).success(
      /**
       * Leert die Profileinstellungen nach erfolgreicher Änderung des Passwortes
       * @param response
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
     * @param userId
     * @param assignment
     */
    function(userId, assignment) {
    userSettingsFactory.deleteAccount(userId, assignment).success(
      /**
       * Entfernt token und UserId nach erfolgreichem Löschen
       * Wechseln zur LogIn Seite
       * @param response
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
     * @param index
     */
    function(index) {
    $scope.deleteFormErrors.splice(index, 1);
  };
}]);