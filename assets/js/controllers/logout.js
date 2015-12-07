import angular from 'angular';

var logoutController = ($rootScope, $scope, $state, $stateParams, authorizationFactory, authorizationEventsConstant) => {
  authorizationFactory.logout();
  $rootScope.$broadcast(authorizationEventsConstant.logoutSuccess);
  $state.go($stateParams.redirectToState);
};

export default logoutController;