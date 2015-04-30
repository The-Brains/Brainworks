/**
 * New node file
 */
var user = angular.module('brainworks.user', []);

diagram.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
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