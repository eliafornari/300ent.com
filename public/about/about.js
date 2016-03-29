var About = angular.module('myApp');

About.controller('aboutCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http){




});





About.directive('aboutDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'about/about.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});
