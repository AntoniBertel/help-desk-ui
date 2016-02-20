import angular from 'angular';
import lodash from 'lodash';

var issuesFilterComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, filterEventsConstant) {
      $scope.isFilterShow = false;
      $scope.currentStatus = null;
      $scope.toggleFilter = () => {
        $scope.isFilterShow = !$scope.isFilterShow;
      };
      $scope.addElement = () => {
        $scope.currentSelect = 'Network';
        $scope.$emit(filterEventsConstant.filterElementAdd, $scope.currentSelect);
      };
      $scope.removeElement = () => {
        $scope.selectedElements;
      };
    },
    link: function($scope, issueStatusesConstant) {
      $scope.currentSelect = 'Network';
      $scope.filterElements = ['Network', 'SEO'];
      $scope.selectedElements = ['Network', 'SEO'];
      document.addEventListener('click', (event) => {
        var isFilterMenuClicked = $scope.scopeElements.filterMenu.filter((element) => {
          return event.target.closest(`.${lodash.first(element).className}`);
        }).length > 0;
        if(!isFilterMenuClicked) {
          $scope.$apply(function() {
            $scope.isFilterShow = false;
          });
        }
      });
    },
    templateUrl: 'assets/js/templates/components/issues-filter.html'
  }
};

export default issuesFilterComponent;