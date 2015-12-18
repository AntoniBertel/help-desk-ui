import angular from 'angular';
import lodash from 'lodash';

var navigationComponent = (authorizationFactory) => {
  return {
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope) {
      $scope.isMenuShow = false;
      $scope.toggleMenu = () => {
        $scope.isMenuShow = !$scope.isMenuShow;
      };
      $scope.isNotificationsShow = false;
      $scope.toggleNotifications = () => {
        $scope.isNotificationsShow = !$scope.isNotificationsShow;
      };
      $scope.notificationsCount = 1;
      $scope.notifications = ['Connection lost', 'Connection lost message'];
    },
    link: function($scope) {
      $scope.isAuthorized = authorizationFactory.isAuthorized();
      document.addEventListener('click', (event) => {
        var isNotificationsClicked = $scope.scopeElements.notifications.filter((element) => {
          return event.target.closest(`.${lodash.first(element).className}`);
        }).length > 0;
        if(!isNotificationsClicked) {
          $scope.$apply(function() {
            $scope.isNotificationsShow = false;
          });
        }
        var isMenuClicked = $scope.scopeElements.menu.filter((element) => {
          return event.target.closest(`.${lodash.first(element).className}`);
        }).length > 0;
        if(!isMenuClicked) {
          $scope.$apply(function() {
            $scope.isMenuShow = false;
          });
        }
      })
    },
    templateUrl: 'assets/js/templates/components/navigation.html'
  }
};

export default navigationComponent;