angular.module('brainworks.diagram')
.controller('designerCtrl', ['$scope', 'diagram', function ($scope, diagram) {
  $scope.oneAtATime = true;
  $scope.diagramTypes = [{name: 'Klassendiagramme', shapes: [{type: 'ActiveClass', name: 'Aktive Klasse'}, {type: 'Class', name: 'Klasse'}, {type: 'AbstractClass', name: 'Abstrakte Klasse'}, {type: 'Notice', name: 'Notiz'}]}];
  $scope.diagram = diagram;
  $scope.shapes = [];
}])
.directive('designer', function() {
  return {
    restrict: 'E',
    replace: true,
    template: '<canvas class="designer" height="5000px" width="5000px"></canvas>',
    link: function(scope, element, attr) {
      var selected = null;
      var positionX = 0;
      var positionY = 0;
      var drag = false;
      var resize = false;
      $(element).droppable({
        accept: '.designer-element',
        drop: function(event, ui) {
          console.log(ui);
          var y = ui.helper.position().top - $(element).parent().offset().top;
          var x = ui.helper.position().left - $(element).parent().offset().left;
          scope.shapes.push(new window[ui.helper.attr('type')](x, y, 150, 100, ui.helper.attr('name')));
          draw();
        },
        over: function(event, ui) {
          ui.helper.css('cursor', 'copy');
        },
        out: function(event, ui) {
          ui.helper.css('cursor', 'no-drop');
        }
      });
      var draw = function() {
        var context = element[0].getContext('2d');
        context.clearRect(0, 0, 5000, 5000);
        angular.forEach(scope.shapes, function(value) {
          value.draw(element[0]);
        });
        if(angular.isDefined(selected) && selected !== null) {
          context.save();
          context.beginPath();
          context.strokeStyle = 'gray';
          context.fillStyle = 'gray';
          context.lineWidth = 1;
          context.setLineDash([5, 2]);
          context.strokeRect(selected.getX() - 5, selected.getY() - 5, selected.getWidth() + 10, selected.getHeight() + 10);
          context.setLineDash([]);
          context.fillRect(selected.getX() - 8, selected.getY() - 8, 6, 6);
          context.fillRect(selected.getX() - 8, selected.getY() + (selected.getHeight()/2) - 2, 6, 6);
          context.fillRect(selected.getX() - 8, selected.getY() + selected.getHeight() + 2, 6, 6);
          context.fillRect(selected.getX() + (selected.getWidth()/2) - 2, selected.getY() + selected.getHeight() + 2, 6, 6);
          context.fillRect(selected.getX() + selected.getWidth() + 2, selected.getY() + selected.getHeight() + 2, 6, 6);
          context.fillRect(selected.getX() + selected.getWidth() + 2, selected.getY() + (selected.getHeight()/2) - 2, 6, 6);
          context.fillRect(selected.getX() + selected.getWidth() + 2, selected.getY() - 8, 6, 6);
          context.fillRect(selected.getX() + (selected.getWidth()/2) - 2, selected.getY() - 8, 6, 6);
          context.closePath();
          context.stroke();
          context.restore();
        }
      };
      element.on('mousedown', function(event) {
        var result = $.grep(scope.shapes, function(shape) { return event.layerX >= shape.getX() - 8 && event.layerX <= (shape.getX() + shape.getWidth() + 8) && event.layerY >= shape.getY() - 8 && event.layerY <= (shape.getY() + shape.getHeight() + 8); });
        selected = result[0];
        positionX = event.layerX;
        positionY = event.layerY;
        if(angular.isDefined(selected) && selected !== null && positionX >= selected.getX() && positionX <= (selected.getX() + selected.getWidth()) && positionY >= selected.getY() && positionY <= (selected.getY() + selected.getHeight())) {
          drag = true;
        } else if(angular.isDefined(selected) && selected !== null) {
          resize = true;
        }
        draw();
      });
      element.on('doubelclick', function(event) {
        var result = $.grep(scope.shapes, function(shape) { return event.layerX >= shape.getX() && event.layerX <= (shape.getX() + shape.getWidth()) && event.layerY >= shape.getY() && event.layerY <= (shape.getY() + shape.getHeight()); });
        if(result.length !== 0) {
          console.log(result[0]);
        }
      });
      element.on('mousemove', function(event) {
        if(angular.isDefined(selected) && selected !== null) {
          var cursor = 'initial';
          if(event.layerX >= selected.getX() && event.layerX <= (selected.getX() + selected.getWidth()) && event.layerY >= selected.getY() && event.layerY <= (selected.getY() + selected.getHeight())) {
            cursor = 'move'; // Bewegungscursor
          } else if(
            event.layerX >= selected.getX() - 8 && event.layerX <= selected.getX() - 2 && event.layerY >= selected.getY() - 8 && event.layerY <= selected.getY() - 2 ||
            event.layerX >= selected.getX() + selected.getWidth() + 2 && event.layerX <= selected.getX() + selected.getWidth() + 8 && event.layerY >= selected.getY() + selected.getHeight() + 2 && event.layerY <= (selected.getY() + selected.getHeight() + 8)
          ) {
            cursor = 'se-resize'; // Oben-Links oder Unten-Rechts Größenänderungscursor
          } else if(
            event.layerX >= selected.getX() + selected.getWidth() + 2 && event.layerX <= selected.getX() + selected.getWidth() + 8 && event.layerY >= selected.getY() - 8 && event.layerY <= selected.getY() - 2 ||
            event.layerX >= selected.getX() - 8 && event.layerX <= selected.getX() - 2 && event.layerY >= selected.getY() + selected.getHeight() + 2 && event.layerY <= (selected.getY() + selected.getHeight() + 8)
          ) {
            cursor = 'sw-resize'; // Oben-Rechts oder Unten-Links Größenänderungscursor
          } else if(
            event.layerX >= selected.getX() - 8 && event.layerX <= selected.getX() - 2 && event.layerY >= selected.getY() + (selected.getHeight()/2) - 2 && event.layerY <= selected.getY() + (selected.getHeight()/2) + 4 ||
            event.layerX >= selected.getX() + selected.getWidth() + 2 && event.layerX <= selected.getX() + selected.getWidth() + 8 && event.layerY >= selected.getY() + (selected.getHeight()/2) - 2 && event.layerY <= selected.getY() + (selected.getHeight()/2) + 4
          ) {
            cursor = 'e-resize'; // Rechts oder Links Größenänderungscursor
          } else if(
            event.layerX >= selected.getX() + (selected.getWidth()/2) - 2 && event.layerX <= selected.getX() + (selected.getWidth()/2) + 4 && event.layerY >= selected.getY() - 8 && event.layerY <= selected.getY() - 2 ||
            event.layerX >= selected.getX() + (selected.getWidth()/2) - 2 && event.layerX <= selected.getX() + (selected.getWidth()/2) + 4 && event.layerY >= selected.getY() + selected.getHeight() + 2 && event.layerY <= (selected.getY() + selected.getHeight() + 8)
          ) {
            cursor = 'n-resize'; // Oben oder Unten Größenänderungscursor
          }
          element.css({
            cursor: cursor
          });
          if(resize) {
            var moveX = 0;
            var moveY = 0;
            var x = selected.getX();
            var y = selected.getY();
            if(event.layerX >= selected.getX() - 8 && event.layerX <= selected.getX() - 2 && event.layerY >= selected.getY() - 8 && event.layerY <= selected.getY() - 2) {
              // TODO vergrößerung in x und y oben links
            } else if(event.layerX >= selected.getX() + selected.getWidth() + 2 && event.layerX <= selected.getX() + selected.getWidth() + 8 && event.layerY >= selected.getY() + selected.getHeight() + 2 && event.layerY <= (selected.getY() + selected.getHeight() + 8)){
              // TODO vergrößerung in x und y unten rechts
            } else if(event.layerX >= selected.getX() + selected.getWidth() + 2 && event.layerX <= selected.getX() + selected.getWidth() + 8 && event.layerY >= selected.getY() - 8 && event.layerY <= selected.getY() - 2) {
              // TODO vergrößerung in x und y oben rechts
            } else if(event.layerX >= selected.getX() - 8 && event.layerX <= selected.getX() - 2 && event.layerY >= selected.getY() + selected.getHeight() + 2 && event.layerY <= (selected.getY() + selected.getHeight() + 8)) {
              // TODO vergrößerung in x und y unten links
            } else if(event.layerX >= selected.getX() - 8 && event.layerX <= selected.getX() - 2 && event.layerY >= selected.getY() + (selected.getHeight()/2) - 2 && event.layerY <= selected.getY() + (selected.getHeight()/2) + 4) {
              // TODO vergrößerung in x links
            } else if(event.layerX >= selected.getX() + selected.getWidth() + 2 && event.layerX <= selected.getX() + selected.getWidth() + 8 && event.layerY >= selected.getY() + (selected.getHeight()/2) - 2 && event.layerY <= selected.getY() + (selected.getHeight()/2) + 4) {
              // TODO vergrößerung in x rechts
            } else if(event.layerX >= selected.getX() + (selected.getWidth()/2) - 2 && event.layerX <= selected.getX() + (selected.getWidth()/2) + 4 && event.layerY >= selected.getY() - 8 && event.layerY <= selected.getY() - 2) {
              //moveY = event.layerY - (selected.getY() + selected.getHeight());
            } else if(event.layerX >= selected.getX() + (selected.getWidth()/2) - 2 && event.layerX <= selected.getX() + (selected.getWidth()/2) + 4 && event.layerY >= selected.getY() + selected.getHeight() + 2 && event.layerY <= (selected.getY() + selected.getHeight() + 8)) {
              moveY = event.layerY - (selected.getY() + selected.getHeight());
            }
            selected.setX(x);
            selected.setY(y);
            selected.setWidth(selected.getWidth() + moveX);
            selected.setHeight(selected.getHeight() + moveY);
          } else if(drag) {
            selected.setX(selected.getX() + event.layerX - positionX);
            selected.setY(selected.getY() + event.layerY - positionY);
            positionX = event.layerX;
            positionY = event.layerY;
          }
          if(drag || resize) {
            draw();
          }
        }
      });
      element.on('mouseup', function(event) {
        drag = false;
        resize = false;
      });
      draw();
    }
  };
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
          ui.helper.css('cursor', 'no-drop');
        },
        stop: function(event, ui) {
          ui.helper.css('cursor', 'initial');
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