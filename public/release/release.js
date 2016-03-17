

var Release = angular.module('myApp');


Release.controller('releaseCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http){


  $rootScope.mainRelease = [];

  $rootScope.thisRelease = function(thisRelease, thisnumber){
      $rootScope.mainRelease = $rootScope.Release[thisnumber];
      console.log($rootScope.mainRelease.uid);
  }


});





Release.directive('releaseDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'release/release.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});
