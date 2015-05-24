angular.module('brainworks.diagram')
.controller('designerCtrl', ['$scope', 'diagram', function ($scope, diagram) {
  $scope.oneAtATime = true;
  $scope.diagramTypes = [{name: 'Klassendiagramme', shapes: [{type: 'ActiveClass', name: 'Aktive Klasse'}, {type: 'Class', name: 'Klasse'}]}];
  $scope.diagram = diagram;
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
          console.log(ui);
          var y = ui.helper.position().top - $(element).parent().offset().top;
          var x = ui.helper.position().left - $(element).parent().offset().left;
          //scope.diagram.shapes.push({x: x, y: y});
          scope.shapes.push(new window[ui.helper.attr('type')](x, y, 150, 100, ui.helper.attr('name')));
          draw();
        }
      });
      var draw = function() {
        var context = element[0].getContext('2d');
        context.clearRect(0, 0, 5000, 5000);
        angular.forEach(scope.shapes, function(value) {
          value.draw(element[0]);
        });
      };
      draw();
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
      var shape = new window[attr.type](0, 0, 150, 100, attr.name);
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