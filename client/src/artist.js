

var Artist = angular.module('myApp');


Artist.controller('artistCtrl', ['$scope', '$location', '$rootScope', '$routeParams', '$timeout',	'$http', 'anchorSmoothScroll', '$window', function($scope, $location, $rootScope, $routeParams, $timeout,	$http, anchorSmoothScroll, $window){


  $rootScope.mainArtist = "";
  $rootScope.isView='artist';
  if($rootScope.removeSplashMobile == false){
    $rootScope.scrollToHome();
  }
  var scroll,windowheight;
  windowheight = window.innerHeight;

setTimeout(function(){
  $scope.artistPositions=[];
  for (var i in $rootScope.Artist){
    var artistPosition =  jQuery('#artist-content-'+$rootScope.Artist[i].uid).offset().top;
    artistPosition = windowheight*i;
    var object = {
                    "name": $rootScope.Artist[i].uid,
                    "offset":artistPosition
                  }

    $scope.artistPositions = $scope.artistPositions.concat(object);
  }

    jQuery('.artist').bind("scroll.artist", function(event) {

        scroll =  jQuery('.artist').scrollTop();
        for (i in $scope.artistPositions){
          if((scroll > ($scope.artistPositions[i].offset - 1)) && (scroll < ($scope.artistPositions[i].offset + windowheight -1 ))){
            $rootScope.mainArtist = $scope.artistPositions[i].name;
          }else{

          }
       }//for loop
        $scope.$apply();
    });//scroll bind

}, 2500);



//..................................................changing anchor link on click
$rootScope.gotoAnchorArtist = function(x) {
  if($routeParams.artist){
    anchorSmoothScroll.scrollTo(x);
  }
};


$rootScope.$on('ArtistChanged', function(){
  console.log("ArtistChanged");
  $rootScope.gotoAnchorArtist('artist-content-'+$routeParams.artist);
  console.log("$routeParams.artist:", $routeParams.artist);
});





if($rootScope.Artist){
  console.log($routeParams.artist);
  $rootScope.gotoAnchorArtist('artist-content-'+$routeParams.artist);

}else{
  $rootScope.$on('artistReady' ,function(){
    console.log("artistReady");
    setTimeout(function(){
      if($routeParams.artist){
        $rootScope.gotoAnchorArtist('artist-content-'+$routeParams.artist);
      }
    }, 600);
  });
}





}]);





Artist.directive('artistDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/artist.html',
    replace: true
  };
});
