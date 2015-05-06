/**
 * New node file
 */
angular.module('brainworks.user', [])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('profile.settings', {
      url: '/settings',
      templateUrl: '/user/settings'
    })
    // TODO hier und beim einloggen muss ein redirect durchgefuehrt werden
    .state('profile.logout', {
      url: '/logout',
      templateUrl: '/home'
    });
}]);