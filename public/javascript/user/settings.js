/**
 * Zuordnung der Nutzer- und Profileinstellungen
 */
angular.module('brainworks.user')
/**
 * Löschen, Hinzufügen und Laden von Nutzerdaten
 * @param {Object} $http
 */
.factory('userSettingsFactory', ['$http', function($http){
  return {
    /**
     * Liefert die lokalen Daten eines bestimmten Nutzers
     * @param {number} userId
     */
    loadUserData: function(userId) {
      /**
       * Liefert die Nutzerdaten
       * @param {Object} res
       */
      return $http.get('/user/'+userId).then(function(res) {
        return res.data;
      });
    },
    /**
     * Fügt einen neuen Nutzer hinzu
     * @param {string} userId
     * @param {Object} user
     */
    updateUser: function(userId, user) {
      return $http.put('/user/'+userId, user);
    },
    /**
     * Ändert das Passwort eines bestimmten Nutzers
     * @param {string} userId
     * @param {string} newPassword
     */
    changePassword: function(userId, newPassword) {
      return $http.post('/user/changePassword/'+userId, {password: newPassword});
    },
    /**
     * Löscht bei bestätigter Anweisung einen bestimmten Nutzer
     * @param {string} userId
     * @param {Object} assignment
     */
    deleteAccount: function(userId, assignment) {
      return $http.post('/user/delete/'+userId, {assignment: assignment});
    }
  };
}])
/**
 * Logik zum Löschen eines Nutzers, zu Passworteinstellungen und der Aktualisierung der Nutzer Id/ dem Nutzertoken
 * @param {Object} $scope
 * @param {Object} $rootScope
 * @param {Object} $state
 * @param {Object} userSettingsFactory
 * @param {Object} localStorageService
 * @param {Object} user
 */
.controller('settingsCtrl', ['$scope', '$rootScope', '$state', 'userSettingsFactory', 'localStorageService', 'user', function($scope, $rootScope, $state, userSettingsFactory, localStorageService, user) {
  $scope.user = user;
  $scope.currentPw = '';
  $scope.newPw = '';
  $scope.newPwConfirmation = '';
  $scope.assignment = false;
  $scope.deleteFormErrors = [];
  /**
   * Liefert den verschlüsselten Hash des übergebenen Wertes(Passwort)
   * @param {string} value
   */
  $scope.createHash = function(value) {
    var val = angular.copy(value);
    var hash = '';
    if(angular.isDefined(val)) {
      hash = CryptoJS.SHA3(val, { outputLength: 512 }).toString();
    }
    return hash;
  };
  /**
   * Nutzerdaten aktualisieren (NutzerId und Token)
   * @param {Object} user
   */
  $scope.updateUser = function(user) {
    /**
     * Nach dem Update wird der Token und die UserID aus der Antwort der Updateanfrage entnommen und gesetzt
     * @param {Object} response
     */
    userSettingsFactory.updateUser(user._id, user).success(function(response) {
      if(response.success) {
        localStorageService.set('token', response.token);
        localStorageService.set('userId', response.userId);
      }
    });
  };
  /**
   * Ändert das alte Passwort und verschlüsselt das neue Passwort
   * @param {number} userId
   * @param {String} newPw
   */
  $scope.changePassword = function(userId, newPw) {
    var password = '';
    if(angular.isDefined(newPw)) {
      password = CryptoJS.SHA3(newPw, { outputLength: 512 }).toString();
    }
    /**
     * Leert die Profileinstellungen nach erfolgreicher Änderung des Passwortes
     * @param {Object} response
     */
    userSettingsFactory.changePassword(userId, password).success(function(response) {
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
  /**
   * Löscht den Accout eines bestimmten Nutzers
   * @param {string} userId
   * @param {Object} assignment
   */
  $scope.deleteAccount = function(userId, assignment) {
    /**
     * Entfernt token und UserId nach erfolgreichem Löschen
     * Wechseln zur LogIn Seite
     * @param {Object} response
     */
    userSettingsFactory.deleteAccount(userId, assignment).success(function(response) {
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
  /**
   * Aktualisieren nach dem Schließen der Bestätigungsaufforderung zum Löschen des Profils
   * @param {number} index
   */
  $scope.closeDeleteError = function(index) {
    $scope.deleteFormErrors.splice(index, 1);
  };
}]);