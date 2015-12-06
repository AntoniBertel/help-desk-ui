import angular from 'angular';

var authorizationInterceptor = function($rootScope, $q, $injector, authorizationEventsConstant, userSessionService) {
  return {
    /**
     * 401 (unauthorized) - the user not logged in
     * 403 (forbidden) - the user is logged in but isnt allowed access
     * 419, 440 - session has expired
     * @param {object} response
     */
    responseError: function(response) {
      var stateDependency = $injector.get('$state');
      $rootScope.$broadcast({
        401: authorizationEventsConstant.notAuthorized,
        403: authorizationEventsConstant.notAuthenticated,
        419: authorizationEventsConstant.sessionTimeout,
        440: authorizationEventsConstant.sessionTimeout
      }[response.status], {
        redirectToState: stateDependency.current.name
      });
      return $q.reject(response);
    },
    /**
     * @param {object} $config
     * @returns {object}
     */
    request: function($config) {
      var stateDependency = $injector.get('$state');
      var userCredentials = userSessionService.getUser();
      if(stateDependency.current.accessPermissions && userCredentials.authorizationToken) {
        $config.headers.Authorization = userCredentials.authorizationToken;
      }
      return $q.resolve($config);
    }
  }
};

export default authorizationInterceptor;