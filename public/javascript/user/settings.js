/**
 * Logik hinter der Benutzereinstellungsverwaltung eines Benutzers.
 */
angular.module('brainworks.user')
/**
 * Factory zum Senden der Anfragen zum Löschen, Hinzufügen und Laden von Nutzerdaten
 * @param {Object} $http  Der HTTP-Service zum Senden von HTTP-Anfragen
 */
.factory('userSettingsFactory', ['$http', function($http) {
  return {
    /**
     * Liefert die Daten eines bestimmten Nutzers
     * @param {string} userId  Die ID des Benutzers zu welchem die Daten geladen werden sollen
     */
    loadUserData: function(userId) {
      /**
       * Liefert die Nutzerdaten
       * @param {Object} res  Das Objekt mit den Antwortdaten auf die Anfrage
       */
      return $http.get('/user/'+userId).then(function(res) {
        return res.data;
      });
    },
    /**
     * Ändert die Daten eines Benutzers
     * @param {string} userId  Die ID des Benutzers
     * @param {Object} user  Die geänderten Daten des Benutzers
     */
    updateUser: function(userId, user) {
      return $http.put('/user/'+userId, user);
    },
    /**
     * Ändert das Passwort eines bestimmten Nutzers
     * @param {string} userId  Die ID des Benutzers
     * @param {string} newPassword  Das neue Passwort des Benutzers
     */
    changePassword: function(userId, newPassword) {
      return $http.post('/user/changePassword/'+userId, {password: newPassword});
    },
    /**
     * Löscht bei bestätigter Anweisung einen bestimmten Nutzer
     * @param {string} userId  Die ID des Benutzers
     * @param {boolean} assignment  Flag, ob der Benutzer zustimmt oder nicht
     */
    deleteAccount: function(userId, assignment) {
      return $http.post('/user/delete/'+userId, {assignment: assignment});
    }
  };
}])
/**
 * Controller für die Verwaltung der Benutzereinstellungen. Definiert die Logik zum Löschen eines Nutzers,
 * zu Passworteinstellungen und der Aktualisierung der Benutzerinformationen.
 * @param {Object} $scope  Der Scope an welchem die Funktionalitäten definiert werden
 * @param {Object} $rootScope  Der Root-Scope der Anwendung, welcher für alle anderen Scopes zugänglich ist
 * @param {Object} $state  Der State-Service zum Umleiten auf eine andere Seite
 * @param {Object} userSettingsFactory  Die Factory für die Einstellungen eines Benutzers
 * @param {Object} localStorageService  Der Service zum Speichern und Laden von Informationen im Local-Storage
 * @param {Object} user  Der Benutzer zu welchem die Einstellungen verwaltet werden sollen
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
   * @param {string} value  Das Passwort aus dem der Hash erstellt werden soll
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
   * Nutzerdaten aktualisieren
   * @param {Object} user  Der Objekt mit den geänderten Benutzerdaten
   */
  $scope.updateUser = function(user) {
    /**
     * Sendet die Daten an den Server und bei erfolg wird der Token und die UserID neu gesetzt.
     * @param {Object} response  Das Objekt mit den Antwortdaten auf die Anfrage
     */
    userSettingsFactory.updateUser(user._id, user).success(function(response) {
      if(response.success) {
        localStorageService.set('token', response.token);
        localStorageService.set('userId', response.userId);
      }
    });
  };
  /**
   * Ändert das Passwort des Benutzers
   * @param {string} userId  Die ID des Benutzers für welchen das Passwort geändert werden soll
   * @param {string} newPw  Das neue Passwort für den Benutzer
   */
  $scope.changePassword = function(userId, newPw) {
    var password = '';
    if(angular.isDefined(newPw)) {
      password = CryptoJS.SHA3(newPw, { outputLength: 512 }).toString();
    }
    /**
     * Leert die Formularfelder nach erfolgreicher Änderung des Passwortes
     * @param {Object} response  Das Objekt mit den Antwortdaten auf die Anfrage
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
   * @param {string} userId  Die ID des Benutzers
   * @param {Object} assignment  Flag, ob der Benutzer zustimmt oder nicht
   */
  $scope.deleteAccount = function(userId, assignment) {
    /**
     * Entfernt token und UserId nach erfolgreichem Löschen
     * Wechseln zur LogIn Seite
     * @param {Object} response  Das Objekt mit den Antwortdaten auf die Anfrage
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
   * Aktualisierung der Seite(entfernen der Fehlermeldung) nach dem Schließen der Fehlermeldung
   * @param {number} index  Der Index der Fehlermeldung im Array
   */
  $scope.closeDeleteError = function(index) {
    $scope.deleteFormErrors.splice(index, 1);
  };
}]);