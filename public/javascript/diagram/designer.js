angular.module('brainworks.diagram')
.controller('designerCtrl', ['$scope', function ($scope) {
  $scope.oneAtATime = true;
  $scope.groups = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'template'
    },{
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];
}])
.directive('designer', function() {
  // TODO hier wird ein canvas element mit den notwendigen listeners definiert. 
  //es erhält alle shapes und relations und ruft bei diesen die zeichnen funktion auf
  
})
.directive('designerElement', function() {
  // TODO hier wird ein canvas element mit den notwendigen listeners definiert. diese direktive wird in der seiten auswahl verndet um die einzelnen elemente zu auswahl zur verfügung zu stellen
});