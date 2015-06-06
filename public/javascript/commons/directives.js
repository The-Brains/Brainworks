/**
 * Direktiven für die gemeinsame Verwendung.
 */
angular.module('brainworks.commons')
/**
 * Direktive für die Prüfung einer Eingabe mit einem anderen Wert.
 */
.directive('match', function() {
  return {
    require: 'ngModel',
    scope: {
      matchValue: '=match'
    },
    /**
     * Erstellung der Direktive und implementierung der entsprechenden Funktionalitäten.
     * @param {Object} scope   Der Scope der Direktive
     * @param {Object} element Das HTML-Element
     * @param {Object} attrs   Die Attribute des HTML-Elements
     * @param {Object} ngModel Das Model in denen die Daten gespeichert sind
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
/**
 * Dirketive für die einzelnen Navigationselemente in der Navigationsleiste.
 */
.directive('navItem', function() {
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
});