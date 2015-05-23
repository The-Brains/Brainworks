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
      // TODO per attribut den array mit den shapes oder das object des diagrammes aus dem model binden und per scope.$watch
      // darauf achten, wenn aendernungen stattfinden und dann einen redraw anfordern
    }
  }
})
.directive('designerElement', function($document) {
  return {
    restrict: 'E',
    replace: true,
    template: '<canvas class="designer-element"></canvas>',
    link: function(scope, element, attr) {
      var offsetX, offsetY;
      element.on('mouseover', function(event) {
        element.addClass('designer-element-active');
      });
      element.on('mouseout', function(event) {
        element.removeClass('designer-element-active');
      });
      element.on('mousedown', function(event) {
        event.preventDefault();
        clonedElement = element.clone();
        element.removeClass('designer-element-active');
        $('#designerContainer').append(clonedElement);
        offsetX = element.prop('offsetWidth')/2;
        offsetY = element.prop('offsetHeight')/2;
        clonedElement.css({
          position: 'absolute',
          top: event.pageY - offsetY + 'px',
          left: event.pageX - offsetX + 'px'
        });
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });
      function mousemove(event) {
        console.log(event);
        clonedElement.css({
          position: 'absolute',
          top: event.pageY - offsetY + 'px',
          left:  event.pageX - offsetX + 'px'
        });
        clonedElement.addClass('designer-element-active');
      }
      function mouseup(event) {
        console.log(event);
        clonedElement.remove();
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
      }
    }
  };
});