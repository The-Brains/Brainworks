/**
 * 
 */
angular.module('brainworks.commons')
.directive('match', function() {
  return {
    require: 'ngModel',
    scope: {
      matchValue: '=match'
    },
    //link: ermöglicht es, DOM-Elemente zu manipulieren
    link: function(scope, element, attrs, ngModel) {
    //Passwortvalidierung
      ngModel.$validators.match = function(modelValue) {
      //Wenn beide Passwörter gleich sind, sind sie Valide
        return angular.isArray(scope.matchValue) ?
          scope.matchValue[0] === scope.matchValue[1] : modelValue === scope.matchValue;
      };
      scope.$watch('matchValue', function() {
        ngModel.$validate();
      });
    }
  };
})
.directive('navItem', ['$location', function($location) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      page: '@page',
      title: '@title'
    },
    template: '<li ui-sref-active="active"><a ui-sref="{{page}}">{{title}}</a></li>'
  };
}])
.directive('attributesEditor', function() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div><input type="text"></input></div>',
    link: function(scope, element, attrs) {
      
    }
  };
});