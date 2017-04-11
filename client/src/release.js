

var Release = angular.module('myApp');


Release.controller('releaseCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http, anchorSmoothScroll){


  $rootScope.isView='release';
  $rootScope.mainRelease = [];

  if($rootScope.removeSplashMobile == false){
    $rootScope.scrollToHome();
  }

  $rootScope.thisRelease = function(thisRelease, thisnumber){
    $rootScope.mainRelease = $rootScope.Release.results[thisnumber];
  }



$rootScope.isReleaseVideo = false;

  $scope.flipRelease=function(){
    $rootScope.isReleaseVideo = !$rootScope.isReleaseVideo;
  }





  //..................................................changing anchor link on click
  $rootScope.gotoAnchorRelease = function(x) {
    if($routeParams.release){
      anchorSmoothScroll.scrollToRelease(x);
    }
  };


  $rootScope.$on('ReleaseChanged', function(){
    console.log("ReleaseChanged");
    $rootScope.gotoAnchorRelease('release-item-'+$routeParams.release);
    console.log("$routeParams.release:", $routeParams.release);
  });





  if($rootScope.Release.results.length){
    console.log($routeParams.release);
    $rootScope.gotoAnchorRelease('release-item-'+$routeParams.release);

  }else{
    $rootScope.$on('releaseReady' ,function(){
      console.log("releaseReady");
      setTimeout(function(){
        if($routeParams.release){
          $rootScope.gotoAnchorRelease('release-item-'+$routeParams.release);
        }
      }, 600);
    });
  }






});





Release.directive('releaseDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/release.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});
