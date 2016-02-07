import angular from 'angular';

var sidebarComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, $state, $stateParams) {
      $scope;
    },
    templateUrl: 'assets/js/templates/components/sidebar.html'
  }
};

export default sidebarComponent;