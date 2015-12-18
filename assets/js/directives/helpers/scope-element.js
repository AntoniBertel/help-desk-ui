import angular from 'angular';

var scopeElement = () => {
  return {
    restrict: 'A',
    compile: function(element, attrs, transclude) {
      return {
        pre: function($scope, element, attrs, controller) {
          $scope.scopeElements = $scope.scopeElements || {};
          $scope.scopeElements[attrs.scopeElement] = $scope.scopeElements[attrs.scopeElement] || [];
          $scope.scopeElements[attrs.scopeElement].push(element);
        }
      }
    }
  }
};

export default scopeElement;