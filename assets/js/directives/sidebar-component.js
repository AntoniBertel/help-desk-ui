import angular from 'angular';
import lodash from 'lodash';

var sidebarComponent = () => {
  return {
    restrict: 'E',
    scope: {
      activeElement: "@"
    },
    replace: true,
    link: function($scope) {
      var sidebarChilds = lodash.flowRight(lodash.toArray, (element) => {
        return element.childNodes;
      }, lodash.first, lodash.first)($scope.scopeElements.sidebar);
      var activeChild = angular.element(sidebarChilds[$scope.activeElement]);
      if(activeChild && !activeChild.hasClass('sidebar__element_is-active')) {
        activeChild.addClass('sidebar__element_is-active');
      }
    },
    templateUrl: 'assets/js/templates/components/sidebar.html'
  }
};

export default sidebarComponent;