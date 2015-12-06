import angular from 'angular';

var profileComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    replace: true,
    templateUrl: 'assets/js/templates/components/profile.html'
  }
};

export default profileComponent;