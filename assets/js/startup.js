import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngCookies from 'angular-cookies';
import ngTranslate from 'angular-translate';
import ngTranslateLoader from 'angular-translate-loader-static-files';
import ngTranslateCookieStorage from 'angular-translate-storage-cookie';
import ngTranslateLocalStorage from 'angular-translate-storage-local';

var helpdesk = angular.module('helpdesk', [uiRouter, ngCookies, ngTranslate]);
helpdesk.config(($stateProvider, $urlRouterProvider, $translateProvider, userRolesConstant) => {
  $urlRouterProvider.otherwise('not-found');
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'assets/js/templates/login.html',
    params: {
      redirectToState: 'home'
    }
  }).state('register', {
    url: '/register',
    templateUrl: 'assets/js/templates/register.html',
    params: {
      redirectToState: 'home'
    }
  }).state('profile', {
    url: '/profile',
    templateUrl: 'assets/js/templates/profile.html',
    accessPermissions: [userRolesConstant.all]
  }).state('issues', {
    url: '/issues',
    templateUrl: 'assets/js/templates/issues.html',
    accessPermissions: [userRolesConstant.all]
  }).state('notFound', {
    url: '/not-found',
    templateUrl: 'assets/js/templates/not-found.html'
  }).state('forbidden', {
    url: '/forbidden',
    templateUrl: 'assets/js/templates/forbidden.html'
  }).state('home', {
    url: '/'
  }).state('logout', {
    url: '/logout',
    params: {
      redirectToState: 'home'
    },
    controller: 'logoutController'
  });

  $translateProvider.useStaticFilesLoader({
    prefix: 'assets/js/configurations/locales/',
    suffix: '.json'
  });
  $translateProvider.preferredLanguage('enUS');
  $translateProvider.useSanitizeValueStrategy('escape');
  $translateProvider.useLocalStorage();
});

/**
 * Controllers
 */
import logoutController from './controllers/logout';
helpdesk.controller('logoutController', logoutController);

/**
 * Components
 */
import loginComponent from './directives/login-component';
import registerComponent from './directives/register-component';
import navigationComponent from './directives/navigation-component';
import sideComponent from './directives/side-component';
import profileComponent from './directives/profile-component';
import sidebarComponent from './directives/sidebar-component';
import issuesComponent from './directives/issues-component';
import issuesElementsComponent from './directives/issues-elements-component';
import issuesFilterComponent from './directives/issues-filter-component';
helpdesk.directive('loginComponent', loginComponent);
helpdesk.directive('registerComponent', registerComponent);
helpdesk.directive('navigationComponent', navigationComponent);
helpdesk.directive('sideComponent', sideComponent);
helpdesk.directive('profileComponent', profileComponent);
helpdesk.directive('sidebarComponent', sidebarComponent);
helpdesk.directive('issuesComponent', issuesComponent);
helpdesk.directive('issuesElementsComponent', issuesElementsComponent);
helpdesk.directive('issuesFilterComponent', issuesFilterComponent);

/**
 * Helper directives
 */
import repeatPassword from './directives/helpers/repeat-password';
import scopeElement from './directives/helpers/scope-element';
helpdesk.directive('repeatPassword', repeatPassword);
helpdesk.directive('scopeElement', scopeElement);

/**
 * Services
 */
import sessionService from './services/user-session';
helpdesk.service('userSessionService', sessionService);

/**
 * Factories
 */
import authorizationFactory from './factories/authorization';
import authorizationInterceptorFactory from './factories/authorization-interceptor';
import userFactory from './factories/user';
helpdesk.factory('authorizationFactory', authorizationFactory);
helpdesk.factory('authorizationInterceptorFactory', authorizationInterceptorFactory);
helpdesk.factory('userFactory', userFactory);

/**
 * Constants
 */
import authorizationEventsConstant from './configurations/constants/authorization-events';
import filterEventsConstant from './configurations/constants/filter-events';
import userRolesConstant from './configurations/constants/user-roles';
import configurationConstant from './configurations/configuration';
import issueStatusesConstant from './configurations/constants/issue-statuses';
helpdesk.constant('authorizationEventsConstant', authorizationEventsConstant);
helpdesk.constant('filterEventsConstant', filterEventsConstant);
helpdesk.constant('userRolesConstant', userRolesConstant);
helpdesk.constant('configurationConstant', configurationConstant);
helpdesk.constant('issueStatusesConstant', issueStatusesConstant);

/**
 * Configuration
 */
helpdesk.config(function($httpProvider) {
  $httpProvider.interceptors.push(['$injector', function($injector) {
    return $injector.get('authorizationInterceptorFactory');
  }]);
});

helpdesk.run(function($rootScope, $state, authorizationFactory, authorizationEventsConstant) {
  $rootScope.$on('$stateChangeStart', function(event, next) {
    if(next.accessPermissions && !authorizationFactory.isAuthenticated(next.accessPermissions)) {
      event.preventDefault();
      $rootScope.$broadcast(authorizationEventsConstant.notAuthenticated, {
        redirectToState: next.name
      });
    }
    else if(next.accessPermissions && !authorizationFactory.isAuthorized()) {
      event.preventDefault();
      $rootScope.$broadcast(authorizationEventsConstant.notAuthorized, {
        redirectToState: next.name
      });
    }
  });
  $rootScope.$on(authorizationEventsConstant.loginSuccess, function(event, data) {
    $rootScope.userRole = data.userRole;
    $rootScope.authorizationToken = data.authorizationToken;
  });
  $rootScope.$on(authorizationEventsConstant.logoutSuccess, function(event, data) {
    $rootScope.userRole = null;
    $rootScope.authorizationToken = null;
  });
  $rootScope.$on(authorizationEventsConstant.notAuthorized, function(event, data) {
    $state.go('login', {
      redirectToState: data.redirectToState
    });
  });
  $rootScope.$on(authorizationEventsConstant.notAuthenticated, function(event, data) {
    $state.go('forbidden');
  });
});