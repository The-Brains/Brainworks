/**
 *
 */
angular.module('brainworks.user')
.controller('signInCtrl', ['$scope', '$rootScope', '$state', 'userFactory', 'localStorageService', 
  /**
   * 
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
     * 
     * @param user
     */
    function(user) {
    var password = '';
    if(angular.isDefined(user.password)) {
      password = CryptoJS.SHA3(user.password, { outputLength: 512 }).toString();
    }
    userFactory.signIn(user.username, password).success(
      /**
       * 
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
     * 
     * @param index
     */
    function(index) {
    $scope.formErrors.splice(index, 1);
  };
}]);