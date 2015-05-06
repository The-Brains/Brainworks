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
    link: function(scope, element, attrs, ngModel) {
      ngModel.$validators.match = function(modelValue) {
        return modelValue === scope.matchValue;
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
}]);