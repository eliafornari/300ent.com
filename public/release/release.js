

var Release = angular.module('myApp');


Release.controller('releaseCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http, anchorSmoothScroll){


  $rootScope.mainRelease = [];

  $rootScope.thisRelease = function(thisRelease, thisnumber){
      $rootScope.mainRelease = $rootScope.Release[thisnumber];
  }



$rootScope.isReleaseVideo = false;

  $scope.flipRelease=function(){
    $rootScope.isReleaseVideo = !$rootScope.isReleaseVideo;
  }










  //..................................................changing anchor link on click
  $rootScope.gotoAnchorRelease = function(x) {
    anchorSmoothScroll.scrollToRelease(x);
  };









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
