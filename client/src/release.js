

var Release = angular.module('myApp');


Release.controller('releaseCtrl', ['$scope', '$location', '$rootScope', '$routeParams', '$timeout',	'$http', 'anchorSmoothScroll', function($scope, $location, $rootScope, $routeParams, $timeout,	$http, anchorSmoothScroll){


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
    $rootScope.gotoAnchorRelease('release-item-'+$routeParams.release);
  });





  if($rootScope.Release.results.length){
    $rootScope.gotoAnchorRelease('release-item-'+$routeParams.release);

  }else{
    $rootScope.$on('releaseReady' ,function(){
      setTimeout(function(){
        if($routeParams.release){
          $rootScope.gotoAnchorRelease('release-item-'+$routeParams.release);
        }
      }, 600);
    });
  }






}]);





Release.directive('releaseDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/release.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});
