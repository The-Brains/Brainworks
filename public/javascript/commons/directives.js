/**
 * Navigationsdefinition und Prüfung
 */
angular.module('brainworks.commons')
.directive('match',
  /**
   * Validierungesprüfung beim Aufruf einer Website
   */
  function() {
  return {
    require: 'ngModel',
    scope: {
      matchValue: '=match'
    },
    /**
     * Validierungsprüfung eines Aufrufes
     * @param scope
     * @param element
     * @param attrs
     * @param ngModel
     */
    link: function(scope, element, attrs, ngModel) {
      ngModel.$validators.match = function(modelValue) {
        return angular.isArray(scope.matchValue) ?
          scope.matchValue[0] === scope.matchValue[1] : modelValue === scope.matchValue;
      };
      scope.$watch('matchValue', function() {
        ngModel.$validate();
      });
    }
  };
})
.directive('navItem', ['$location',
  /**
   * Initialisierung des Prototyps für die Navigationsleiste
   * @param $location
   */
  function($location) {
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