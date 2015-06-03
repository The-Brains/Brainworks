/**
 * New node file
 */
angular.module('brainworks.diagram')
.factory('diagramInformationFactory', ['$http', 'localStorageService', function($http, localStorageService) {
  return {
    /**
     * @param id
     */
    get: function(id) {
      return $http.get('/diagram/' + localStorageService.get('userId') + '/diagramInformation/' + id).then(function(res) {
        return res.data;
      });
    },
    /**
     * @param diagram
     */
    save: function(diagram) {
      return $http.put('/diagram/' + localStorageService.get('userId') + '/diagram/', diagram);
    }
  };
}])
.controller('diagramInformationCtrl', ['$scope', '$state', 'localStorageService', 'diagram', 'diagramInformationFactory', function($scope, $state, localStorageService, diagram, diagramInformationFactory) {
  $scope.diagram = diagram;
  $scope.cancel = function() {
    $state.go('profile.diagrams');
  };
  /**
   * @param diagram
   */
  $scope.save = function(diagram) {
    diagramInformationFactory.save(diagram).success(function(data) {
      if(data.success) {
        $state.go('diagram', {id: data.diagramId});
      }
    });
  };
}]);