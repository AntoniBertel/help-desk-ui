import angular from 'angular';

var issuesElementsComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope) {
      $scope;
    },
    templateUrl: 'assets/js/templates/components/issues-elements.html'
  }
};

export default issuesElementsComponent;