angular.module('brainworks.diagram')
.controller('designerCtrl', ['$scope', '$state', 'localStorageService', 'diagramsFactory', 'diagram', function ($scope, $state, localStorageService, diagramsFactory, diagram) {
  $scope.oneAtATime = true;
  $scope.diagramTypes = [{name: 'Klassendiagramme', shapes: [{type: 'ActiveClass', name: 'Aktive Klasse'}, {type: 'EmptyClass', name: 'Klasse'}, {type: 'AbstractClass', name: 'Abstrakte Klasse'}, {type: 'Comment', name: 'Kommentar'}, {type: 'Class', name: 'Klasse'}, {type: 'Inheritance', name: 'Vererbung'}]}];
  $scope.diagram = diagram;
  $scope.shapes = [];
  $scope.back = function() {
    $state.go('profile.diagrams');
  };
  $scope.save = function(diagram) {
    var waitElement = $('#saveAnimation');
    waitElement.removeClass('hidden');
    var designerCanvas = $('.designer');
    var tmpCanvas = designerCanvas.clone();
    tmpCanvas.attr('height', '300px');
    tmpCanvas.attr('width', '700px');
    var img = $('#diagramThumbnail')[0];
    img.src = designerCanvas[0].toDataURL();
    tmpCanvas[0].getContext('2d').drawImage(img, 0, 0);
    tmpCanvas[0].toBlob(function(blob) {
      var formData = new FormData();
      formData.append('file', blob, diagram._id + '.png');
      formData.append('diagram', JSON.stringify(diagram));
      diagramsFactory.saveDiagram(localStorageService.get('userId'), formData).success(function(response) {
        waitElement.addClass('hidden');
      });
    });
  };
}])
.directive('designer', function() {
  return {
    restrict: 'E',
    replace: true,
    template: '<canvas class="designer" height="5000px" width="5000px"></canvas>',
    link: function(scope, element, attr) {
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
      if(attr.editable) {
        var selected = null;
        var positionX = 0;
        var positionY = 0;
        var drag = false;
        var resize = false;
        var resizeDirection = '';
        $(element).droppable({
          accept: '.designer-element',
          drop: function(event, ui) {
            var y = ui.helper.position().top - $(element).parent().offset().top;
            var x = ui.helper.position().left - $(element).parent().offset().left;
            scope.shapes.push(window[ui.helper.attr('type')].prototype instanceof Shape ? new window[ui.helper.attr('type')](x, y, 140, 90, ui.helper.attr('name')) : new window[ui.helper.attr('type')]([x, y + 45], [x + 140, y + 45], ui.helper.attr('name')));
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
          var result = $.grep(scope.shapes, function(shape) {
            var isSelected = false;
            if(shape instanceof Shape) {
              isSelected = event.layerX >= shape.getX() - 8 && event.layerX <= (shape.getX() + shape.getWidth() + 8) && event.layerY >= shape.getY() - 8 && event.layerY <= (shape.getY() + shape.getHeight() + 8);
            } else {
//              isSelected = TODO das ist eine relation
            }
            return isSelected;
          });
          selected = result[0];
          positionX = event.layerX;
          positionY = event.layerY;
          if(angular.isDefined(selected) && selected !== null && positionX >= selected.getX() && positionX <= (selected.getX() + selected.getWidth()) && positionY >= selected.getY() && positionY <= (selected.getY() + selected.getHeight())) {
            drag = true;
          } else if(angular.isDefined(selected) && selected !== null) {
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
          }
          draw();
        });
        element.on('doubelclick', function(event) {
          // TODO edtiermodus des shapes/der relation oeffnen
          var result = $.grep(scope.shapes, function(shape) { return event.layerX >= shape.getX() && event.layerX <= (shape.getX() + shape.getWidth()) && event.layerY >= shape.getY() && event.layerY <= (shape.getY() + shape.getHeight()); });
          if(result.length !== 0) {
            console.log(result[0]);
          }
        });
        element.on('mousemove', function(event) {
          if(angular.isDefined(selected) && selected !== null) {
            var cursor = 'initial';
            // TODO bei einer relation immer den movecursor anzeigen
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
            if(!drag && !resize) {
              element.css({
                cursor: cursor
              });
            }
            // TODO sonderlogik für relation
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
          resizeDirection = '';
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
      var shape = window[attr.type].prototype instanceof Shape ? new window[attr.type](0, 0, 140, 90, attr.name) : new window[attr.type]([0, 45], [140, 45], attr.name);
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