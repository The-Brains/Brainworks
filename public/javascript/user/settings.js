/**
 * New node file
 */
angular.module('brainworks.user')
.controller('settingsCtrl', ['$scope', '$rootScope', '$state', 'userFactory', 'localStorageService', function($scope, $rootScope, $state, userFactory, localStorageService) {
  $scope.user= {surname: 'test', forename: 'test', password: 'test', email: 'test@test.de'};
}]);