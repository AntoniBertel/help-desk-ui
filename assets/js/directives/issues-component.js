import angular from 'angular';

var issuesComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, issueStatusesConstant) {
      $scope.issues = [{
        id: 1,
        title: 'Title',
        dateAdded: '12.12.2012',
        lastAction: '12.12.2012',
        status: issueStatusesConstant.accepted.id
      }, {
        id: 2,
        title: 'Title',
        dateAdded: '12.12.2012',
        lastAction: '12.12.2012',
        status: issueStatusesConstant.accepted.id
      }];
      /**
       * Toggle issue activity class when user click on element
       * @param $event
       */
      $scope.toggleIssueActivity = ($event) => {
        const issueElements = document.querySelectorAll('.issues__element');
        const convertedIssueElements = Array.prototype.slice.call(issueElements);
        convertedIssueElements.forEach(function(element) {
          const jqElement = angular.element(element);
          if(jqElement.hasClass('issues__element_is_active')) {
            jqElement.removeClass('issues__element_is_active');
          }
        });
        angular.element($event.target).toggleClass('issues__element_is_active');
      };
    },
    templateUrl: 'assets/js/templates/components/issues.html'
  }
};

export default issuesComponent;