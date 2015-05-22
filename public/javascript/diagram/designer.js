angular.module('brainworks.diagram')
.controller('designerCtrl', ['$scope', function ($scope) {
  $scope.oneAtATime = true;
  $scope.groups = [{}];
  $scope.diagram = {title: 'Test'};
}])
.directive('designer', function() {
  // TODO hier wird ein canvas element mit den notwendigen listeners definiert. 
  //es erhält alle shapes und relations und ruft bei diesen die zeichnen funktion auf
  return {
    restrict: 'E',
    replace: true,
    template: '<canvas class="designer"></canvas>',
    link: function() {
      
    }
  }
})
.directive('designerElement', function() {
  // TODO hier wird ein canvas element mit den notwendigen listeners definiert. diese direktive wird in der seiten auswahl verndet um die einzelnen elemente zu auswahl zur verfügung zu stellen
  return {
    restrict: 'E',
    replace: true,
    template: '<canvas class="designer-element"></canvas>',
    link: function(scope, element, attr) {
      console.log(scope);
    }
  };
});