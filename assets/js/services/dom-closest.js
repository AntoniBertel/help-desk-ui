import angular from 'angular';

var domClosestService = () => {
  this.findClosestElement = (element) => {
    element.closest = element;
  }
}