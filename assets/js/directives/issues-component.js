import angular from 'angular';

var issuesComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, filterEventsConstant) {
      $scope.$on(filterEventsConstant.filterElementAdd, (event, data) => {
        var addedFilter = data;
      });
    },
    templateUrl: 'assets/js/templates/components/issues.html'
  }
};

export default issuesComponent;