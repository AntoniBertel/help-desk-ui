import angular from 'angular';

var navigationComponent = (authorizationFactory) => {
  return {
    restrict: 'E',
    scope: {},
    replace: true,
    link: function($scope) {
      if(authorizationFactory.isAuthorized()) {
        $scope.isAuthorized = true;
        $scope.userName = "Firstname Lastname";
      }
      else {
        $scope.isAuthorized = false;
      }
    },
    templateUrl: 'assets/js/templates/components/navigation.html'
  }
};

export default navigationComponent;