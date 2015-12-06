import angular from 'angular';

var sideComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    replace: true,
    templateUrl: 'assets/js/templates/components/side.html'
  }
};

export default sideComponent;
