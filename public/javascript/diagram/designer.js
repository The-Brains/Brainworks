angular.module('brainworks.diagram')
.controller('designerCtrl', ['$scope', '$state', 'localStorageService', 'diagramsFactory', 'diagram', function ($scope, $state, localStorageService, diagramsFactory, diagram) {
  $scope.oneAtATime = true;
  $scope.diagramTypes = [{name: 'Klassendiagramme', shapes: [{type: 'ActiveClass', name: 'Aktive Klasse'}, {type: 'EmptyClass', name: 'Klasse'}, {type: 'AbstractClass', name: 'Abstrakte Klasse'}, {type: 'Comment', name: 'Kommentar'}, {type: 'Class', name: 'Klasse'}, {type: 'Inheritance', name: 'Vererbung'}, {type: 'Association', name: 'Assoziation'}, {type: 'UniDirectionalAssociation', name: 'Gerichtete Assoziation'}, {type: 'Aggregation', name: 'Aggregation'}, {type: 'Composition', name: 'Komposition'}, {type: 'Realization', name: 'Realisierung'}, {type: 'Dependency', name: 'Abhängigkeit'}, {type: 'Link', name: 'Verbinder'}]}];
  $scope.diagram = diagram;
  $scope.shapes = [];
  $scope.elementId = 1;
  angular.forEach($scope.diagram.shapes, function(shape) {
    var tmp = new window[shape._type];
    tmp.applyJSON(shape);
    tmp.id = $scope.elementId;
    $scope.elementId++;
    $scope.shapes.push(tmp);
  });
  $scope.back = function() {
    $state.go('profile.diagrams');
  };
  $scope.save = function(diagram) {
    var waitElement = $('#saveAnimation');
    var shapes = [];
    angular.forEach($scope.shapes, function(shape) {
      if(shape instanceof Shape) {
        shapes.push(shape.toJSON());
      }
    });
    diagram.shapes = shapes;
    waitElement.removeClass('hidden');
    var designerCanvas = $('.designer');
    var tmpCanvas = designerCanvas.clone();
    tmpCanvas.attr('height', '300px');
    tmpCanvas.attr('width', '700px');
    var img = new Image();
    img.onload = function() {
      tmpCanvas[0].getContext('2d').drawImage(img, 0, 0);
      var formData = new FormData();
      formData.append('thumbnail', tmpCanvas[0].toDataURL('image/png'));
      formData.append('diagram', JSON.stringify(diagram));
      diagramsFactory.saveDiagram(localStorageService.get('userId'), formData).success(function(response) {
        waitElement.addClass('hidden');
      });
    };
    img.src = designerCanvas[0].toDataURL();
  };
}])
.directive('designer', function() {
  return {
    restrict: 'E',
    replace: true,
    template: '<canvas class="designer" height="5000px" width="5000px" tabIndex="1"></canvas>',
    link: function(scope, element, attr) {
      var draw = function() {
        var context = element[0].getContext('2d');
        context.clearRect(0, 0, 5000, 5000);
        angular.forEach(scope.shapes, function(value) {
          value.draw(element[0]);
        });
        if(selected instanceof Shape && angular.isDefined(selected) && selected !== null) {
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
        } else if(angular.isDefined(selected) && selected !== null) {
          var deltaX = selected.getCoordsB()[0] - selected.getCoordsA()[0];
          var deltaY = selected.getCoordsB()[1] - selected.getCoordsA()[1];
          var length = Math.abs(Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2)));
          context.save();
          context.beginPath();
          context.strokeStyle = 'gray';
          context.translate(selected.getCoordsA()[0], selected.getCoordsA()[1]);
          context.rotate(Math.atan2(deltaY, deltaX));
          context.translate(-selected.getCoordsA()[0], -selected.getCoordsA()[1]);
          context.arc(selected.getCoordsA()[0] - 3, selected.getCoordsA()[1], 3, 0, 2*Math.PI);
          context.closePath();
          context.stroke();
          context.beginPath();
          context.arc(selected.getCoordsA()[0] + length + 3, selected.getCoordsA()[1], 3, 0, 2*Math.PI);
          context.closePath();
          context.stroke();
          context.restore();
        }
      };
      if(attr.editable) {
        var selected = null;
        var positionX = 0;
        var positionY = 0;
        var drag = false;
        var resize = false;
        var resizeDirection = '';
        var dragPoint = '';
        var clicks = 0;
        $(element).droppable({
          accept: '.designer-element',
          drop: function(event, ui) {
            var y = ui.helper.position().top - $(element).parent().offset().top;
            var x = ui.helper.position().left - $(element).parent().offset().left;
            scope.shapes.push(window[ui.helper.attr('type')].prototype instanceof Shape ? new window[ui.helper.attr('type')](scope.elementId, x, y, 140, 90, ui.helper.attr('name')) : new window[ui.helper.attr('type')](scope.elementId, [x, y + 45], [x + 140, y + 45], ui.helper.attr('name')));
            scope.elementId++;
            draw();
          },
          over: function(event, ui) {
            ui.helper.css('cursor', 'copy');
          },
          out: function(event, ui) {
            ui.helper.css('cursor', 'no-drop');
          }
        });
        element.on('mousedown', function(event) {
          clicks++;
          setTimeout(function() {
            clicks = 0;
          }, 400);
          var result = $.grep(scope.shapes, function(shape) {
            var isSelected = false;
            if(shape instanceof Shape) {
              isSelected = event.layerX >= shape.getX() - 8 && event.layerX <= (shape.getX() + shape.getWidth() + 8) && event.layerY >= shape.getY() - 8 && event.layerY <= (shape.getY() + shape.getHeight() + 8);
            } else {
              var context = element[0].getContext('2d');
              var deltaX = shape.getCoordsB()[0] - shape.getCoordsA()[0];
              var deltaY = shape.getCoordsB()[1] - shape.getCoordsA()[1];
              var length = Math.abs(Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2)));
              context.save();
              context.translate(shape.getCoordsA()[0], shape.getCoordsA()[1]);
              context.rotate(Math.atan2(deltaY, deltaX));
              context.translate(-shape.getCoordsA()[0], -shape.getCoordsA()[1]);
              context.beginPath();
              context.rect(shape.getCoordsA()[0], shape.getCoordsA()[1]-5, length, 10);
              isSelected = context.isPointInPath(event.layerX, event.layerY);
              context.closePath();
              context.beginPath();
              context.arc(shape.getCoordsA()[0] - 3, shape.getCoordsA()[1], 3, 0, 2*Math.PI);
              isSelected = isSelected || context.isPointInPath(event.layerX, event.layerY);
              context.closePath();
              context.beginPath();
              context.arc(shape.getCoordsA()[0] + length + 3, shape.getCoordsA()[1], 3, 0, 2*Math.PI);
              isSelected = isSelected || context.isPointInPath(event.layerX, event.layerY);
              context.closePath();
              context.restore();
            }
            return isSelected;
          });
          selected = result[0];
          if(clicks === 2) {
            clicks = 0;
            console.log('doubleclick');
          } else {
            positionX = event.layerX;
            positionY = event.layerY;
            if(selected instanceof Shape && angular.isDefined(selected) && selected !== null && positionX >= selected.getX() && positionX <= (selected.getX() + selected.getWidth()) && positionY >= selected.getY() && positionY <= (selected.getY() + selected.getHeight())) {
              drag = true;
            } else if(selected instanceof Shape && angular.isDefined(selected) && selected !== null) {
              resize = true;
              if(positionX >= selected.getX() - 8 && positionX <= selected.getX() - 2 && positionY >= selected.getY() - 8 && positionY <= selected.getY() - 2) {
                resizeDirection = 'up left';
              } else if(positionX >= selected.getX() + selected.getWidth() + 2 && positionX <= selected.getX() + selected.getWidth() + 8 && positionY >= selected.getY() + selected.getHeight() + 2 && positionY <= (selected.getY() + selected.getHeight() + 8)){
                resizeDirection = 'down right';
              } else if(positionX >= selected.getX() + selected.getWidth() + 2 && positionX <= selected.getX() + selected.getWidth() + 8 && positionY >= selected.getY() - 8 && positionY <= selected.getY() - 2) {
                resizeDirection = 'up right';
              } else if(positionX >= selected.getX() - 8 && positionX <= selected.getX() - 2 && positionY >= selected.getY() + selected.getHeight() + 2 && positionY <= (selected.getY() + selected.getHeight() + 8)) {
                resizeDirection = 'down left';
              } else if(positionX >= selected.getX() - 8 && positionX <= selected.getX() - 2 && positionY >= selected.getY() + (selected.getHeight()/2) - 2 && positionY <= selected.getY() + (selected.getHeight()/2) + 4) {
                resizeDirection = 'left';
              } else if(positionX >= selected.getX() + selected.getWidth() + 2 && positionX <= selected.getX() + selected.getWidth() + 8 && positionY >= selected.getY() + (selected.getHeight()/2) - 2 && positionY <= selected.getY() + (selected.getHeight()/2) + 4) {
                resizeDirection = 'right';
              } else if(positionX >= selected.getX() + (selected.getWidth()/2) - 2 && positionX <= selected.getX() + (selected.getWidth()/2) + 4 && positionY >= selected.getY() - 8 && positionY <= selected.getY() - 2) {
                resizeDirection = 'up';
              } else if(positionX >= selected.getX() + (selected.getWidth()/2) - 2 && positionX <= selected.getX() + (selected.getWidth()/2) + 4 && positionY >= selected.getY() + selected.getHeight() + 2 && positionY <= (selected.getY() + selected.getHeight() + 8)) {
                resizeDirection = 'down';
              }
            } else if(selected instanceof Relation && angular.isDefined(selected) && selected !== null) {
              var context = element[0].getContext('2d');
              var deltaX = selected.getCoordsB()[0] - selected.getCoordsA()[0];
              var deltaY = selected.getCoordsB()[1] - selected.getCoordsA()[1];
              var length = Math.abs(Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2)));
              context.save();
              context.beginPath();
              context.translate(selected.getCoordsA()[0], selected.getCoordsA()[1]);
              context.rotate(Math.atan2(deltaY, deltaX));
              context.translate(-selected.getCoordsA()[0], -selected.getCoordsA()[1]);
              context.rect(selected.getCoordsA()[0], selected.getCoordsA()[1]-5, length, 10);
              if(context.isPointInPath(event.layerX, event.layerY)) {
                dragPoint = 'shape';
              }
              context.closePath();
              context.beginPath();
              context.arc(selected.getCoordsA()[0] - 3, selected.getCoordsA()[1], 3, 0, 2*Math.PI);
              if(dragPoint === '' && context.isPointInPath(event.layerX, event.layerY)) {
                dragPoint = 'pointA';
              }
              context.closePath();
              context.beginPath();
              context.arc(selected.getCoordsA()[0] + length + 3, selected.getCoordsA()[1], 3, 0, 2*Math.PI);
              if(dragPoint === '' && context.isPointInPath(event.layerX, event.layerY)) {
                dragPoint = 'pointB';
              }
              context.closePath();
              drag = dragPoint !== '';
              context.restore();
            }
            draw();
          }
        });
        element.on('mousemove', function(event) {
          if(angular.isDefined(selected) && selected !== null) {
            var cursor = 'initial';
            if(selected instanceof Relation) {
              var context = element[0].getContext('2d');
              var deltaX = selected.getCoordsB()[0] - selected.getCoordsA()[0];
              var deltaY = selected.getCoordsB()[1] - selected.getCoordsA()[1];
              var length = Math.abs(Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2)));
              context.save();
              context.beginPath();
              context.translate(selected.getCoordsA()[0], selected.getCoordsA()[1]);
              context.rotate(Math.atan2(deltaY, deltaX));
              context.translate(-selected.getCoordsA()[0], -selected.getCoordsA()[1]);
              context.rect(selected.getCoordsA()[0], selected.getCoordsA()[1]-5, length, 10);
              if(context.isPointInPath(event.layerX, event.layerY)) {
                cursor = 'move';
              }
              context.closePath();
              context.beginPath();
              context.arc(selected.getCoordsA()[0] - 3, selected.getCoordsA()[1], 3, 0, 2*Math.PI);
              if(cursor === 'initial' && context.isPointInPath(event.layerX, event.layerY)) {
                cursor = 'move';
              }
              context.closePath();
              context.beginPath();
              context.arc(selected.getCoordsA()[0] + length + 3, selected.getCoordsA()[1], 3, 0, 2*Math.PI);
              if(cursor === 'initial' && context.isPointInPath(event.layerX, event.layerY)) {
                cursor = 'move';
              }
              context.closePath();
              context.restore();
            } else if(event.layerX >= selected.getX() && event.layerX <= (selected.getX() + selected.getWidth()) && event.layerY >= selected.getY() && event.layerY <= (selected.getY() + selected.getHeight())) {
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
            if(!drag && !resize) {
              element.css({
                cursor: cursor
              });
            }
            if(resize) {
              var moveX = 0;
              var moveY = 0;
              var x = selected.getX();
              var y = selected.getY();
              switch(resizeDirection) {
                case 'up left':
                  moveX = selected.getX()- event.layerX;
                  moveY = selected.getY()- event.layerY;
                  x = event.layerX;
                  y = event.layerY;
                  break;
                case 'down right':
                  moveX = event.layerX - (selected.getWidth() + selected.getX());
                  moveY = event.layerY - (selected.getHeight() + selected.getY());
                  break;
                case 'up right':
                  moveX = event.layerX - (selected.getWidth() + selected.getX());
                  moveY = selected.getY()- event.layerY;
                  y = event.layerY;
                  break;
                case 'down left':
                  moveY = event.layerY - (selected.getHeight() + selected.getY());
                  moveX = selected.getX()- event.layerX;
                  x = event.layerX;
                  break;
                case 'right':
                  moveX = event.layerX - (selected.getWidth() + selected.getX());
                  break;
                case 'left':
                  moveX = selected.getX()- event.layerX;
                  x = event.layerX;
                  break;
                case 'up':
                  moveY = selected.getY()- event.layerY;
                  y = event.layerY;
                  break;
                case 'down':
                  moveY = event.layerY - (selected.getHeight() + selected.getY());
                  break;
              }
              selected.setX(x);
              selected.setY(y);
              selected.setWidth(Math.max(1, selected.getWidth() + moveX));
              selected.setHeight(Math.max(1, selected.getHeight() + moveY));
            } else if(drag && dragPoint === '') {
              selected.setX(selected.getX() + event.layerX - positionX);
              selected.setY(selected.getY() + event.layerY - positionY);
              positionX = event.layerX;
              positionY = event.layerY;
            } else if(drag && dragPoint !== '') {
              switch(dragPoint) {
                case 'shape':
                  selected.setCoordsA([selected.getCoordsA()[0] + event.layerX - positionX, selected.getCoordsA()[1] + event.layerY - positionY]);
                  selected.setCoordsB([selected.getCoordsB()[0] + event.layerX - positionX, selected.getCoordsB()[1] + event.layerY - positionY]);
                  break;
                case 'pointA':
                  selected.setCoordsA([selected.getCoordsA()[0] + event.layerX - positionX, selected.getCoordsA()[1] + event.layerY - positionY]);
                  break;
                case 'pointB':
                  selected.setCoordsB([selected.getCoordsB()[0] + event.layerX - positionX, selected.getCoordsB()[1] + event.layerY - positionY]);
                  break;
              }
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
          resizeDirection = '';
          dragPoint = '';
        });
        element.on('keydown', function(event) {
          if(angular.isDefined(selected) && selected !== null && event.keyCode === 46) {
            element.css({
              cursor: 'initial'
            });
            scope.shapes = $.grep(scope.shapes, function(shape) { return shape.id !== selected.id });
            selected = null;
            drag = false;
            resize = false;
            resizeDirection = '';
            draw();
          }
        });
      }
      draw();
    }
  };
})
.directive('designerElement', function($document) {
  return {
    restrict: 'E',
    replace: true,
    template: '<canvas class="designer-element" height="90" width="140"></canvas>',
    link: function(scope, element, attr) {
      var offsetX, offsetY;
      var shape = window[attr.type].prototype instanceof Shape ? new window[attr.type](0, 0, 0, 140, 90, attr.name) : new window[attr.type](0, [0, 45], [140, 45], attr.name);
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