import angular from 'angular';

/**
 * @param {object} userFactory
 * @param {function} userSessionService
 * @param {array} userRolesConstant
 * @returns {object}
 */
var authorizationService = function(userFactory, userSessionService, userRolesConstant) {
  return {
    /**
     * @param {array} credentials
     * @returns {object}
     */
    login: function(credentials) {
      userFactory.login(credentials.email, credentials.password).then((response) => {
        var response = response;
      }).catch((response) => {
        var response = response;
      });
      userSessionService.create(userRolesConstant.common, 'token').save();
      return userSessionService.getUser();
    },
    /**
     * @param {array} credentials
     * @returns {object}
     */
    register: function(credentials) {
      userFactory.register(credentials.email, credentials.password).then((response) => {
        var response = response;
      }).catch((response) => {
        var response = response;
      });
      userSessionService.create(userRolesConstant.common, 'token').save();
      return userSessionService.getUser();
    },
    logout: function() {
      userSessionService.destroy().remove();
    },
    isAuthorized: function() {
      var userCredentials = userSessionService.getUser();
      return (userCredentials.userRole && userCredentials.authorizationToken)? true: false;
    },
    /**
     * @param {array} requiredRoles
     * @returns {boolean}
     */
    isAuthenticated: function(requiredRoles = String) {
      var userCredentials = userSessionService.getUser();
      var isAll = requiredRoles.indexOf(userRolesConstant.all) !== -1;
      var isHasRequiredRole = this.isAuthorized() && requiredRoles.indexOf(userCredentials.userRole) !== -1;
      return (isAll || isHasRequiredRole)? true: false;
    }
  }
};

export default authorizationService;