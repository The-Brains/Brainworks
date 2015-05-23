angular.module('brainworks.diagram')
.controller('designerCtrl', ['$scope', function ($scope) {
  $scope.oneAtATime = true;
  $scope.diagramTypes = [{name: 'Klassendiagramme', shapes: [{type: 'ActiveClass', name: 'Aktive Klasse'}]}];
  $scope.diagram = {title: 'Test', shapes: []};
  $scope.shapes = [];
}])
.directive('designer', function() {
  return {
    restrict: 'E',
    replace: true,
    template: '<canvas class="designer" height="5000px" width="5000px"></canvas>',
    link: function(scope, element, attr) {
      $(element).droppable({
        accept: '.designer-element',
        drop: function(event, ui) {
          console.log(event);
          console.log(ui);
          //scope.diagrams.shapes.push({});
          //scope.shapes.push();
        }
      });
      scope.$watch('shapes', function() {
        angular.forEach(scope.shapes, function(value) {
          value.draw(element[0]);
        });
      });
      // TODO per attribut den array mit den shapes oder das object des diagrammes aus dem model binden und per scope.$watch
      // darauf achten, wenn aendernungen stattfinden und dann einen redraw anfordern
    }
  }
})
.directive('designerElement', function($document) {
  return {
    restrict: 'E',
    replace: true,
    template: '<canvas class="designer-element" height="100" width="150"></canvas>',
    link: function(scope, element, attr) {
      var offsetX, offsetY;
      var shape = new window[attr.type](0, 0, 150, 100, 'black', 1);
      shape.draw(element[0]);
      $(element).draggable({
        helper: 'clone',
        appendTo: $('#designerContainer'),
        containment: $('#designerContainer'),
        start: function(event, ui) {
          shape.draw(ui.helper[0]);
        }
      });
      element.on('mouseover', function(event) {
        element.addClass('designer-element-active');
      });
      element.on('mouseout', function(event) {
        element.removeClass('designer-element-active');
      });
    }
  };
});