/**
 * New node file
 */
angular.module('brainworks.diagram')
.factory('diagramInformationFactory', ['$http', function($http) {
  return {
    get: function(id) {
      return $http.get('/diagram/diagramInformation/' + id).then(function(res) {
        return res.data;
      });
    },
    save: function(diagram) {
      return $http.put('/diagram/diagram', diagram);
    }
  };
}])
.controller('diagramInformationCtrl', ['$scope', '$state', 'localStorageService', 'diagram', 'diagramInformationFactory', function($scope, $state, localStorageService, diagram, diagramInformationFactory) {
  $scope.diagram = diagram;
  $scope.cancel = function() {
    $state.go('profile.diagrams');
  };
  $scope.save = function(diagram) {
    diagram.authorId = localStorageService.get('userId');
    diagramInformationFactory.save(diagram).success(function(data) {
      if(data.success) {
        $state.go('diagram', {id: data.diagramId});
      }
    });
  };
}]);